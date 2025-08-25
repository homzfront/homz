"use client";
import React from 'react';
import usePropertyStore from '@/store/usePropertyStore';
import { usePropertyActions } from '@/hooks/usePropertyAction';
import PropertyCard from '@/app/properties/components/propertyCard';
import ParamsComponent from '@/app/properties/components/paramsComponent';

const PropertyListing = () => {
    const [isSlug, setIsSlug] = React.useState(true);
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
    } = usePropertyActions({ isSlug });


    // Set temporary isSlug state when hasSlug is true
    React.useEffect(() => {            // Set timeout to reset isSlug after 2 second (after all effects run)
        const timer = setTimeout(() => {
            setIsSlug(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    
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

export default PropertyListing;