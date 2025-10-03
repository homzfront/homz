"use client"
import React from 'react'
import Section from '@/pages/landingPageProMan/Section';
import SectionTwo from '@/pages/landingPageProMan/SectionTwo';
import Features from '@/pages/landingPageProMan/Features';
import Pricing from '@/pages/landingPageProMan/Pricing';
import AllInOne from '@/pages/landingPageProMan/AllInOne';
import Contact from '@/pages/landingPageProMan/Contact';
import ContactCard from '@/pages/landingPageProMan/ContactCard';
import FAQs from '@/pages/landingPageProMan/FAQs';
import useProfileStore from '@/store/profile';
import determineRoute from '@/utils/determineRoute';

export const metadata = {
  title: "Property Management Software for Managers - Homz Enterprise",
  description: "Scale your property management business with Homz Enterprise. Manage multiple properties, tenants, and finances in one platform. Transparent pricing with up to 20% savings.",
  openGraph: {
    title: "Property Management Software for Managers - Homz Enterprise",
    description: "Scale your property management business with Homz Enterprise. Manage multiple properties, tenants, and finances in one platform. Transparent pricing with up to 20% savings.",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Property Management Software for Managers - Homz Enterprise",
    description: "Scale your property management business with Homz Enterprise. Manage multiple properties, tenants, and finances in one platform. Transparent pricing with up to 20% savings.",
  }
};

const PropertyManagement = () => {
  const { isLoggedIn, profile } = useProfileStore();
  const manager = "/dashboard/enterprise-property/dashboard"
  const page = determineRoute(profile, manager);

  return (
    <div className=''>
      <Section routeTo={page} profile={profile} />
      <SectionTwo />
      <Features routeTo={page} profile={profile} />
      <Pricing routeTo={page} profile={profile} />
      <AllInOne />
      <Contact routeTo={page} profile={profile} />
      <ContactCard routeTo={page} profile={profile} />
      <FAQs />
    </div>
  )
}

export default PropertyManagement;
