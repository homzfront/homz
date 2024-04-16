import PropertyImages from '/src/pages/dashboard/enterprise/propertylisting/propertyImages/propertyImages';
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

