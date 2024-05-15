"use client"
import WithAuth from '@/utils/withAuth';
import React from 'react'
const Layout = ({children}) => {
  return (
    <div className=''>
        {children}
    </div>
  )
}

export default WithAuth(Layout);