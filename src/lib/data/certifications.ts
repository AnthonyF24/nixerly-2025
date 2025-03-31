export type CertificationType = 'safety' | 'technical' | 'professional' | 'educational';

export type Certification = {
  id: string;
  name: string;
  type: CertificationType;
  description: string;
  issuer: string;
  validityPeriod?: number; // in months
  iconUrl?: string;
};

export const certifications: Certification[] = [
  {
    id: "cert-type-001",
    name: "Safe Pass",
    type: "safety",
    description: "A mandatory safety awareness training program for all construction workers in Ireland. It ensures that workers have a basic knowledge of health and safety and helps to maintain minimum safety standards on construction sites.",
    issuer: "SOLAS",
    validityPeriod: 48, // 4 years
    iconUrl: "/images/certifications/safe-pass.png"
  },
  {
    id: "cert-type-002",
    name: "Manual Handling",
    type: "safety",
    description: "Training that covers the correct techniques for lifting, carrying, pushing, pulling, and moving heavy or awkward objects to prevent workplace injuries.",
    issuer: "Health and Safety Authority (HSA)",
    validityPeriod: 36, // 3 years
    iconUrl: "/images/certifications/manual-handling.png"
  },
  {
    id: "cert-type-003",
    name: "Master Electrician License",
    type: "professional",
    description: "Professional certification for electricians who have demonstrated advanced knowledge and skills in electrical installations, maintenance, and safety regulations.",
    issuer: "Electrical Contractors Association of Ireland",
    iconUrl: "/images/certifications/master-electrician.png"
  },
  {
    id: "cert-type-004",
    name: "Chartered Engineer",
    type: "professional",
    description: "Professional title that represents the highest standard of engineering competence. It requires a combination of education, professional experience, and a commitment to continuing professional development.",
    issuer: "Engineers Ireland",
    iconUrl: "/images/certifications/chartered-engineer.png"
  },
  {
    id: "cert-type-005",
    name: "Registered Gas Installer",
    type: "technical",
    description: "Required certification for anyone working with gas installations in Ireland. Ensures competence in safe gas installation and maintenance practices.",
    issuer: "Register of Gas Installers of Ireland",
    validityPeriod: 120, // 10 years
    iconUrl: "/images/certifications/gas-installer.png"
  },
  {
    id: "cert-type-006",
    name: "CSCS Card",
    type: "safety",
    description: "Construction Skills Certification Scheme card that proves the holder has the necessary training and qualifications for their specific role on a construction site.",
    issuer: "SOLAS",
    validityPeriod: 60, // 5 years
    iconUrl: "/images/certifications/cscs.png"
  },
  {
    id: "cert-type-007",
    name: "LEED Accredited Professional",
    type: "professional",
    description: "Certification for professionals skilled in green building practices and the LEED (Leadership in Energy and Environmental Design) rating system.",
    issuer: "US Green Building Council",
    iconUrl: "/images/certifications/leed.png"
  },
  {
    id: "cert-type-008",
    name: "Passive House Designer",
    type: "technical",
    description: "Certification for professionals specializing in the design of ultra-low energy buildings that require little energy for heating or cooling.",
    issuer: "Passive House Institute",
    iconUrl: "/images/certifications/passive-house.png"
  }
];

export const getCertificationsByType = (type: CertificationType): Certification[] => {
  return certifications.filter(cert => cert.type === type);
};

export const getCertificationById = (id: string): Certification | undefined => {
  return certifications.find(cert => cert.id === id);
}; 