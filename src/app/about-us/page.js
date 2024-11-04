import React from 'react'
import Hero from '@/pages/aboutUs/Hero';
import Meet from '@/pages/aboutUs/Meet';

export const metadata = {
  title: "About us"
}

const AboutUs = () => {
  return (
    <div>
      <Hero />
      <Meet />
    </div>
  );
};

export default AboutUs;