import React from 'react'
import MultiStepForm from './components/multiStepForm'

export const metadata = {
  title: "Tenant Onboarding | Homz.ng",
  robots: {
    index: false,
    follow: false,
  },
};

const Page = () => {
  return (
    <div className='max-w-[1440px] mx-auto'>
        <MultiStepForm />
    </div>
  )
}

export default Page