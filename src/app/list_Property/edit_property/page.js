'use client';
import React from 'react'
import PropertyForms from './components/propertyForms';
import {useSearchParams} from 'next/navigation';

const EditProperty = () => {
  const searchParams = useSearchParams();

  return (
    <div className="md:pl-1">
    
   <PropertyForms PropertyID={searchParams.get("PropertyId") && searchParams.get("PropertyId")}/>
    
    
    </div>
  )
}

export default EditProperty