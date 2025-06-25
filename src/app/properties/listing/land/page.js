"use client"
import React from 'react'
import PropertyCard from '../../components/propertyCard';
import { PropertyContext } from '@/store/propertyContext';

const Land = () => {
  const context = React.useContext(PropertyContext);
  return (
    <div className="w-[337px] md:mt-3 md:w-full ">
      <PropertyCard
        Property={context.Property}
        currentPage={context.currentPage}
        totalPages={context.totalPages}
        handleNext={context.handleNext}
        handlePageClick={context.handlePageClick}
        handlePrev={context.handlePrev}
        totalData={context.totalData}
        loading={context.loading}
        firstThreePages={context.firstThreePages}
        lastThreePages={context.lastThreePages}
        loadingII={context.loadingII}
        reset={context.reset}
        setLoadingII={context.setLoadingII}
        properties={context.properties}
      />
    </div>
  );

}

export default Land