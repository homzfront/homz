"use client";
import React, { Suspense } from "react";
import ViewProperty from "../ViewProperty";
import LoadingII from "@/components/mainmenu/loadingII";

const PreviewProperty = ({ params }) => {
  const { slug } = params;
  return (
    <div className="w-full max-w-[1440px] m-auto">
      <Suspense fallback={<LoadingII />}>
        <PreviewPropertyContent slug={slug} />
      </Suspense>
    </div>
  );
};

const PreviewPropertyContent = ({ slug }) => {
  return <ViewProperty PropertySlug={slug || null} />;
};

export default PreviewProperty;
