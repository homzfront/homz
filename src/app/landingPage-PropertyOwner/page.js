import React from 'react'
import Hero from '@/pages/landingPageProOwn/Hero';
import Features from '@/pages/landingPageProOwn/Features';
import HowItWorks from '@/pages/landingPageProOwn/HowItWorks';
import Contact from '@/pages/landingPageProOwn/Contact';
import ContactCard from '@/pages/landingPageProOwn/ContactCard';
import FAQs from '@/pages/landingPageProOwn/FAQs';

const LandingPagePO = () => {
  return (
    <div className=''>
        <Hero/>
        <Features/>
        <HowItWorks/>
        <Contact/>
        <ContactCard/>
        <FAQs/>
    </div>
  )
}

export default LandingPagePO;