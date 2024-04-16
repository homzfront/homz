import React from 'react'
import Header from '/src/pages/dashboard/owner/header/header'
import Sidebar from '/src/pages/dashboard/owner/sidebar/sidebar'
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