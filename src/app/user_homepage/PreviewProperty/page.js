"use client";
import React, { Suspense } from "react";
import ViewProperty from "./ViewProperty";
import { useSearchParams } from "next/navigation";
import LoadingII from "@/components/mainmenu/loadingII";

const PreviewProperty = () => {
  return (
    <div className="w-full max-w-[1440px] m-auto">
      <Suspense fallback={<LoadingII />}>
        <PreviewPropertyContent />
      </Suspense>
    </div>
  );
};

const PreviewPropertyContent = () => {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("property");

  return <ViewProperty PropertyID={propertyId || null} />;
};

export default PreviewProperty;