'use client';
import React from "react";
import PropertyForms from "./components/propertyForms";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Loading from "../components/loading";

const EditProperty = () => {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("PropertyId");
  return (
    <div className="md:pl-1">
      <Suspense
        fallback={
          <Loading />
        }
      >
        <PropertyForms PropertyID={propertyId || null} />
      </Suspense>
    </div>
  );
};

export default EditProperty;
