import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getProfileById } from '@/lib/data/professionals';

type ProfilePageProps = {
  params: {
    id: string;
  };
};

export default function ProfessionalProfilePage({ params }: ProfilePageProps) {
  const professional = getProfileById(params.id);
  
  if (!professional) {
    notFound();
  }
  
  const {
    name,
    title,
    location,
    bio,
    contactEmail,
    contactPhone,
    whatsapp,
    experienceYears,
    hourlyRate,
    availability,
    skills,
    certifications,
    portfolio,
    profileImageUrl,
  } = professional;
  
  const availabilityColors = {
    available: 'bg-green-100 text-green-800',
    employed: 'bg-yellow-100 text-yellow-800',
    freelance: 'bg-blue-100 text-blue-800',
    not_available: 'bg-red-100 text-red-800'
  };
  
  const availabilityLabels = {
    available: 'Available',
    employed: 'Employed',
    freelance: 'Freelance',
    not_available: 'Not Available'
  };
  
  const hasVerifiedCertifications = certifications.some(cert => cert.verified);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/professionals" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
          </svg>
          Back to Professionals
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-40"></div>
        <div className="px-6 py-4 sm:px-8 sm:py-6">
          <div className="flex flex-col sm:flex-row -mt-16 sm:-mt-20">
            <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full overflow-hidden border-4 border-white bg-white">
              <Image 
                src={profileImageUrl || '/images/placeholder-profile.jpg'} 
                alt={name} 
                fill 
                className="object-cover"
              />
              {hasVerifiedCertifications && (
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1" title="Verified Professional">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <div className="mt-4 sm:mt-2 sm:ml-6">
              <div className="flex items-center mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{name}</h1>
                <div 
                  className={`ml-3 text-sm px-2 py-1 rounded-full ${availabilityColors[availability]}`}
                >
                  {availabilityLabels[availability]}
                </div>
              </div>
              <h2 className="text-xl text-gray-700 mb-2">{title}</h2>
              <div className="flex items-center text-gray-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                {location}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 mt-6">
                {contactEmail && (
                  <Button variant="outline" className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                    Email
                  </Button>
                )}
                
                {contactPhone && (
                  <Button variant="outline" className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                    </svg>
                    Call
                  </Button>
                )}
                
                {whatsapp && (
                  <Button variant="outline" className="flex items-center text-green-600 border-green-600 hover:bg-green-50">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">About</h3>
                <p className="text-gray-600">{bio}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Professional Details</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Experience</dt>
                    <dd className="mt-1 text-gray-900">{experienceYears} years</dd>
                  </div>
                  {hourlyRate && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Hourly Rate</dt>
                      <dd className="mt-1 text-gray-900">€{hourlyRate}/hour</dd>
                    </div>
                  )}
                </dl>
              </div>
              
              {portfolio.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Portfolio</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {portfolio.map((item) => (
                      <div key={item.id} className="overflow-hidden rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                        <div className="relative h-48 w-full bg-gray-100">
                          <Image
                            src={item.url || '/images/placeholder-portfolio.jpg'}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                          {item.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-black bg-opacity-60 rounded-full p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              {certifications.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Certifications</h3>
                  <ul className="space-y-3">
                    {certifications.map((cert) => (
                      <li key={cert.id} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-800">{cert.name}</h4>
                          {cert.verified && (
                            <span className="text-green-600 flex items-center text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                              </svg>
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Issued by {cert.issuer}</p>
                        <p className="text-xs text-gray-500 mt-1">Issued: {new Date(cert.dateIssued).toLocaleDateString()}</p>
                        {cert.expiryDate && (
                          <p className="text-xs text-gray-500">
                            Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <Button className="w-full mb-3">Contact {name}</Button>
              <Button variant="outline" className="w-full">Save Profile</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 