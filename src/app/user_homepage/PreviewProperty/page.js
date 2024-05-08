"use client";
import React, {Suspense} from "react";
import ViewProperty from "./ViewProperty";
import { useSearchParams } from "next/navigation";
import Loading from "../components/loading";

const PreviewProperty = () => {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("PropertyId");

  return (
    <div className="w-full m-auto">
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
