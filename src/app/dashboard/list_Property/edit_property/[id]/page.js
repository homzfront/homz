'use client';
import React, { Suspense, useEffect, useState } from "react";
import PropertyForms from "../components/propertyForms";
import Loading from '../../components/loading'
import { fetchSingleProperty } from "@/api/propertyService";
import LoadingII from "@/components/mainmenu/loadingII";

const EditProperty = ({ params }) => {
  const PropertyID = params
  const [propData, setPropData] = useState([]);
  const [loading, setLoading] = useState(true);

  const propertyData = async () => {
    const response = await fetchSingleProperty(PropertyID?.id);
    const property = await response;
    setPropData(property?.data);
    setLoading(false);
  };

  useEffect(() => {
    propertyData();
  }, [PropertyID]);
  
  return (
    <div className="px-6 w-full">
      {
        loading ?
          <div className="h-screen flex justify-center items-center">
            <LoadingII />
          </div>
          :
          <PropertyForms propertyData={propData} />
      }
    </div>
  );
};

export default EditProperty;
