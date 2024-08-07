import React from 'react'
import TenantProfile from '@/pages/dashboard/enterprise/tenants/secondPage/tenantProfile'

const App = ({params}) => {
  const { id } = params;
  return (
    <div className='overflow-y-auto h-screen scrollbar-container'>
        <TenantProfile  id={id}/>
    </div>
  )
}

export default App;