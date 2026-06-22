import PricingPlan from '@/pages/plan/pricingPlan'
import React from 'react'

export const metadata = {
  title: "Pricing Plan | Homz.ng",
  robots: {
    index: false,
    follow: false,
  },
};

const PricePage = () => {
  return (
    <div>
      <PricingPlan/>
    </div>
  )
}

export default PricePage