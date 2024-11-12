import DocumentGeneration from '@/pages/dashboard/enterprise/documentGeneration/documentGeneration';
import React from 'react'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div> 
      <Toaster />
        <DocumentGeneration />
    </div>
  )
}

export default App;