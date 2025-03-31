import { create } from 'zustand';

// Professional types
export interface IProfessional {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  skills: string[];
  certifications: ICertification[];
  portfolio: IPortfolioItem[];
  availability: boolean;
  location?: string;
  profileComplete: number;
  verified: boolean;
}

export interface ICertification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  validUntil?: string;
  verified: boolean;
  documentUrl?: string;
}

export interface IPortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
  tags: string[];
  date: string;
}

// Business types
export interface IBusiness {
  id: string;
  name: string;
  email: string;
  phone?: string;
  description?: string;
  industry: string[];
  location?: string;
  verified: boolean;
}

export interface IJob {
  id: string;
  title: string;
  description: string;
  businessId: string;
  businessName: string;
  location?: string;
  skills: string[];
  datePosted: string;
  deadline?: string;
  status: 'open' | 'closed' | 'draft';
}

// Filter types
export interface IProfessionalFilters {
  skills: string[];
  availability: boolean | null;
  location?: string;
  verified: boolean | null;
}

export interface IJobFilters {
  skills: string[];
  location?: string;
  status: 'open' | 'closed' | 'draft' | null;
}

// Store types
interface AppState {
  userType: 'professional' | 'business' | null;
  professional: IProfessional | null;
  business: IBusiness | null;
  jobs: IJob[];
  professionalFilters: IProfessionalFilters;
  jobFilters: IJobFilters;
  isAuthenticated: boolean;
  
  // Actions
  setUserType: (type: 'professional' | 'business' | null) => void;
  setProfessional: (professional: IProfessional | null) => void;
  setBusiness: (business: IBusiness | null) => void;
  setJobs: (jobs: IJob[]) => void;
  addJob: (job: IJob) => void;
  updateJob: (job: IJob) => void;
  setProfessionalFilters: (filters: Partial<IProfessionalFilters>) => void;
  setJobFilters: (filters: Partial<IJobFilters>) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  userType: null,
  professional: null,
  business: null,
  jobs: [],
  professionalFilters: {
    skills: [],
    availability: null,
    location: undefined,
    verified: null,
  },
  jobFilters: {
    skills: [],
    location: undefined,
    status: null,
  },
  isAuthenticated: false,
  
  // Actions
  setUserType: (type) => set({ userType: type }),
  setProfessional: (professional) => set({ professional }),
  setBusiness: (business) => set({ business }),
  setJobs: (jobs) => set({ jobs }),
  addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),
  updateJob: (job) => set((state) => ({
    jobs: state.jobs.map((j) => (j.id === job.id ? job : j)),
  })),
  setProfessionalFilters: (filters) => set((state) => ({
    professionalFilters: { ...state.professionalFilters, ...filters },
  })),
  setJobFilters: (filters) => set((state) => ({
    jobFilters: { ...state.jobFilters, ...filters },
  })),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  logout: () => set({
    userType: null,
    professional: null,
    business: null,
    isAuthenticated: false,
  }),
})); 