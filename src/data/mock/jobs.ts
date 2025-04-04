import { v4 as uuidv4 } from 'uuid';
import { users } from './users';

export type JobStatus = 'open' | 'in_progress' | 'completed' | 'canceled';

export type JobType = 'full_time' | 'contract' | 'project_based' | 'consulting';

export type Job = {
  id: string;
  title: string;
  description: string;
  businessId: string;
  status: JobStatus;
  type: JobType;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  location: string;
  isRemote: boolean;
  skills: string[];
  postedAt: string;
  deadline?: string;
  applicants?: number;
  views?: number;
};

// Get business users for job creation
const businessUsers = users.filter(user => user.role === 'business');

export const jobs: Job[] = [
  {
    id: uuidv4(),
    title: 'NixOS System Configuration Expert Needed',
    description: 'We need a NixOS expert to help configure our development environment and ensure reproducible builds across our engineering team. The ideal candidate will have experience with NixOS, flakes, and container integration.',
    businessId: businessUsers[0]?.id || '',
    status: 'open',
    type: 'project_based',
    budget: {
      min: 2000,
      max: 5000,
      currency: 'USD'
    },
    location: 'San Francisco, CA',
    isRemote: true,
    skills: ['NixOS', 'Linux', 'DevOps', 'Containerization'],
    postedAt: '2024-03-28T15:30:00Z',
    deadline: '2024-04-28T23:59:59Z',
    applicants: 8,
    views: 45
  },
  {
    id: uuidv4(),
    title: 'DevOps Engineer - Nix Focus',
    description: 'Looking for a DevOps engineer to help maintain and improve our Nix-based infrastructure. You will be responsible for automating deployments, managing our build system, and optimizing our development workflow.',
    businessId: businessUsers[1]?.id || businessUsers[0]?.id || '',
    status: 'open',
    type: 'full_time',
    budget: {
      min: 100000,
      max: 140000,
      currency: 'USD'
    },
    location: 'Austin, TX',
    isRemote: true,
    skills: ['Nix', 'DevOps', 'CI/CD', 'Cloud Infrastructure', 'Docker'],
    postedAt: '2024-03-25T10:15:00Z',
    deadline: '2024-05-15T23:59:59Z',
    applicants: 12,
    views: 87
  },
  {
    id: uuidv4(),
    title: 'Build System Migration to Nix',
    description: 'We are looking to migrate our current build system to Nix to improve reproducibility and reliability. The consultant will help design and implement this migration, train our team, and document best practices.',
    businessId: businessUsers[0]?.id || '',
    status: 'open',
    type: 'consulting',
    budget: {
      min: 5000,
      max: 10000,
      currency: 'USD'
    },
    location: 'Remote',
    isRemote: true,
    skills: ['Nix', 'Build Systems', 'CI/CD', 'Documentation', 'Training'],
    postedAt: '2024-03-20T09:45:00Z',
    deadline: '2024-04-20T23:59:59Z',
    applicants: 4,
    views: 32
  },
  {
    id: uuidv4(),
    title: 'Linux System Administrator - NixOS Experience',
    description: 'Seeking a Linux system administrator with NixOS experience to manage our server infrastructure. Will be responsible for server maintenance, security updates, and optimizing system performance.',
    businessId: businessUsers[1]?.id || businessUsers[0]?.id || '',
    status: 'open',
    type: 'full_time',
    budget: {
      min: 90000,
      max: 120000,
      currency: 'USD'
    },
    location: 'New York, NY',
    isRemote: false,
    skills: ['NixOS', 'Linux', 'System Administration', 'Security', 'Networking'],
    postedAt: '2024-03-18T14:20:00Z',
    deadline: '2024-04-30T23:59:59Z',
    applicants: 6,
    views: 53
  },
  {
    id: uuidv4(),
    title: 'Nix Package Maintenance Contract',
    description: 'We need a contractor to help maintain and update our custom Nix packages. This includes keeping dependencies up to date, ensuring package compatibility, and fixing build issues as they arise.',
    businessId: businessUsers[0]?.id || '',
    status: 'open',
    type: 'contract',
    budget: {
      min: 40,
      max: 60,
      currency: 'USD'
    },
    location: 'Remote',
    isRemote: true,
    skills: ['Nix', 'Package Management', 'Linux', 'Debugging'],
    postedAt: '2024-03-15T11:30:00Z',
    deadline: '2024-04-15T23:59:59Z',
    applicants: 9,
    views: 41
  }
];

// Helper functions for job filtering and sorting
export const getOpenJobs = (): Job[] => jobs.filter(job => job.status === 'open');

export const getJobsByBusiness = (businessId: string): Job[] => {
  return jobs.filter(job => job.businessId === businessId);
};

export const getJobById = (jobId: string): Job | undefined => {
  return jobs.find(job => job.id === jobId);
}; 