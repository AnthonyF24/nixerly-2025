import { v4 as uuidv4 } from 'uuid';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'business' | 'professional';
  joinedAt: string;
  location: string;
  bio?: string;
  skills?: string[];
  company?: string;
  position?: string;
};

export const users: User[] = [
  {
    id: uuidv4(),
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: '/avatars/alex.jpg',
    role: 'business',
    joinedAt: '2023-05-15T10:00:00Z',
    location: 'San Francisco, CA',
    company: 'TechInnovate',
    position: 'CTO'
  },
  {
    id: uuidv4(),
    name: 'Jordan Smith',
    email: 'jordan@example.com',
    avatar: '/avatars/jordan.jpg',
    role: 'professional',
    joinedAt: '2023-02-08T14:30:00Z',
    location: 'New York, NY',
    bio: 'Experienced system administrator with 8+ years in cloud infrastructure.',
    skills: ['Linux', 'AWS', 'Docker', 'Kubernetes', 'Terraform']
  },
  {
    id: uuidv4(),
    name: 'Sam Rodriguez',
    email: 'sam@example.com',
    avatar: '/avatars/sam.jpg',
    role: 'business',
    joinedAt: '2023-07-22T09:15:00Z',
    location: 'Austin, TX',
    company: 'GrowthScale',
    position: 'Founder'
  },
  {
    id: uuidv4(),
    name: 'Taylor Greene',
    email: 'taylor@example.com',
    avatar: '/avatars/taylor.jpg',
    role: 'professional',
    joinedAt: '2023-01-12T11:45:00Z',
    location: 'Seattle, WA',
    bio: 'DevOps engineer specialized in NixOS and automated deployments.',
    skills: ['NixOS', 'CI/CD', 'Jenkins', 'Ansible', 'Python']
  },
  {
    id: uuidv4(),
    name: 'Morgan Chen',
    email: 'morgan@example.com',
    avatar: '/avatars/morgan.jpg',
    role: 'professional',
    joinedAt: '2023-04-18T08:20:00Z',
    location: 'Boston, MA',
    bio: 'Full-stack developer with strong focus on Nix environments and reproducible builds.',
    skills: ['Nix', 'JavaScript', 'React', 'Node.js', 'PostgreSQL']
  }
];

// Return the current user (first in the list) for demo purposes
export const getCurrentUser = (): User => users[0]; 