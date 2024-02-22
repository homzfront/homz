import React from 'react'
import Tenants from '@/pages/dashboard/owner/estates/tenants/tenants';

const App = ({ params }) => {
  const { id } = params
  return (
    <div className=''>
      <Tenants id={id} />
    </div>
  )
}

export default App;