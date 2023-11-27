import React from 'react'
import Section from '../components/landingPageProMan/Section';
import SectionTwo from '../components/landingPageProMan/SectionTwo';
import Features from '../components/landingPageProMan/Features';
import Pricing from '../components/landingPageProMan/Pricing';
import AllInOne from '../components/landingPageProMan/AllInOne';
import Contact from '../components/landingPageProMan/Contact';
import ContactCard from '../components/landingPageProMan/ContactCard';
import FAQs from '../components/landingPageProMan/FAQs';

const LandingPagePM = () => {
  return (
    <div className='max-w-[1160px] m-auto  px-6'>
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