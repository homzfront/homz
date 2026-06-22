import React from 'react'
import Hero from '@/pages/aboutUs/Hero';
import Meet from '@/pages/aboutUs/Meet';

export const metadata = {
  title: "About Homz.ng | Simplifying Real Estate Management in Nigeria",
  description:
    "Learn about Homz.ng, Nigeria's real estate management platform helping landlords, tenants, agents and property managers simplify property search, listings, rentals and management.",

  openGraph: {
    title: "About Homz.ng | Simplifying Real Estate Management in Nigeria",
    description:
      "Learn about Homz.ng, Nigeria's real estate management platform helping landlords, tenants, agents and property managers simplify property search, listings, rentals and management.",
  },

  twitter: {
    card: "summary_large_image",
    title: "About Homz.ng | Simplifying Real Estate Management in Nigeria",
    description:
      "Learn about Homz.ng, Nigeria's real estate management platform helping landlords, tenants, agents and property managers simplify property search, listings, rentals and management.",
  },
};

const AboutUs = () => {
  return (
    <div>
      <Hero />
      <Meet />
    </div>
  );
};

export default AboutUs;