'use client';
import React, { Suspense } from "react";
import PropertyForms from "../components/propertyForms";
// import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import Loading from '../../components/loading'

const EditProperty = () => {
  const router = useRouter();
  // const {propertyId} = router.query;
  console.log(router.query);
  // const propertyId = pathname.split('/').pop();

  return (
    <div className="md:pl-1">
      {/* <Suspense fallback={<Loading />}>
        <PropertyForms PropertyID={propertyId || null} />
      </Suspense> */}
    </div>
  );
};

export default EditProperty;
