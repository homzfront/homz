"use client";
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from '../../components/propertyCard';
import usePropertyStore from '@/store/usePropertyStore';
import ParamsComponent from '../../components/paramsComponent';
import { usePropertyActions } from '@/hooks/usePropertyAction';

const UserHomePage = () => {
  const searchParams = useSearchParams();
  const {
    property,
    filters,
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
    setFilters,
    setCurrentPage,
  } = usePropertyStore();

  const {
    firstThreePages,
    lastThreePages,
    reset,
    handleListingType,
  } = usePropertyActions();

  // Initialize filters from URL params (BASE route behavior)
  useEffect(() => {
    const urlFilters = {
      search: searchParams.get('search') || '',
      propertyType: searchParams.get('propertyType') || null,
      minPrice: searchParams.get('minPrice') || null,
      maxPrice: searchParams.get('maxPrice') || null,
      numberOfBathrooms: searchParams.get('numberOfBathrooms') || null,
      listingType: null, // /all doesn't filter by listing type
    };
    
    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
    const fromHome = searchParams.get('fromHome');
    
    // Only update if values actually changed
    const filtersChanged = JSON.stringify(filters) !== JSON.stringify(urlFilters);
    const pageChanged = currentPage !== pageFromUrl;
    
    if (filtersChanged || fromHome === 'true') {
      console.log('[All Page] Filters changed or coming from home, updating...');
      setFilters(urlFilters);
    }
    if (pageChanged) {
      console.log('[All Page] Page changed, updating...');
      setCurrentPage(pageFromUrl);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // Only depend on searchParams to prevent infinite loops

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

export default UserHomePage;