import PricingPlan from '@/pages/pricingPlan/pricingPlan'
import React from 'react'

export const metadata = {
  title: "Choose Your Plan | Homz.ng",
  robots: {
    index: false,
    follow: false,
  },
};

const Page = () => {
  return (
    <div>
        <PricingPlan/>
    </div>
  )
}

export default Page