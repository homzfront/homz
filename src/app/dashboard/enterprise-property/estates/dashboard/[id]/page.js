import React from 'react'
import Dashboard from '@/pages/dashboard/enterprise/estates/dashboard/dashboard';

const App = ({ params }) => {
  const { id } = params;
  return (
    <div className=''>
        <Dashboard id={id}/>
    </div>
  )
}

export default App;