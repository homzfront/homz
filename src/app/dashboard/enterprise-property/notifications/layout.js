import React from 'react'
import Header from '@/pages/dashboard/enterprise/header/header'
import Sidebar from '@/pages/dashboard/enterprise/notificationSidebar/sidebar/sidebar'
const Layout = ({children}) => {
  return (
    <div className='dashboard_main'>
      <Sidebar />
      <div className='w-full' >
        <Header />
        {children}
      </div>
    </div>
  )
}

export default Layout;