import React from 'react'
import Hero from '@/pages/aboutUs/Hero';
import Meet from '@/pages/aboutUs/Meet';

export const metadata = {
  title: "About us",
    description: 'Learn more about our mission to simplify real estate search and management in Nigeria.', // ← Your custom tag
  openGraph: {
    title: 'About us',
    description: 'Learn more about our mission to simplify real estate search and management in Nigeria.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About us',
    description: 'Learn more about our mission to simplify real estate search and management in Nigeria.',
  }
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