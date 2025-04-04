import { create } from 'zustand';
import { User } from '@/data/mock';

export type UserType = 'business' | 'professional' | null;

// Portfolio Item interface
export interface IPortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  altText?: string;
  tags?: string[];
  date: string;
}

// Certification interface
export interface ICertification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  validUntil?: string;
  verified?: boolean;
  documentUrl?: string;
}

// Professional interface
export interface IProfessional {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  skills?: string[];
  certifications?: ICertification[];
  portfolio?: IPortfolioItem[];
  availability: boolean;
  location?: string;
  profileComplete: number;
  verified?: boolean;
  experienceLevel?: 'beginner' | 'intermediate' | 'expert';
  projectTypes?: string[];
  yearsOfExperience?: number;
  coverImageUrl?: string;
}

// Business interface
export interface IBusiness {
  id: string;
  name: string;
  email: string;
  phone?: string;
  description?: string;
  industry?: string[];
  location?: string;
  verified?: boolean;
  profileComplete: number;
  logoUrl?: string;
}

// Job interface
export interface IJob {
  id: string;
  title: string;
  description: string;
  businessId: string;
  businessName: string;
  location: string;
  skills?: string[];
  datePosted: string;
  deadline?: string;
  status: 'draft' | 'open' | 'closed' | 'expired';
  salaryMin?: number;
  salaryMax?: number;
  salaryType?: 'hourly' | 'daily' | 'annual';
}

// Job Filters interface
export interface JobFilters {
  skills: string[];
  location?: string;
  status: 'open' | 'closed' | 'draft' | null;
  searchQuery?: string;
  jobType?: string[];
  salaryMin?: number;
  salaryMax?: number;
  datePosted?: string;
  experienceLevel?: string[];
  certifications?: string[];
  remoteOnly?: boolean;
  savedFilters?: boolean;
}

// Professional Filters interface
export interface ProfessionalFilters {
  skills: string[];
  availability: boolean | null;
  location?: string;
  verified: boolean | null;
  experienceLevel: 'entry' | 'intermediate' | 'expert' | null;
  hasCertifications: boolean | null;
  maxDistance: number | null;
  projectTypes: string[];
}

interface AppState {
  isAuthenticated: boolean;
  userType: UserType;
  currentUser: User | null;
  professional: IProfessional | null;
  business: IBusiness | null;
  jobs: IJob[];
  // Professional filters state
  professionalFilters: ProfessionalFilters;
  // Job filters state
  jobFilters: JobFilters;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUserType: (userType: UserType) => void;
  setCurrentUser: (user: User | null) => void;
  setProfessional: (professional: IProfessional | null) => void;
  setBusiness: (business: IBusiness | null) => void;
  updateJob: (job: IJob) => void;
  // Set professional filters function
  setProfessionalFilters: (filters: Partial<ProfessionalFilters>) => void;
  // Set job filters function
  setJobFilters: (filters: Partial<JobFilters>) => void;
  logout: () => void;
  
  // Navigation state
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  
  // UI preferences
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Auth state
  isAuthenticated: false,
  userType: null,
  currentUser: null,
  professional: null,
  business: null,
  jobs: [],
  // Initialize professionalFilters with default values
  professionalFilters: {
    skills: [],
    availability: null,
    location: undefined,
    verified: null,
    experienceLevel: null,
    hasCertifications: null,
    maxDistance: null,
    projectTypes: [],
  },
  // Initialize jobFilters with default values
  jobFilters: {
    skills: [],
    location: undefined,
    status: null,
    searchQuery: '',
    jobType: [],
    salaryMin: undefined,
    salaryMax: undefined,
    datePosted: undefined,
    experienceLevel: [],
    certifications: [],
    remoteOnly: false,
    savedFilters: false,
  },
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setUserType: (userType) => set({ userType }),
  setCurrentUser: (user) => set({ currentUser: user }),
  setProfessional: (professional) => set({ professional }),
  setBusiness: (business) => set({ business }),
  updateJob: (job) => set((state) => ({
    jobs: state.jobs.map((j) => (j.id === job.id ? job : j))
  })),
  // Implement setProfessionalFilters to merge new values with existing ones
  setProfessionalFilters: (filters) => set((state) => ({
    professionalFilters: { ...state.professionalFilters, ...filters }
  })),
  // Implement setJobFilters to merge new values with existing ones
  setJobFilters: (filters) => set((state) => ({
    jobFilters: { ...state.jobFilters, ...filters }
  })),
  logout: () => set({
    isAuthenticated: false,
    userType: null,
    currentUser: null,
    professional: null,
    business: null
  }),
  
  // Navigation state
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  
  // UI preferences
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
})); 