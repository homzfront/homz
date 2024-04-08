import React from 'react'
import Header from '/src/pages/dashboard/enterprise/header/header'
import Sidebar from '/src/pages/dashboard/enterprise/notificationSidebar/sidebar/sidebar'
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