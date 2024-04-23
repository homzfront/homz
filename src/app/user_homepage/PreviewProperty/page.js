"use client";
import React from "react";
import ViewProperty from "./ViewProperty";
import { useSearchParams } from "next/navigation";
import Loading from "../components/loading";

const PreviewProperty = () => {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("PropertyId");

  return (
    <div className="md:pl-1">
      <Suspense fallback={<Loading />}>
        <PreviewPropertyContent propertyId={propertyId} />
      </Suspense>
    </div>
  );
};
const PreviewPropertyContent = ({ propertyId }) => {
  return <ViewProperty PropertyID={propertyId || null} />;
};

export default PreviewProperty;
