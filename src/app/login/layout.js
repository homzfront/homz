"use client"
import WithAuth from '@/components/auth/withAuth';
import React from 'react'

const RootLayout = ({ children }) => {
  return (
    <div className=''>
      {children}
    </div>
  )
}

export default WithAuth(RootLayout);