'use client';
import React, { Suspense } from "react";
import PropertyForms from "./components/propertyForms";
import { useSearchParams } from "next/navigation";
import Loading from "../components/loading";

const EditProperty = () => {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("PropertyId");

  return (
    <div className="md:pl-1">
      <Suspense fallback={<Loading />}>
        <EditPropertyContent propertyId={propertyId} />
      </Suspense>
    </div>
  );
};

const EditPropertyContent = ({ propertyId }) => {
  return <PropertyForms PropertyID={propertyId || null} />;
};

export default EditProperty;
