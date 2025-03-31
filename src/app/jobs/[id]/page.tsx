import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getJobById } from '@/lib/data/jobs';

type JobPageProps = {
  params: {
    id: string;
  };
};

export default function JobDetailPage({ params }: JobPageProps) {
  const job = getJobById(params.id);
  
  if (!job) {
    notFound();
  }
  
  const {
    title,
    description,
    business,
    location,
    salaryMin,
    salaryMax,
    skills,
    experience,
    type,
    postedDate,
    expiryDate,
    contactEmail,
    contactPhone,
    contactWhatsapp
  } = job;
  
  const jobTypeColors = {
    full_time: 'bg-blue-100 text-blue-800',
    part_time: 'bg-purple-100 text-purple-800',
    contract: 'bg-amber-100 text-amber-800',
    temporary: 'bg-gray-100 text-gray-800'
  };
  
  const jobTypeLabels = {
    full_time: 'Full Time',
    part_time: 'Part Time',
    contract: 'Contract',
    temporary: 'Temporary'
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Salary not specified';
    if (min && !max) return `€${min.toLocaleString()}+`;
    if (!min && max) return `Up to €${max.toLocaleString()}`;
    return `€${min.toLocaleString()} - €${max.toLocaleString()}`;
  };
  
  const daysRemaining = () => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = Math.abs(expiry.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (expiry < today) return 'Expired';
    if (diffDays === 0) return 'Expires today';
    if (diffDays === 1) return 'Expires tomorrow';
    return `${diffDays} days remaining`;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/jobs" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
          </svg>
          Back to Jobs
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start">
              {business?.logoUrl && (
                <div className="relative h-16 w-16 flex-shrink-0 mr-4">
                  <Image
                    src={business.logoUrl || '/images/placeholder-company.jpg'}
                    alt={business.name}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
                <div className="flex items-center mb-4">
                  <p className="text-gray-700 font-medium">{business?.name}</p>
                  <span className="mx-2 text-gray-300">•</span>
                  <p className="text-gray-600">{location}</p>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className={`text-sm px-3 py-1 rounded-full ${jobTypeColors[type]}`}>
                    {jobTypeLabels[type]}
                  </div>
                  <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    {daysRemaining()}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-t border-b border-gray-200 py-4 my-4">
              <div className="mb-3 sm:mb-0">
                <p className="text-sm text-gray-500">Salary</p>
                <p className="text-lg font-semibold text-gray-900">{formatSalary(salaryMin, salaryMax)}</p>
              </div>
              <div className="mb-3 sm:mb-0">
                <p className="text-sm text-gray-500">Posted On</p>
                <p className="text-gray-900">{formatDate(postedDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Experience Required</p>
                <p className="text-gray-900">{experience}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Job Description</h2>
              <div className="text-gray-600 space-y-4">
                <p>{description}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            {business && (
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">About {business.name}</h2>
                <p className="text-gray-600 mb-4">{business.description}</p>
                {business.website && (
                  <Link 
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                      <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
                    </svg>
                    Visit website
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Apply for this job</h2>
            <div className="space-y-4">
              <Button className="w-full">Apply Now</Button>
              
              <div className="text-center text-gray-500 text-sm">Or contact directly via:</div>
              
              <div className="space-y-3">
                {contactEmail && (
                  <Button variant="outline" className="w-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                    Send Email
                  </Button>
                )}
                
                {contactPhone && (
                  <Button variant="outline" className="w-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                    </svg>
                    Call Recruiter
                  </Button>
                )}
                
                {contactWhatsapp && (
                  <Button variant="outline" className="w-full flex items-center justify-center text-green-600 border-green-600 hover:bg-green-50">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Job Details</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-gray-900 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1 text-gray-500">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  {location}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Job Type</dt>
                <dd className="mt-1 text-gray-900">{jobTypeLabels[type]}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Posted Date</dt>
                <dd className="mt-1 text-gray-900">{formatDate(postedDate)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Closing Date</dt>
                <dd className="mt-1 text-gray-900">{formatDate(expiryDate)}</dd>
              </div>
            </dl>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button variant="ghost" className="text-gray-600 hover:text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
              Report Job
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 