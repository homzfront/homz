"use client"
import WithAuth from '@/components/auth/withAuth';
import useFacebookPixel from '@/utils/useFacebookPixels';
import React from 'react'
const Layout = ({ children }) => {
  useFacebookPixel();
  return (
    <div className=''>
      {children}
    </div>
  )
}

export default WithAuth(Layout);