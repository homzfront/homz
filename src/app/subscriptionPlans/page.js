"use client";

import PricingPlan from './pricingPlan';
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

const SubscriptionPage = () => {
  const [token, setToken] = useState(null); // Store token state

  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwtToken = localStorage.getItem("jwt");
      if (!jwtToken) {
        redirect("/login"); // Redirect to login if no token
      } else {
        setToken(jwtToken); // Set token if found
      }
    }
  }, []);

  if (!token) {
    return null; 
  }

  return (
    <div>
      <PricingPlan />
    </div>
  );
}

export default SubscriptionPage;
