"use client"
import React from 'react'
import SectionA from '@/pages/landingPageTenant/SectionA';
import SectionB from '@/pages/landingPageTenant/SectionB';
import SectionC from '@/pages/landingPageTenant/SectionC';
import Contact from '@/pages/landingPageTenant/Contact';
import ContactCard from '@/pages/landingPageTenant/ContactCard';
import FAQs from '@/pages/landingPageTenant/FAQs';
import useProfileStore from '@/store/profile';
import determineRoute from '@/utils/determineRoute';

const LandingPageTenant = () => {
  const { isLoggedIn, profile } = useProfileStore();
  const tenant = "/dashboard/tenant/dashboard"
  const page = determineRoute(profile, tenant);
  
  return (
    <div>
      <SectionA routeTo={page} profile={profile} />
      <SectionB />
      <SectionC routeTo={page} profile={profile} />
      <Contact routeTo={page} profile={profile} />
      <ContactCard routeTo={page} profile={profile} />
      <FAQs />
    </div>
  )
}

export default LandingPageTenant;