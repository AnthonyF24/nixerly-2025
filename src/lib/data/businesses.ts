export type Business = {
  id: string;
  name: string;
  type: 'contractor' | 'agency' | 'company';
  industry: string;
  location: string;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export const businesses: Business[] = [
  {
    id: "bus-001",
    name: "Murphy Construction Ltd",
    type: "contractor",
    industry: "Construction",
    location: "Dublin, Ireland",
    description: "Full-service construction contractor specializing in commercial and residential projects across Ireland. Over 25 years of experience delivering quality buildings on time and within budget.",
    contactEmail: "info@murphyconstruction.ie",
    contactPhone: "+353 1 234 5678",
    website: "https://www.murphyconstruction.ie",
    logoUrl: "/images/logos/murphy-construction.png",
    createdAt: "2023-09-10T09:00:00Z",
    updatedAt: "2024-02-15T14:30:00Z"
  },
  {
    id: "bus-002",
    name: "Build Talent Recruitment",
    type: "agency",
    industry: "Recruitment",
    location: "Cork, Ireland",
    description: "Specialized recruitment agency focusing on connecting construction professionals with leading companies across Ireland. Experts in permanent and contract placements.",
    contactEmail: "recruit@buildtalent.ie",
    contactPhone: "+353 21 987 6543",
    website: "https://www.buildtalent.ie",
    logoUrl: "/images/logos/build-talent.png",
    createdAt: "2023-10-05T11:20:00Z",
    updatedAt: "2024-03-01T10:15:00Z"
  },
  {
    id: "bus-003",
    name: "GreenBuild Systems",
    type: "company",
    industry: "Sustainable Construction",
    location: "Galway, Ireland",
    description: "Leading sustainable construction company specializing in eco-friendly building solutions, passive houses, and renewable energy installations for both residential and commercial clients.",
    contactEmail: "hello@greenbuild.ie",
    contactPhone: "+353 91 555 4321",
    website: "https://www.greenbuild.ie",
    logoUrl: "/images/logos/greenbuild.png",
    createdAt: "2024-01-15T08:45:00Z",
    updatedAt: "2024-03-10T16:20:00Z"
  }
];

export const getBusinessById = (id: string): Business | undefined => {
  return businesses.find(business => business.id === id);
}; 