"use client";
import React from 'react';

const PropertyBanner = ({ location, propertyType, listingType }) => {
  // Generate the appropriate title based on the route
  const generateTitle = () => {
    const locationName = location ? location.charAt(0).toUpperCase() + location.slice(1) : '';
    
    if (propertyType && location) {
      // For specific property types like /rent/lagos/mini-flat
      const propertyTypeName = propertyType === 'mini-flat' ? 'Mini Flats' : 
                              propertyType === 'self-contain' ? 'Self Contain' :
                              propertyType.charAt(0).toUpperCase() + propertyType.slice(1);
      
      const actionText = listingType === 'for rent' ? 'For Rent' :
                        listingType === 'for sale' ? 'For Sale' :
                        listingType === 'land' ? 'For Sale' :
                        listingType === 'shortlet' ? 'Shortlet' : '';
      
      return `${propertyTypeName} ${actionText} In ${locationName}`;
    } else if (location) {
      // For general location pages like /rent/lagos
      const actionText = listingType === 'for rent' ? 'For Rent' :
                        listingType === 'for sale' ? 'For Sale' :
                        listingType === 'land' ? 'For Sale' :
                        listingType === 'shortlet' ? 'Shortlet' : '';
      
      return `Houses ${actionText} In ${locationName}`;
    }
    
    return '';
  };

  // Generate breadcrumb text
  const generateBreadcrumb = () => {
    const title = generateTitle();
    return `Home > [${title}]`;
  };

  const title = generateTitle();
  const breadcrumb = generateBreadcrumb();

  if (!title) return null;

  return (
    <div 
      className="w-full max-w-[1159px] mx-auto mb-8"
      style={{
        backgroundColor: '#EEF5FF',
        borderRadius: '8px',
        padding: '32px',
        gap: '16px'
      }}
    >
      {/* Breadcrumb */}
      <div 
        className="mb-4"
        style={{
          fontFamily: 'Plus Jakarta Sans',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '150%',
          letterSpacing: '0%'
        }}
      >
        {breadcrumb}
      </div>

      {/* Title */}
      <h1 
        className="mb-4 text-center"
        style={{
          fontFamily: 'Plus Jakarta Sans',
          fontWeight: 600,
          fontSize: '23px',
          lineHeight: '100%',
          letterSpacing: '0%'
        }}
      >
        [{title}]
      </h1>

      {/* Description */}
      <p 
        style={{
          fontFamily: 'Plus Jakarta Sans',
          fontWeight: 400,
          fontSize: '18px',
          lineHeight: '150%',
          letterSpacing: '0%'
        }}
      >
        Lorem ipsum dolor sit amet consectetur. Phasellus viverra consectetur id dignissim. 
        Tincidunt tristique erat eu consequat consequat. Nibh arcu potenti lacus tempor quisque 
        elementum natoque justo et. Eget est pellentesque elit tellus. Amet cras in lorem mi 
        nulla sed sed egestas.
      </p>
    </div>
  );
};

export default PropertyBanner;