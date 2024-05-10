"use client";
import React, {Suspense} from "react";
import ViewProperty from "./ViewProperty";
import { useSearchParams } from "next/navigation";
import LoadingII from "@/components/mainmenu/loadingII";

const PreviewProperty = () => {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("property");

  return (
    <div className="w-full max-w-[1440px] m-auto">
      <Suspense fallback={<LoadingII />}>
        <PreviewPropertyContent propertyId={propertyId} />
      </Suspense>
    </div>
  );
};
const PreviewPropertyContent = ({ propertyId }) => {
  return <ViewProperty PropertyID={propertyId || null} />;
};

export default PreviewProperty;
