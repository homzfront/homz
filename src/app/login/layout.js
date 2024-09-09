"use client"
import WithAuth from '@/components/auth/withAuth';
import React from 'react'
import useFacebookPixel from "@/utils/useFacebookPixels";

const RootLayout = ({ children }) => {
  useFacebookPixel();
  return (
    <div className=''>
      {children}
    </div>
  )
}

export default WithAuth(RootLayout);