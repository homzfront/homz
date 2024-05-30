import React from 'react'
import ContactDoc from '@/pages/contactPage/ContactDoc';
import ContactB from '@/pages/contactPage/ContactB';

export const metadata = {
  title: "Contact us"
}

const ContactPage = () => {
  
  return (
    <div className='max-w-[1160px] m-auto px-6'>
        <ContactDoc/>
        <ContactB/>
    </div>
  )
}

export default ContactPage;