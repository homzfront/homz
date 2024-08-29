"use client";
import React, { Suspense } from "react";
import ViewProperty from "../ViewProperty";
import LoadingII from "@/components/mainmenu/loadingII";

const PreviewProperty = ({ params }) => {
  const { id } = params;
  
  return (
    <div className="w-full max-w-[1440px] m-auto">
      <Suspense fallback={<LoadingII />}>
        <PreviewPropertyContent id={id} />
      </Suspense>
    </div>
  );
};

const PreviewPropertyContent = ({ id }) => {
  return <ViewProperty PropertyID={id || null} />;
};

export default PreviewProperty;