import React from 'react'
import ContactDoc from '/src/pages/contactPage/ContactDoc';
import ContactB from '/src/pages/contactPage/ContactB';

const ContactPage = () => {
  
  return (
    <div className='max-w-[1160px] m-auto px-6'>
        <ContactDoc/>
        <ContactB/>
    </div>
  )
}

export default ContactPage;