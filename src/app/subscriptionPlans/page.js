"use client";

import PricingPlan from './pricingPlan';
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

const SubscriptionPage = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwtToken = localStorage.getItem("jwt");
      if (!jwtToken) {
        redirect("/login");
      } else {
        setToken(jwtToken);
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
