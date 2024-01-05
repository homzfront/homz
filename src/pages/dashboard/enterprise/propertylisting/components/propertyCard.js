import React from "react";
import Card from "./card";


const PropertyCard = ({
  Data,
  handleToggleMenu,
  popUpMenu,
  selectedDataId,
}) => {
    // Ensure that Data is defined and not null
    if (!Data) {
      return null; // or handle accordingly, e.g., return a loading state
    }
      // Ensure Data is defined before use
      const data = Data || []; // Assign an empty array if Data is undefined
  
  return (
    <div className="grid grid-cols-4 gap-4 ">
      {data &&
        data.map((data) => (
            <Card
              key={data.id}
              value4={data.noOfApartment}
              value5={data.rating}
              Image3={
                "/static/dashboard/enterprisemanager/propertyList/full.png"
              }
              value3={data.estateAddress}
              value2={data.estateName}
              value1={data.estateImage}
              data={data.id}
              handleToggleMenu={handleToggleMenu}
              popUpMenu={popUpMenu}
              selectedDataId={selectedDataId}
              Image1={
                "/static/dashboard/enterprisemanager/propertyList/location.png"
              }
              Image2={
                "/static/dashboard/enterprisemanager/propertyList/Frame 841.png"
              }
            />
  
     

        ))}
    </div>
  );
};

export default PropertyCard;
