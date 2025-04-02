// Theme utility functions for dashboard customization

export type ColorTheme = {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  // Predefined classes to work with Tailwind JIT
  classes: {
    // Primary classes
    primaryBg: string;
    primaryBgLight: string;
    primaryText: string;
    primaryBorder: string;
    primaryHover: string;
    primaryButton: string;
    primaryButtonHover: string;
    // Secondary classes
    secondaryBg: string;
    secondaryBgLight: string;
    secondaryText: string;
    secondaryBorder: string;
    secondaryHover: string;
    secondaryButton: string;
    secondaryButtonHover: string;
    // Accent classes
    accentBg: string;
    accentText: string;
    accentBorder: string;
    // Gradients
    headerGradient: string;
    textGradient: string;
  };
};

// Predefined themes with all necessary Tailwind classes
export const businessThemes: ColorTheme[] = [
  {
    name: "Blue",
    primaryColor: "blue",
    secondaryColor: "purple",
    accentColor: "teal",
    classes: {
      // Primary (blue)
      primaryBg: "bg-blue-50",
      primaryBgLight: "bg-blue-50/50",
      primaryText: "text-blue-600",
      primaryBorder: "border-blue-200",
      primaryHover: "hover:bg-blue-50",
      primaryButton: "bg-blue-600 text-white",
      primaryButtonHover: "hover:bg-blue-700",
      // Secondary (purple)
      secondaryBg: "bg-purple-50",
      secondaryBgLight: "bg-purple-50/50",
      secondaryText: "text-purple-600",
      secondaryBorder: "border-purple-200",
      secondaryHover: "hover:bg-purple-50",
      secondaryButton: "bg-purple-600 text-white",
      secondaryButtonHover: "hover:bg-purple-700",
      // Accent (teal)
      accentBg: "bg-teal-50",
      accentText: "text-teal-600",
      accentBorder: "border-teal-200",
      // Gradients
      headerGradient: "bg-gradient-to-r from-blue-600/10 to-purple-600/10",
      textGradient: "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
    }
  },
  {
    name: "Purple",
    primaryColor: "purple",
    secondaryColor: "indigo",
    accentColor: "pink",
    classes: {
      // Primary (purple)
      primaryBg: "bg-purple-50",
      primaryBgLight: "bg-purple-50/50",
      primaryText: "text-purple-600",
      primaryBorder: "border-purple-200",
      primaryHover: "hover:bg-purple-50",
      primaryButton: "bg-purple-600 text-white",
      primaryButtonHover: "hover:bg-purple-700",
      // Secondary (indigo)
      secondaryBg: "bg-indigo-50",
      secondaryBgLight: "bg-indigo-50/50",
      secondaryText: "text-indigo-600",
      secondaryBorder: "border-indigo-200",
      secondaryHover: "hover:bg-indigo-50",
      secondaryButton: "bg-indigo-600 text-white",
      secondaryButtonHover: "hover:bg-indigo-700",
      // Accent (pink)
      accentBg: "bg-pink-50",
      accentText: "text-pink-600",
      accentBorder: "border-pink-200",
      // Gradients
      headerGradient: "bg-gradient-to-r from-purple-600/10 to-indigo-600/10",
      textGradient: "bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
    }
  },
  {
    name: "Green",
    primaryColor: "emerald",
    secondaryColor: "teal",
    accentColor: "sky",
    classes: {
      // Primary (emerald)
      primaryBg: "bg-emerald-50",
      primaryBgLight: "bg-emerald-50/50",
      primaryText: "text-emerald-600",
      primaryBorder: "border-emerald-200",
      primaryHover: "hover:bg-emerald-50",
      primaryButton: "bg-emerald-600 text-white",
      primaryButtonHover: "hover:bg-emerald-700",
      // Secondary (teal)
      secondaryBg: "bg-teal-50",
      secondaryBgLight: "bg-teal-50/50",
      secondaryText: "text-teal-600",
      secondaryBorder: "border-teal-200",
      secondaryHover: "hover:bg-teal-50",
      secondaryButton: "bg-teal-600 text-white",
      secondaryButtonHover: "hover:bg-teal-700",
      // Accent (sky)
      accentBg: "bg-sky-50",
      accentText: "text-sky-600",
      accentBorder: "border-sky-200",
      // Gradients
      headerGradient: "bg-gradient-to-r from-emerald-600/10 to-teal-600/10",
      textGradient: "bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
    }
  },
  {
    name: "Red",
    primaryColor: "red",
    secondaryColor: "orange",
    accentColor: "amber",
    classes: {
      // Primary (red)
      primaryBg: "bg-red-50",
      primaryBgLight: "bg-red-50/50",
      primaryText: "text-red-600",
      primaryBorder: "border-red-200",
      primaryHover: "hover:bg-red-50",
      primaryButton: "bg-red-600 text-white",
      primaryButtonHover: "hover:bg-red-700",
      // Secondary (orange)
      secondaryBg: "bg-orange-50",
      secondaryBgLight: "bg-orange-50/50",
      secondaryText: "text-orange-600",
      secondaryBorder: "border-orange-200",
      secondaryHover: "hover:bg-orange-50",
      secondaryButton: "bg-orange-600 text-white",
      secondaryButtonHover: "hover:bg-orange-700",
      // Accent (amber)
      accentBg: "bg-amber-50",
      accentText: "text-amber-600",
      accentBorder: "border-amber-200",
      // Gradients
      headerGradient: "bg-gradient-to-r from-red-600/10 to-orange-600/10",
      textGradient: "bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"
    }
  },
  {
    name: "Dark",
    primaryColor: "gray",
    secondaryColor: "slate",
    accentColor: "zinc",
    classes: {
      // Primary (gray)
      primaryBg: "bg-gray-100",
      primaryBgLight: "bg-gray-100/50",
      primaryText: "text-gray-600",
      primaryBorder: "border-gray-300",
      primaryHover: "hover:bg-gray-100",
      primaryButton: "bg-gray-700 text-white",
      primaryButtonHover: "hover:bg-gray-800",
      // Secondary (slate)
      secondaryBg: "bg-slate-100",
      secondaryBgLight: "bg-slate-100/50",
      secondaryText: "text-slate-600", 
      secondaryBorder: "border-slate-300",
      secondaryHover: "hover:bg-slate-100",
      secondaryButton: "bg-slate-700 text-white",
      secondaryButtonHover: "hover:bg-slate-800",
      // Accent (zinc)
      accentBg: "bg-zinc-100",
      accentText: "text-zinc-600",
      accentBorder: "border-zinc-300",
      // Gradients
      headerGradient: "bg-gradient-to-r from-gray-600/10 to-slate-600/10",
      textGradient: "bg-gradient-to-r from-gray-700 to-slate-700 bg-clip-text text-transparent"
    }
  }
]; 