"use client";
import React from "react";
import ViewProperty from "./ViewProperty";
import { useSearchParams } from "next/navigation";

const PreviewProperty = () => {
  const searchParams = useSearchParams();
  return (
    <div>
      <ViewProperty
        PropertyID={
          searchParams.get("PropertyId") && searchParams.get("PropertyId")
        }
      />
    </div>
  );
};

export default PreviewProperty;
