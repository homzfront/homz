import React from 'react'
import SectionA from '@/pages/landingPageTenant/SectionA';
import SectionB from '@/pages/landingPageTenant/SectionB';
import SectionC from '@/pages/landingPageTenant/SectionC';
import Contact from '@/pages/landingPageTenant/Contact';
import ContactCard from '@/pages/landingPageTenant/ContactCard';
import FAQs from '@/pages/landingPageTenant/FAQs';

const LandingPageTenant = () => {
  return (
    <div>
        <SectionA/>
        <SectionB/>
        <SectionC/>
        <Contact/>
        <ContactCard/>
        <FAQs/>
    </div>
  )
}

export default LandingPageTenant;