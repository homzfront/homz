"use client";
import React from 'react';
import PropertyCard from '../../components/propertyCard';
import usePropertyStore from '@/store/usePropertyStore';
import ParamsComponent from '../../components/paramsComponent';
import { usePropertyActions } from '@/hooks/usePropertyAction';

const Sales = () => {
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
  } = usePropertyStore();

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

export default Sales;