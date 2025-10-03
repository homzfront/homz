"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import usePropertyStore from '@/store/usePropertyStore';
import PropertyCard from '../../../components/propertyCard';
import ParamsComponent from '../../../components/paramsComponent';

import PropertyBanner from '@/components/properties/PropertyBanner';
import { usePropertyActions } from '@/hooks/usePropertyAction';
import { parseUrlToFilters, generatePageMetadata } from '@/utils/urlParamsParser';

const SalesByLocation = ({ params }) => {
  const router = useRouter();
  
  const {
    property,
    currentPage,
    totalPages,
    handleNextPage,
    handlePageClick,
    handlePrevPage,
    totalData,
    loading,
    loadingII,
    setLoadingII,
    properties,
    initializeFromUrl,
    showBanner,
    bannerData,
  } = usePropertyStore();

  const {
    firstThreePages,
    lastThreePages,
    reset: baseReset,
    handleListingType,
  } = usePropertyActions();

  // Custom reset for dynamic pages - redirect to base sales page
  const reset = () => {
    router.push('/sales');
  };

  // Initialize filters based on URL parameters
  useEffect(() => {
    const urlFilters = parseUrlToFilters(params, 'sales');
    initializeFromUrl(urlFilters, true); // Mark as footer route
  }, [params, initializeFromUrl]);

  return (
    <div className="max-w-[1440px] md:w-full mx-auto mt-10 md:mt-20 flex flex-col items-center gap-[2.8rem] mb-10">
      {showBanner && bannerData && (
        <PropertyBanner 
          location={bannerData.location}
          propertyType={bannerData.propertyType}
          listingType={bannerData.listingType}
        />
      )}
      
      <ParamsComponent reset={reset} handleListingType={handleListingType} />

      <div className="w-[337px] md:mt-3 md:w-full">
        <PropertyCard
          Property={property}
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNextPage}
          handlePageClick={handlePageClick}
          handlePrev={handlePrevPage}
          totalData={totalData}
          loading={loading}
          firstThreePages={firstThreePages}
          lastThreePages={lastThreePages}
          loadingII={loadingII}
          reset={reset}
          setLoadingII={setLoadingII}
          properties={properties}
        />
      </div>
    </div>
  );
};

export default SalesByLocation;