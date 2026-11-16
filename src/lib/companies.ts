export interface CompanyColors {
  primary: string;
  primaryHover: string;
  bgLight: string;
  bgLightHover: string;
  gradientStart: string;
  gradientEnd: string;
  textAccent: string;
}

export interface CompanyConfig {
  id: string;
  primaryColor: string;
  slug: string;
  name: string;
  logoText: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  colors: CompanyColors;
}

export const COMPANIES: Record<string, CompanyConfig> = {
  gharsetu: {
    id: "gharsetu",
    primaryColor: "#0F766E",
    slug: "gharsetu",
    name: "Gharsetu Realty",
    logoText: "Gharsetu Realty",
    tagline: "Pune's Most Trusted Real Estate Advisory",
    description:
      "Exclusive developer inventory in Baner, Wakad, Kharadi, and Hinjewadi with MahaRERA verified titles and 0% buyer brokerage.",
    phone: "+91 98201 44521",
    email: "advisory@gharsetu.com",
    address: "Level 4, Panchshil Business Park, Baner, Pune, MH 411045",
    colors: {
      primary: "#0F766E",
      primaryHover: "#0D655E",
      bgLight: "#F0FDFA",
      bgLightHover: "#CCFBF1",
      gradientStart: "#0F766E",
      gradientEnd: "#115E59",
      textAccent: "#0F766E",
    },
  },
  yogaplus: {
    id: "yogaplus",
    primaryColor: "#0F766E",
    slug: "yogaplus",
    name: "Gharsetu Realty",
    logoText: "Gharsetu Realty",
    tagline: "Pune's Most Trusted Real Estate Advisory",
    description:
      "Exclusive developer inventory in Baner, Wakad, Kharadi, and Hinjewadi with MahaRERA verified titles and 0% buyer brokerage.",
    phone: "+91 98201 44521",
    email: "advisory@gharsetu.com",
    address: "Level 4, Panchshil Business Park, Baner, Pune, MH 411045",
    colors: {
      primary: "#0F766E",
      primaryHover: "#0D655E",
      bgLight: "#F0FDFA",
      bgLightHover: "#CCFBF1",
      gradientStart: "#0F766E",
      gradientEnd: "#115E59",
      textAccent: "#0F766E",
    },
  },
};

export const DEFAULT_COMPANY = COMPANIES.gharsetu;

export function getCompanyConfig(slug?: string | null): CompanyConfig {
  if (!slug) return DEFAULT_COMPANY;

  const normalizedSlug = slug.toLowerCase();

  // If slug is "dashboard" or other path fragment, return default Gharsetu
  if (normalizedSlug === "dashboard" || normalizedSlug === "home" || normalizedSlug === "c") {
    return DEFAULT_COMPANY;
  }

  // Check direct match
  if (COMPANIES[normalizedSlug]) {
    return COMPANIES[normalizedSlug];
  }

  // Fallback with Gharsetu branding defaults
  return {
    ...DEFAULT_COMPANY,
    slug: normalizedSlug,
    name: "Gharsetu Realty",
    logoText: "Gharsetu Realty",
  };
}
