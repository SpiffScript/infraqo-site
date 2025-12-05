import React from 'react';

export interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  company: string;
  industry: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface CaseStudy {
  client: string;
  industry: string;
  problem: string;
  solution: string;
  result: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  zip: string;
  projectType: 'Business' | 'Residential';
  contactMethod: 'Email' | 'Phone' | 'Text';
  services: string[];
  location: string;
  numLocations: string;
  timeline: string;
  helpWith: string;
  howDidYouHear: string;
  agreeToTerms: boolean;
  sendUpdates: boolean;
}

export type ContactFormErrors = {
  [K in keyof ContactFormData]?: string;
};
