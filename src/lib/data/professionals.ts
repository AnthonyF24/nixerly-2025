export type Certification = {
  id: string;
  name: string;
  issuer: string;
  dateIssued: string;
  expiryDate?: string;
  verified: boolean;
};

export type PortfolioItem = {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  description: string;
};

export type AvailabilityStatus = 'available' | 'employed' | 'freelance' | 'not_available';

export type Professional = {
  id: string;
  name: string;
  title: string;
  location: string;
  bio: string;
  contactEmail: string;
  contactPhone?: string;
  whatsapp?: string;
  experienceYears: number;
  hourlyRate?: number;
  availability: AvailabilityStatus;
  skills: string[];
  certifications: Certification[];
  portfolio: PortfolioItem[];
  profileUrl: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export const professionals: Professional[] = [
  {
    id: "prof-001",
    name: "John Doyle",
    title: "Master Electrician",
    location: "Dublin, Ireland",
    bio: "Certified electrician with over 15 years of experience in residential and commercial projects. Specializing in smart home installations and energy-efficient solutions.",
    contactEmail: "john.doyle@example.com",
    contactPhone: "+353 87 123 4567",
    whatsapp: "+353 87 123 4567",
    experienceYears: 15,
    hourlyRate: 45,
    availability: "available",
    skills: ["Electrical Installation", "Circuit Design", "Smart Home Systems", "Safety Inspections", "Energy Efficiency"],
    certifications: [
      {
        id: "cert-001",
        name: "Master Electrician License",
        issuer: "Electrical Contractors Association of Ireland",
        dateIssued: "2015-05-12",
        verified: true
      },
      {
        id: "cert-002",
        name: "Safe Pass",
        issuer: "SOLAS",
        dateIssued: "2023-01-15",
        expiryDate: "2028-01-15",
        verified: true
      }
    ],
    portfolio: [
      {
        id: "port-001",
        type: "image",
        url: "/images/portfolio/john-doyle-1.jpg",
        title: "Commercial Office Wiring",
        description: "Complete electrical installation for a 10,000 sq ft office building in Dublin City Centre."
      },
      {
        id: "port-002",
        type: "image",
        url: "/images/portfolio/john-doyle-2.jpg",
        title: "Smart Home Installation",
        description: "Integrated smart lighting, security, and HVAC controls for a modern home in Malahide."
      }
    ],
    profileUrl: "/professionals/prof-001",
    profileImageUrl: "/images/profiles/john-doyle.jpg",
    createdAt: "2023-10-15T10:20:30Z",
    updatedAt: "2024-03-25T14:15:45Z"
  },
  {
    id: "prof-002",
    name: "Sarah Murphy",
    title: "Structural Engineer",
    location: "Cork, Ireland",
    bio: "Chartered structural engineer with expertise in residential and commercial buildings. Specialized in sustainable construction methods and seismic design.",
    contactEmail: "sarah.murphy@example.com",
    contactPhone: "+353 85 765 4321",
    experienceYears: 8,
    hourlyRate: 60,
    availability: "freelance",
    skills: ["Structural Analysis", "Seismic Design", "AutoCAD", "Revit", "Sustainable Construction"],
    certifications: [
      {
        id: "cert-003",
        name: "Chartered Engineer",
        issuer: "Engineers Ireland",
        dateIssued: "2018-06-22",
        verified: true
      },
      {
        id: "cert-004",
        name: "LEED Accredited Professional",
        issuer: "US Green Building Council",
        dateIssued: "2020-03-10",
        verified: false
      }
    ],
    portfolio: [
      {
        id: "port-003",
        type: "image",
        url: "/images/portfolio/sarah-murphy-1.jpg",
        title: "Mixed-Use Development",
        description: "Structural design for a 6-story mixed-use development in Cork City."
      },
      {
        id: "port-004",
        type: "video",
        url: "/videos/portfolio/sarah-murphy-1.mp4",
        title: "Sustainable Housing Project",
        description: "Eco-friendly housing development using timber frame construction and passive design principles."
      }
    ],
    profileUrl: "/professionals/prof-002",
    profileImageUrl: "/images/profiles/sarah-murphy.jpg",
    createdAt: "2023-11-02T09:15:20Z",
    updatedAt: "2024-02-18T11:45:30Z"
  },
  {
    id: "prof-003",
    name: "Michael O'Brien",
    title: "Master Plumber",
    location: "Galway, Ireland",
    bio: "Master plumber with experience in residential and commercial plumbing systems. Specializing in eco-friendly water systems and heating solutions.",
    contactEmail: "michael.obrien@example.com",
    whatsapp: "+353 83 555 7890",
    experienceYears: 12,
    hourlyRate: 40,
    availability: "employed",
    skills: ["Plumbing Installation", "Heating Systems", "Water Conservation", "Gas Fitting", "Emergency Repairs"],
    certifications: [
      {
        id: "cert-005",
        name: "Registered Gas Installer",
        issuer: "Register of Gas Installers of Ireland",
        dateIssued: "2016-07-14",
        expiryDate: "2026-07-14",
        verified: true
      },
      {
        id: "cert-006",
        name: "Safe Pass",
        issuer: "SOLAS",
        dateIssued: "2022-05-20",
        expiryDate: "2027-05-20",
        verified: true
      }
    ],
    portfolio: [
      {
        id: "port-005",
        type: "image",
        url: "/images/portfolio/michael-obrien-1.jpg",
        title: "Hotel Plumbing System",
        description: "Complete plumbing installation for a 120-room hotel in Galway."
      }
    ],
    profileUrl: "/professionals/prof-003",
    profileImageUrl: "/images/profiles/michael-obrien.jpg",
    createdAt: "2023-12-05T16:40:10Z",
    updatedAt: "2024-01-30T09:20:15Z"
  }
];

export const getProfileById = (id: string): Professional | undefined => {
  return professionals.find(professional => professional.id === id);
};

export const getFilteredProfessionals = (
  skills?: string[],
  location?: string,
  availability?: AvailabilityStatus
): Professional[] => {
  return professionals.filter(professional => {
    // Filter by skills if provided
    if (skills && skills.length > 0) {
      const hasSkill = skills.some(skill => 
        professional.skills.some(profSkill => 
          profSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );
      if (!hasSkill) return false;
    }
    
    // Filter by location if provided
    if (location && !professional.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    
    // Filter by availability if provided
    if (availability && professional.availability !== availability) {
      return false;
    }
    
    return true;
  });
}; 