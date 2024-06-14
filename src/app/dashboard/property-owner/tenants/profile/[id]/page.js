import React from 'react'
import TenantProfile from '@/pages/dashboard/owner/tenants/secondPage/tenantProfile'

const App = ({ params }) => {
  const { id } = params
  return (
    <div className=''>
      <TenantProfile id={id} />
    </div>
  )
}

export default App;