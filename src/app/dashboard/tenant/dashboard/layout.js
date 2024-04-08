import React from 'react'
import Header from '/src/pages/dashboard/tenant/header/header'
import Sidebar from '/src/pages/dashboard/tenant/sidebar/sidebar'
const Layout = ({children}) => {
  return (
    <div className='dashboard'>
    <div className=''>
    <Sidebar />
    </div>
    <div className='md:w-[1022px]'>
    <Header/>
    {children}
</div>
 
</div>
  )
}

export default Layout;