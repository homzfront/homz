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
