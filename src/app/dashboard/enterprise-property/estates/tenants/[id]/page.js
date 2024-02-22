import React from 'react'
import Tenants from '@/pages/dashboard/enterprise/estates/tenants/tenants';

const App = ({ params }) => {
  const { id } = params;

  console.log(id);

  return (
    <div className=''>
        <Tenants id={id}/>
    </div>
  )
}

export default App;