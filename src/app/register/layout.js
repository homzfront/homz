"use client"
import WithAuth from '@/components/auth/withAuth';
import React from 'react'
const Layout = ({children}) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default WithAuth(Layout);