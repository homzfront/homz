import EstateInfo from '@/pages/dashboard/owner/estates/estateInfo/estateInfo';
import React from 'react'


const App = ({ params }) => {
  const { id } = params
  return (
    <div className=''>
        <EstateInfo id={id}/>
    </div>
  )
}

export default App;