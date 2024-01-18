import EstateInfo from '@/pages/dashboard/enterprise/estates/estateInfo/estateInfo';
import React from 'react';

const App = async ({ params }) => {
  const { id } = params;

  return (
    <div className=''>
        <EstateInfo id={id} />
    </div>
  );
};

export default App;
