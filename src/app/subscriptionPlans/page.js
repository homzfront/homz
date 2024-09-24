"use client";
import PricingPlan from './pricingPlan'
import React from 'react'
import { redirect } from 'next/navigation';


const SubscriptionPage = () => {
  let jwt = localStorage.getItem("jwt");
  if(!jwt){
      redirect("/login");
  }
  return (
    <div>
        <PricingPlan />
    </div>
  )
}

export default SubscriptionPage