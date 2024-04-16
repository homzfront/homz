import React from 'react'
import TenantProfile from '/src/pages/dashboard/enterprise/tenants/secondPage/tenantProfile'

const App = ({params}) => {
  const { id } = params;
  console.log(id);
  return (
    <div className=''>
        <TenantProfile  id={id}/>
    </div>
  )
}

export default App;