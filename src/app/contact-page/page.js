import React from 'react'
import ContactDoc from '@/pages/contactPage/ContactDoc';
import ContactB from '@/pages/contactPage/ContactB';

export const metadata = {
  title: "Contact Homz.ng | Real Estate Management Platform Nigeria",
  description:
    "Get in touch with Homz.ng for property management, property listings, rentals, and real estate solutions in Nigeria. Our team is ready to help.",
};

const ContactPage = () => {
  
  return (
    <div className='max-w-[1160px] m-auto px-6'>
        <ContactDoc/>
        <ContactB/>
    </div>
  )
}

export default ContactPage;