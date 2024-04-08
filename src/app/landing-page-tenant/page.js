import React from 'react'
import SectionA from '/src/pages/landingPageTenant/SectionA';
import SectionB from '/src/pages/landingPageTenant/SectionB';
import SectionC from '/src/pages/landingPageTenant/SectionC';
import Contact from '/src/pages/landingPageTenant/Contact';
import ContactCard from '/src/pages/landingPageTenant/ContactCard';
import FAQs from '/src/pages/landingPageTenant/FAQs';

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