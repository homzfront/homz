"use client"
import WithAuth from '@/components/auth/withAuth';
import React from 'react'
import useFacebookPixel from "@/utils/useFacebookPixels";

function layout({ children }) {
  useFacebookPixel();
  return (
    <div className=''>
      {children}
    </div>
  )
}

export default WithAuth(layout);