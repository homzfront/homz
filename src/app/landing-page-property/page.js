import React from 'react'
import Section from '@/pages/landingPageProMan/Section';
import SectionTwo from '@/pages/landingPageProMan/SectionTwo';
import Features from '@/pages/landingPageProMan/Features';
import Pricing from '@/pages/landingPageProMan/Pricing';
import AllInOne from '@/pages/landingPageProMan/AllInOne';
import Contact from '@/pages/landingPageProMan/Contact';
import ContactCard from '@/pages/landingPageProMan/ContactCard';
import FAQs from '@/pages/landingPageProMan/FAQs';

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