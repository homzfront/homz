"use client";
import React from "react";
import ViewProperty from "../ViewProperty";

const PreviewProperty = ({params}) => {
  const { id } = params
  return (
    <div className="w-full">
      <ViewProperty
        PropertyID={
          id
        }
      />
    </div>
  );
};

export default PreviewProperty;
