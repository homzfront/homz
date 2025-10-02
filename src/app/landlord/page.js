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