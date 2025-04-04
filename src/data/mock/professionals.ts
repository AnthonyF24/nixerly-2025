import { users, User } from './users';

export type Experience = {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  isCurrentPosition: boolean;
};

export type Education = {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  isCurrentlyEnrolled: boolean;
};

export type Professional = User & {
  headline: string;
  hourlyRate?: number;
  availability: 'full_time' | 'part_time' | 'weekends' | 'not_available';
  yearsOfExperience: number;
  experiences: Experience[];
  education: Education[];
  certifications: string[];
  portfolioUrls?: string[];
  rating?: number;
  completedJobs?: number;
  coverImageUrl?: string;
};

// Filter professionals from users and add professional-specific data
export const professionals: Professional[] = users
  .filter(user => user.role === 'professional')
  .map(user => {
    const professional: Professional = {
      ...user,
      headline: '',
      availability: 'full_time',
      yearsOfExperience: 0,
      experiences: [],
      education: [],
      certifications: [],
      rating: 0,
      completedJobs: 0,
    };

    // Add specific data based on user ID
    switch (user.name) {
      case 'Jordan Smith':
        return {
          ...professional,
          headline: 'Senior System Administrator | AWS Certified | NixOS Specialist',
          hourlyRate: 85,
          availability: 'full_time',
          yearsOfExperience: 8,
          experiences: [
            {
              title: 'Senior Systems Administrator',
              company: 'Cloud Systems Inc.',
              location: 'New York, NY',
              startDate: '2020-05-01',
              description: 'Managed cloud infrastructure and implemented NixOS deployments for enterprise clients.',
              isCurrentPosition: true
            },
            {
              title: 'DevOps Engineer',
              company: 'TechFlow Solutions',
              location: 'Boston, MA',
              startDate: '2017-03-15',
              endDate: '2020-04-30',
              description: 'Automated deployment processes and maintained Linux servers for clients.',
              isCurrentPosition: false
            }
          ],
          education: [
            {
              institution: 'New York University',
              degree: 'Bachelor of Science',
              field: 'Computer Science',
              startYear: 2013,
              endYear: 2017,
              isCurrentlyEnrolled: false
            }
          ],
          certifications: ['AWS Certified Solutions Architect', 'Red Hat Certified Engineer', 'Kubernetes Administrator'],
          rating: 4.8,
          completedJobs: 27,
          coverImageUrl: '/images/covers/tech-cover-1.jpg'
        };

      case 'Taylor Greene':
        return {
          ...professional,
          headline: 'DevOps Engineer | NixOS Expert | Infrastructure Automation',
          hourlyRate: 95,
          availability: 'full_time',
          yearsOfExperience: 6,
          experiences: [
            {
              title: 'Lead DevOps Engineer',
              company: 'Distributed Systems',
              location: 'Seattle, WA',
              startDate: '2021-02-01',
              description: 'Engineered comprehensive NixOS configurations for microservices architecture.',
              isCurrentPosition: true
            },
            {
              title: 'Infrastructure Engineer',
              company: 'ServerStack',
              location: 'Portland, OR',
              startDate: '2018-07-10',
              endDate: '2021-01-15',
              description: 'Managed server infrastructure and implemented CI/CD pipelines.',
              isCurrentPosition: false
            }
          ],
          education: [
            {
              institution: 'University of Washington',
              degree: 'Master of Science',
              field: 'Information Systems',
              startYear: 2016,
              endYear: 2018,
              isCurrentlyEnrolled: false
            },
            {
              institution: 'Oregon State University',
              degree: 'Bachelor of Science',
              field: 'Computer Engineering',
              startYear: 2012,
              endYear: 2016,
              isCurrentlyEnrolled: false
            }
          ],
          certifications: ['NixOS Certified Specialist', 'Jenkins Certified Engineer', 'Google Cloud Professional'],
          portfolioUrls: ['https://github.com/taylorgreene', 'https://devops-portfolio.example.com'],
          rating: 4.9,
          completedJobs: 32,
          coverImageUrl: '/images/covers/tech-cover-2.jpg'
        };

      case 'Morgan Chen':
        return {
          ...professional,
          headline: 'Full-Stack Developer | Nix Expert | Reproducible Build Systems',
          hourlyRate: 75,
          availability: 'part_time',
          yearsOfExperience: 5,
          experiences: [
            {
              title: 'Senior Developer',
              company: 'Reliable Apps',
              location: 'Boston, MA',
              startDate: '2022-01-15',
              description: 'Developed full-stack applications with a focus on reproducible builds using Nix.',
              isCurrentPosition: true
            },
            {
              title: 'Web Developer',
              company: 'Digital Solutions',
              location: 'Cambridge, MA',
              startDate: '2019-06-01',
              endDate: '2022-01-10',
              description: 'Developed web applications and introduced Nix-based development environments.',
              isCurrentPosition: false
            }
          ],
          education: [
            {
              institution: 'Massachusetts Institute of Technology',
              degree: 'Bachelor of Science',
              field: 'Computer Science',
              startYear: 2015,
              endYear: 2019,
              isCurrentlyEnrolled: false
            }
          ],
          certifications: ['Node.js Certification', 'React Developer Certification', 'Nix Package Manager Expert'],
          portfolioUrls: ['https://github.com/morganchen', 'https://morganchen-dev.example.com'],
          rating: 4.7,
          completedJobs: 18,
          coverImageUrl: '/images/covers/tech-cover-3.jpg'
        };

      default:
        return professional;
    }
  });

// Helper functions
export const getProfessionalById = (id: string): Professional | undefined => {
  return professionals.find(prof => prof.id === id);
};

export const getProfessionalsBySkill = (skill: string): Professional[] => {
  return professionals.filter(prof => prof.skills?.includes(skill));
};

export const getTopRatedProfessionals = (limit: number = 5): Professional[] => {
  return [...professionals]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
}; 