import React from "react";
import Card from "./card";
import addCommasToNumber from "@/utils/addCommasToNumber";

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
            key={data._id}
            value4={`${addCommasToNumber(data?.yearlyRent)} per year`}
            value5={"5"}
            Image3={"/static/dashboard/enterprisemanager/propertyList/full.png"}
            value3={`${data?.location.area}, ${data?.location.state}`}
            value2={data?.name}
            value1={data?.coverPhoto?.url}
            data={data._id}
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
