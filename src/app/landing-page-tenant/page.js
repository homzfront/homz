import React from 'react'
import SectionA from '../components/landingPageTenant/SectionA';
import SectionB from '../components/landingPageTenant/SectionB';
import SectionC from '../components/landingPageTenant/SectionC';
import Contact from '../components/landingPageTenant/Contact';
import ContactCard from '../components/landingPageTenant/ContactCard';
import FAQs from '../components/landingPageTenant/FAQs';

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