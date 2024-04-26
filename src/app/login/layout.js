"use client"
import React from 'react'
import withAuth from '@/utils/withAuth'
const Layout = ({children}) => {
  return (
    <div className=''>
        {children}
    </div>
  )
}

export default withAuth(Layout);