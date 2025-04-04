// Theme utility functions for dashboard customization

export type ColorTheme = {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  classes: {
    primaryText: string;
    primaryBg: string;
    primaryBgLight: string;
    primaryBorder: string;
    primaryButton: string;
    primaryButtonHover: string;
    secondaryBg: string;
    secondaryBgLight: string;
    secondaryBorder: string;
    accentBg: string;
    accentBorder: string;
    headerGradient: string;
    textGradient: string;
  };
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
    gradientTo: 'to-purple-600',
    classes: {
      primaryText: 'text-blue-600',
      primaryBg: 'bg-blue-600',
      primaryBgLight: 'bg-blue-50',
      primaryBorder: 'border-blue-200',
      primaryButton: 'bg-blue-600 text-white',
      primaryButtonHover: 'hover:bg-blue-700',
      secondaryBg: 'bg-gray-200',
      secondaryBgLight: 'bg-gray-50',
      secondaryBorder: 'border-gray-200',
      accentBg: 'bg-yellow-50',
      accentBorder: 'border-yellow-200',
      headerGradient: 'bg-gradient-to-r from-blue-50 to-purple-50',
      textGradient: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
    }
  },
  {
    id: 'teal',
    name: 'Teal Enterprise',
    primaryColor: 'bg-teal-600',
    secondaryColor: 'bg-teal-100',
    accentColor: 'bg-blue-600',
    gradientFrom: 'from-teal-600',
    gradientTo: 'to-blue-600',
    classes: {
      primaryText: 'text-teal-600',
      primaryBg: 'bg-teal-600',
      primaryBgLight: 'bg-teal-50',
      primaryBorder: 'border-teal-200',
      primaryButton: 'bg-teal-600 text-white',
      primaryButtonHover: 'hover:bg-teal-700',
      secondaryBg: 'bg-gray-200',
      secondaryBgLight: 'bg-gray-50',
      secondaryBorder: 'border-gray-200',
      accentBg: 'bg-blue-50',
      accentBorder: 'border-blue-200',
      headerGradient: 'bg-gradient-to-r from-teal-50 to-blue-50',
      textGradient: 'bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent'
    }
  },
  {
    id: 'indigo',
    name: 'Indigo Corporate',
    primaryColor: 'bg-indigo-600',
    secondaryColor: 'bg-indigo-100',
    accentColor: 'bg-pink-600',
    gradientFrom: 'from-indigo-600',
    gradientTo: 'to-pink-500',
    classes: {
      primaryText: 'text-indigo-600',
      primaryBg: 'bg-indigo-600',
      primaryBgLight: 'bg-indigo-50',
      primaryBorder: 'border-indigo-200',
      primaryButton: 'bg-indigo-600 text-white',
      primaryButtonHover: 'hover:bg-indigo-700',
      secondaryBg: 'bg-gray-200',
      secondaryBgLight: 'bg-gray-50',
      secondaryBorder: 'border-gray-200',
      accentBg: 'bg-pink-50',
      accentBorder: 'border-pink-200',
      headerGradient: 'bg-gradient-to-r from-indigo-50 to-pink-50',
      textGradient: 'bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent'
    }
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
    gradientTo: 'to-indigo-600',
    classes: {
      primaryText: 'text-purple-600',
      primaryBg: 'bg-purple-600',
      primaryBgLight: 'bg-purple-50',
      primaryBorder: 'border-purple-200',
      primaryButton: 'bg-purple-600 text-white',
      primaryButtonHover: 'hover:bg-purple-700',
      secondaryBg: 'bg-gray-200',
      secondaryBgLight: 'bg-gray-50',
      secondaryBorder: 'border-gray-200',
      accentBg: 'bg-amber-50',
      accentBorder: 'border-amber-200',
      headerGradient: 'bg-gradient-to-r from-purple-50 to-indigo-50',
      textGradient: 'bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'
    }
  },
  {
    id: 'emerald',
    name: 'Emerald Developer',
    primaryColor: 'bg-emerald-600',
    secondaryColor: 'bg-emerald-100',
    accentColor: 'bg-blue-600',
    gradientFrom: 'from-emerald-600',
    gradientTo: 'to-blue-500',
    classes: {
      primaryText: 'text-emerald-600',
      primaryBg: 'bg-emerald-600',
      primaryBgLight: 'bg-emerald-50',
      primaryBorder: 'border-emerald-200',
      primaryButton: 'bg-emerald-600 text-white',
      primaryButtonHover: 'hover:bg-emerald-700',
      secondaryBg: 'bg-gray-200',
      secondaryBgLight: 'bg-gray-50',
      secondaryBorder: 'border-gray-200',
      accentBg: 'bg-blue-50',
      accentBorder: 'border-blue-200',
      headerGradient: 'bg-gradient-to-r from-emerald-50 to-blue-50',
      textGradient: 'bg-gradient-to-r from-emerald-600 to-blue-500 bg-clip-text text-transparent'
    }
  },
  {
    id: 'rose',
    name: 'Rose Consultant',
    primaryColor: 'bg-rose-600',
    secondaryColor: 'bg-rose-100',
    accentColor: 'bg-amber-600',
    gradientFrom: 'from-rose-600',
    gradientTo: 'to-orange-500',
    classes: {
      primaryText: 'text-rose-600',
      primaryBg: 'bg-rose-600',
      primaryBgLight: 'bg-rose-50',
      primaryBorder: 'border-rose-200',
      primaryButton: 'bg-rose-600 text-white',
      primaryButtonHover: 'hover:bg-rose-700',
      secondaryBg: 'bg-gray-200',
      secondaryBgLight: 'bg-gray-50',
      secondaryBorder: 'border-gray-200',
      accentBg: 'bg-amber-50',
      accentBorder: 'border-amber-200',
      headerGradient: 'bg-gradient-to-r from-rose-50 to-orange-50',
      textGradient: 'bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent'
    }
  }
]; 