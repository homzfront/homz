"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import usePropertyStore from '@/store/usePropertyStore';
import PropertyCard from '../../../components/propertyCard';
import ParamsComponent from '../../../components/paramsComponent';
import { usePropertyActions } from '@/hooks/usePropertyAction';
import Link from 'next/link';
import { parseUrlToFilters, parseLocation, PROPERTY_TYPE_LINKS } from '@/utils/urlParamsParser';

const ShortletByLocation = ({ params }) => {
  const router = useRouter();
  
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
    setRouteFilters,
  } = usePropertyActions();

  // Initialize filters from route params (DYNAMIC route behavior)
  useEffect(() => {
    const routeFilters = parseUrlToFilters(params, 'shortlet');
    
    // Only update if values actually changed
    const filtersChanged = JSON.stringify(filters) !== JSON.stringify(routeFilters);
    
    if (filtersChanged) {
      console.log('[Shortlet/Location Page] Filters changed, updating...');
      setFilters(routeFilters);
      setCurrentPage(1); // Always start at page 1
      setRouteFilters(routeFilters);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]); // Only depend on params to prevent infinite loops

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
      <div className="w-[337px] md:w-full px-0">
  <p className="text-[14px] font-medium text-[#202020] mb-2">
    Popular searches in {parseLocation(params.location)}
  </p>
  <div className="flex flex-wrap gap-2">
    {PROPERTY_TYPE_LINKS.map((type) => (
      <Link
        key={type.slug}
        href={`/shortlet/${params.location}/${type.slug}`}
        className="text-[13px] text-BlueHomz bg-[#EEF5FF] hover:bg-BlueHomz hover:text-white transition-colors px-3 py-1.5 rounded-[4px]"
      >
        {type.label}
      </Link>
    ))}
  </div>
</div>
    </div>
  );
};

export default ShortletByLocation;