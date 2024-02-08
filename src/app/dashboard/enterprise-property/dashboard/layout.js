import React from 'react'
import Header from '@/pages/dashboard/enterprise/header/header'
import Sidebar from '@/pages/dashboard/enterprise/sidebar/sidebar'
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