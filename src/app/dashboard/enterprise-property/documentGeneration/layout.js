import React from 'react'
import Header from '@/pages/dashboard/enterprise/header/header'
import Sidebar from '@/pages/dashboard/enterprise/sidebar/sidebar'
const Layout = ({children}) => {
  return (
    <div className='dashboard_main'>
      <Sidebar />
      <div className='main w-full' >
        <Header />
        {children}
      </div>
    </div>
  )
}

export default Layout;