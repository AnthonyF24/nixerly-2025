import { Business, businesses } from './businesses';

export type JobStatus = 'open' | 'closed' | 'filled';
export type JobType = 'full_time' | 'part_time' | 'contract' | 'temporary';

export type Job = {
  id: string;
  title: string;
  description: string;
  businessId: string;
  business?: Business;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  skills: string[];
  experience: string;
  status: JobStatus;
  type: JobType;
  contactEmail: string;
  contactPhone?: string;
  contactWhatsapp?: string;
  postedDate: string;
  expiryDate: string;
};

export const jobs: Job[] = [
  {
    id: "job-001",
    title: "Senior Electrician",
    description: "We are seeking an experienced Senior Electrician to join our team for a major commercial development in Dublin city center. The ideal candidate will have extensive experience in commercial electrical installations, a strong understanding of safety protocols, and the ability to lead a small team of junior electricians.",
    businessId: "bus-001",
    location: "Dublin, Ireland",
    salaryMin: 50000,
    salaryMax: 65000,
    skills: ["Commercial Electrical Installation", "Circuit Design", "Team Leadership", "Safety Compliance", "Fault Finding"],
    experience: "5+ years in commercial electrical installations",
    status: "open",
    type: "full_time",
    contactEmail: "jobs@murphyconstruction.ie",
    contactPhone: "+353 1 234 5679",
    postedDate: "2024-03-15T09:00:00Z",
    expiryDate: "2024-05-15T23:59:59Z"
  },
  {
    id: "job-002",
    title: "Junior Structural Engineer",
    description: "GreenBuild Systems is looking for a Junior Structural Engineer to assist our senior team with sustainable building projects across Ireland. This is an excellent opportunity for a recent graduate to gain hands-on experience in eco-friendly construction methods and modern structural design techniques.",
    businessId: "bus-003",
    location: "Galway, Ireland",
    salaryMin: 35000,
    salaryMax: 45000,
    skills: ["Structural Analysis", "AutoCAD", "Revit", "Building Regulations", "Sustainable Construction"],
    experience: "0-2 years, recent graduates welcome",
    status: "open",
    type: "full_time",
    contactEmail: "careers@greenbuild.ie",
    contactWhatsapp: "+353 91 555 4322",
    postedDate: "2024-03-20T10:30:00Z",
    expiryDate: "2024-04-20T23:59:59Z"
  },
  {
    id: "job-003",
    title: "Experienced Plumber",
    description: "Urgently required: Experienced plumber for a 3-month contract on a large hotel renovation project in Cork city. Candidate must have experience with commercial plumbing systems and be available to start immediately.",
    businessId: "bus-002",
    location: "Cork, Ireland",
    salaryMin: 4000,
    salaryMax: 4500,
    skills: ["Commercial Plumbing", "Pipefitting", "Water Systems", "Heating Systems", "Problem Solving"],
    experience: "3+ years in commercial plumbing",
    status: "open",
    type: "contract",
    contactEmail: "contracts@buildtalent.ie",
    contactPhone: "+353 21 987 6544",
    contactWhatsapp: "+353 21 987 6544",
    postedDate: "2024-03-25T14:15:00Z",
    expiryDate: "2024-04-10T23:59:59Z"
  },
  {
    id: "job-004",
    title: "Site Safety Officer",
    description: "Murphy Construction is recruiting a qualified Site Safety Officer for our expanding operations across Dublin. The successful candidate will be responsible for ensuring all safety protocols are followed on multiple construction sites, conducting regular inspections, and providing safety training to staff.",
    businessId: "bus-001",
    location: "Dublin, Ireland",
    salaryMin: 45000,
    salaryMax: 55000,
    skills: ["Health & Safety Regulations", "Risk Assessment", "Safety Inspections", "Training Delivery", "Documentation"],
    experience: "3+ years as a safety officer in construction",
    status: "open",
    type: "full_time",
    contactEmail: "jobs@murphyconstruction.ie",
    contactPhone: "+353 1 234 5679",
    postedDate: "2024-03-10T11:45:00Z",
    expiryDate: "2024-04-30T23:59:59Z"
  }
];

// Add business details to each job
export const jobsWithBusinessDetails = jobs.map(job => {
  const jobBusiness = businesses.find(business => business.id === job.businessId);
  return {
    ...job,
    business: jobBusiness
  };
});

export const getJobById = (id: string): Job | undefined => {
  const job = jobs.find(job => job.id === id);
  if (job) {
    const jobBusiness = businesses.find(business => business.id === job.businessId);
    return {
      ...job,
      business: jobBusiness
    };
  }
  return undefined;
};

export const getFilteredJobs = (
  skills?: string[],
  location?: string,
  type?: JobType,
  salaryMin?: number
): Job[] => {
  return jobs.filter(job => {
    // Filter by skills if provided
    if (skills && skills.length > 0) {
      const hasSkill = skills.some(skill => 
        job.skills.some(jobSkill => 
          jobSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );
      if (!hasSkill) return false;
    }
    
    // Filter by location if provided
    if (location && !job.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    
    // Filter by job type if provided
    if (type && job.type !== type) {
      return false;
    }
    
    // Filter by minimum salary if provided
    if (salaryMin && (!job.salaryMin || job.salaryMin < salaryMin)) {
      return false;
    }
    
    return true;
  }).map(job => {
    const jobBusiness = businesses.find(business => business.id === job.businessId);
    return {
      ...job,
      business: jobBusiness
    };
  });
}; 