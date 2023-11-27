import React from 'react'
import ContactDoc from '../components/contactPage/ContactDoc';
import ContactB from '../components/contactPage/ContactB';

const ContactPage = () => {
  return (
    <div className='max-w-[1160px] m-auto px-6'>
        <ContactDoc/>
        <ContactB/>
    </div>
  )
}

export default ContactPage;