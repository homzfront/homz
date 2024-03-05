import PropertyImages from '@/pages/dashboard/owner/propertylisting/propertyImages/propertyImages';
import React from 'react'

const App = ({ params }) => {
  const { id } = params;
  return (
    <div>
        <PropertyImages id={id}/>
    </div>
  )
}

export default App;