import { create } from 'zustand';
import { User, Professional } from '@/data/mock';

type UserType = 'business' | 'professional' | null;

interface AppState {
  isAuthenticated: boolean;
  userType: UserType;
  currentUser: User | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUserType: (userType: UserType) => void;
  setCurrentUser: (user: User | null) => void;
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
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setUserType: (userType) => set({ userType }),
  setCurrentUser: (user) => set({ currentUser: user }),
  logout: () => set({
    isAuthenticated: false,
    userType: null,
    currentUser: null
  }),
  
  // Navigation state
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  
  // UI preferences
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
})); 