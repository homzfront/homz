"use client";
import React from "react";
import ViewProperty from "./ViewProperty";
import { useSearchParams } from "next/navigation";

const PreviewProperty = () => {
  const searchParams = useSearchParams();
  return (
    <div className="w-full">
      <ViewProperty
        PropertyID={
          searchParams.get("Property")
        }
      />
    </div>
  );
};

export default PreviewProperty;
