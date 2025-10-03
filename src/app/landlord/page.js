"use client"
import React from 'react'
import Hero from '@/pages/landingPageProOwn/Hero';
import Features from '@/pages/landingPageProOwn/Features';
import HowItWorks from '@/pages/landingPageProOwn/HowItWorks';
import Contact from '@/pages/landingPageProOwn/Contact';
import ContactCard from '@/pages/landingPageProOwn/ContactCard';
import FAQs from '@/pages/landingPageProOwn/FAQs';
import useProfileStore from '@/store/profile';
import determineRoute from '@/utils/determineRoute';
import Testimonial from '@/pages/landingPageProOwn/Testimonial';

export const metadata = {
  title: "Property Management Software for Landlords - Homz.ng",
  description: "Streamline your landlord operations with Homz.ng's property management platform. Collect rent on time, verify tenants, and monitor all properties in one dashboard. Get started today.",
  openGraph: {
    title: "Property Management Software for Landlords - Homz.ng",
    description: "Streamline your landlord operations with Homz.ng's property management platform. Collect rent on time, verify tenants, and monitor all properties in one dashboard. Get started today.",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Property Management Software for Landlords - Homz.ng",
    description: "Streamline your landlord operations with Homz.ng's property management platform. Collect rent on time, verify tenants, and monitor all properties in one dashboard. Get started today.",
  }
};

const LandingPagePO = () => {
  const { isLoggedIn, profile } = useProfileStore();
  const landlord = "/dashboard/property-owner/dashboard"
  const page = determineRoute(profile, landlord);

  return (
    <div className=''>
      <Hero routeTo={page} profile={profile} />
      <Features/>
      <HowItWorks routeTo={page} profile={profile} />
      {/* <Contact routeTo={page} profile={profile} /> */}
      <Testimonial routeTo={page} profile={profile} />
      <FAQs />
    </div>
  )
}

export default LandingPagePO;