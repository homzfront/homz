"use client";
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from '../../components/propertyCard';
import usePropertyStore from '@/store/usePropertyStore';
import { usePropertyActions } from '@/hooks/usePropertyAction';
import ParamsComponent from '../../components/paramsComponent';

const Shortlet = () => {
  const searchParams = useSearchParams();
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
    filters,
    initializeFromUrl,
  } = usePropertyStore();

  // Initialize filters from URL params (from homepage search)
  useEffect(() => {
    const urlFilters = {
      search: searchParams.get('search') || '',
      propertyType: searchParams.get('propertyType') || null,
      minPrice: searchParams.get('minPrice') || null,
      maxPrice: searchParams.get('maxPrice') || null,
      numberOfBathrooms: searchParams.get('numberOfBathrooms') || null,
      listingType: 'shortlet',
    };
    
    // Only initialize if there are actual search params or if filters are empty
    const hasSearchParams = Array.from(searchParams.entries()).length > 0;
    const filtersAreEmpty = !filters.listingType || filters.listingType !== 'shortlet';
    
    if (hasSearchParams || filtersAreEmpty) {
      initializeFromUrl(urlFilters, false); // Not a footer route
    }
  }, [searchParams, initializeFromUrl, filters.listingType]);

  const {
    firstThreePages,
    lastThreePages,
    reset,
    handleListingType,
  } = usePropertyActions();
  
  return (
    <div className="max-w-[1440px] md:w-full mx-auto mt-10 md:mt-20 flex flex-col items-center gap-[2.8rem] mb-10">
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

export default Shortlet;