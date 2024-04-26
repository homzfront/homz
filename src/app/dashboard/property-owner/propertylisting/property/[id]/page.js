import Property from '@/pages/dashboard/owner/propertylisting/property/property';
import React from 'react'


const App = async ({ params }) => {
  const { id } = params;

  return (
    <div className=''>
        <Property id={id} />
    </div>
  );
};

export default App;