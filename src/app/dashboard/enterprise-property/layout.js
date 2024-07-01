"use client"
import WithAuth from '@/components/auth/withAuth';
import React from 'react'
const Layout = ({children}) => {
  return (
    <div className=''>
        {children}
    </div>
  )
}

// export default WithAuth(Layout);
export default Layout