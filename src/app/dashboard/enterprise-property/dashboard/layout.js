import React from 'react'
import Header from '/src/pages/dashboard/enterprise/header/header'
import Sidebar from '/src/pages/dashboard/enterprise/sidebar/sidebar'
const Layout = ({children}) => {
  
  return (
    <div className='dashboard'>
        <div className=''>
        <Sidebar />
        </div>
    <div className='md:w-[990px]'>

        <Header/>
        {children}
    </div>
     
    </div>
  )
}

export default Layout;


