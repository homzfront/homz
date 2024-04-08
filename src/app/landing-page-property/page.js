import React from 'react'
import Section from '/src/pages/landingPageProMan/Section';
import SectionTwo from '/src/pages/landingPageProMan/SectionTwo';
import Features from '/src/pages/landingPageProMan/Features';
import Pricing from '/src/pages/landingPageProMan/Pricing';
import AllInOne from '/src/pages/landingPageProMan/AllInOne';
import Contact from '/src/pages/landingPageProMan/Contact';
import ContactCard from '/src/pages/landingPageProMan/ContactCard';
import FAQs from '/src/pages/landingPageProMan/FAQs';

const LandingPagePM = () => {
  return (
    <div className=''>
        <Section/>
        <SectionTwo/>
        <Features/>
        <Pricing/>
        <AllInOne/>
        <Contact/>
        <ContactCard/>
        <FAQs/>
    </div>
  )
}

export default LandingPagePM;