// Theme utility functions for dashboard customization

export type ColorTheme = {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
};

// Predefined themes with all necessary Tailwind classes
export const businessThemes: ColorTheme[] = [
  {
    id: 'blue',
    name: 'Blue Professional',
    primaryColor: 'bg-blue-600',
    secondaryColor: 'bg-blue-100',
    accentColor: 'bg-purple-600',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-purple-600'
  },
  {
    id: 'teal',
    name: 'Teal Enterprise',
    primaryColor: 'bg-teal-600',
    secondaryColor: 'bg-teal-100',
    accentColor: 'bg-blue-600',
    gradientFrom: 'from-teal-600',
    gradientTo: 'to-blue-600'
  },
  {
    id: 'indigo',
    name: 'Indigo Corporate',
    primaryColor: 'bg-indigo-600',
    secondaryColor: 'bg-indigo-100',
    accentColor: 'bg-pink-600',
    gradientFrom: 'from-indigo-600',
    gradientTo: 'to-pink-500'
  }
];

export const professionalThemes: ColorTheme[] = [
  {
    id: 'purple',
    name: 'Purple Expert',
    primaryColor: 'bg-purple-600',
    secondaryColor: 'bg-purple-100',
    accentColor: 'bg-amber-600',
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-indigo-600'
  },
  {
    id: 'emerald',
    name: 'Emerald Developer',
    primaryColor: 'bg-emerald-600',
    secondaryColor: 'bg-emerald-100',
    accentColor: 'bg-blue-600',
    gradientFrom: 'from-emerald-600',
    gradientTo: 'to-blue-500'
  },
  {
    id: 'rose',
    name: 'Rose Consultant',
    primaryColor: 'bg-rose-600',
    secondaryColor: 'bg-rose-100',
    accentColor: 'bg-amber-600',
    gradientFrom: 'from-rose-600',
    gradientTo: 'to-orange-500'
  }
]; 