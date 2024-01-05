import React from 'react'
import Header from '@/pages/dashboard/owner/header/header'
import Sidebar from '@/pages/dashboard/owner/sidebar/sidebar'
const Layout = ({children}) => {
  return (
    <div className='dashboard'>
        <Header/>
        {children}
        <Sidebar />
    </div>
  )
}

export default Layout;