import React from 'react'
import Hero from '@/components/landingPageProOwn/Hero';
import Features from '@/components/landingPageProOwn/Features';
import HowItWorks from '@/components/landingPageProOwn/HowItWorks';
import Contact from '@/components/landingPageProOwn/Contact';
import ContactCard from '@/components/landingPageProOwn/ContactCard';
import FAQs from '@/components/landingPageProOwn/FAQs';

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