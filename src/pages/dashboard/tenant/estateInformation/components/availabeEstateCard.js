import React from "react";
import Card from "./card";


const AvailableEstateCard = ({openLink, Data, handleToggleMenu, popUpMenu, selectedDataId }) => {

  return (
    <div className="grid grid-cols-4 gap-4 ">
      {Data && Data.map((data) => (
        <Card
          key={data.id}
          openLink={openLink}
          value4={data.noOfApartment}
          value3={data.estateAddress}
          value2={data.estateName}
          value1={data.estateImage}
          data={data.id} handleToggleMenu={handleToggleMenu}  popUpMenu={popUpMenu} selectedDataId={selectedDataId}
          Image1={"/static/dashboard/enterprisemanager/estate/location.png"}
          Image2={"/static/dashboard/enterprisemanager/estate/house-2.png"}
        />
      ))}
    </div>
  );
};

export default AvailableEstateCard;
