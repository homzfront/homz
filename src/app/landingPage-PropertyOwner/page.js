import React from 'react'
import Hero from '/src/pages/landingPageProOwn/Hero';
import Features from '/src/pages/landingPageProOwn/Features';
import HowItWorks from '/src/pages/landingPageProOwn/HowItWorks';
import Contact from '/src/pages/landingPageProOwn/Contact';
import ContactCard from '/src/pages/landingPageProOwn/ContactCard';
import FAQs from '/src/pages/landingPageProOwn/FAQs';

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