/**
 * Gharsetu Realty - Site Configuration
 * Centralized verifiable credentials, legal claims, and contact data.
 * All MahaRERA numbers and legal claims are stored here for easy verification.
 */

export interface TrustMetric {
  id: string;
  label: string;
  value: string;
  description: string;
  iconName: "ShieldCheck" | "Percent" | "Users" | "Car" | "Clock" | "Building2";
}

export interface SiteConfig {
  brandName: string;
  legalEntityName: string;
  tagline: string;
  city: string;
  primaryPhone: string;
  primaryPhoneDisplay: string;
  whatsappPhone: string;
  whatsappPhoneDisplay: string;
  email: string;
  officeAddress: {
    line1: string;
    line2: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    googleMapsUrl: string;
  };
  rera: {
    number: string;
    authority: string;
    verificationUrl: string;
    disclaimer: string;
    propertyIds: Record<string, string>;
  };
  brokerageClaim: {
    badgeText: string;
    fullText: string;
    disclaimer: string;
  };
  trustMetrics: TrustMetric[];
}

export const SITE_CONFIG: SiteConfig = {
  brandName: "Gharsetu Realty",
  legalEntityName: "Gharsetu Real Estate Advisory LLP",
  tagline: "Pune's Most Trusted Real Estate Advisory",
  city: "Pune",
  primaryPhone: "+919820144521",
  primaryPhoneDisplay: "+91 98201 44521",
  whatsappPhone: "919820144521",
  whatsappPhoneDisplay: "+91 98201 44521",
  email: "advisory@gharsetu.com",
  officeAddress: {
    line1: "Level 4, Panchshil Business Park",
    line2: "Near Balewadi High Street, Baner",
    locality: "Baner",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411045",
    googleMapsUrl: "https://maps.google.com/?q=Baner+Pune",
  },
  rera: {
    number: "A52100029810",
    authority: "Maharashtra Real Estate Regulatory Authority (MahaRERA)",
    verificationUrl: "https://maharera.mahaonline.gov.in/",
    disclaimer:
      "Gharsetu Realty is a registered real estate agent under MahaRERA Reg. No. A52100029810. Project details, pricing and floor plans displayed are for reference and subject to developer revisions. All agreements comply with MahaRERA guidelines.",
    propertyIds: {
      skyline: "P52100024890",
      green: "P52100031245",
      orchid: "P52100019876",
      lake: "P52100041289",
      metro: "P52100038910",
      river: "P52100027533",
    },
  },
  brokerageClaim: {
    badgeText: "0% Buyer Brokerage",
    fullText: "Zero Brokerage on Direct Developer Inventory in Pune",
    disclaimer:
      "0% brokerage applies to direct new bookings from partnered Tier-1 and Grade-A developers across Pune.",
  },
  trustMetrics: [
    {
      id: "rera",
      label: "MahaRERA Verified",
      value: "A52100029810",
      description: "100% legal title-clear inventory",
      iconName: "ShieldCheck",
    },
    {
      id: "brokerage",
      label: "0% Buyer Brokerage",
      value: "Zero Fees",
      description: "Direct developer price guarantee",
      iconName: "Percent",
    },
    {
      id: "families",
      label: "Families Assisted",
      value: "1,200+",
      description: "Homebuyers moved into their dream homes",
      iconName: "Users",
    },
    {
      id: "site-visits",
      label: "Private Site Visits",
      value: "Free AC Cab",
      description: "Door-to-door escorted property tours",
      iconName: "Car",
    },
  ],
};
