import React from "react";
import Card from "./card";

const EstateCard = ({ Data, handleToggleMenu, popUpMenu, selectedDataId }) => {

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
       {Data && Data.map((data) => (
        <Card
          key={data._id}
          value4={data.numberOfHouses}
          value3={data.address}
          value2={data.name}
          value1={data?.coverPhoto?.url}
          data={data._id} handleToggleMenu={handleToggleMenu}  popUpMenu={popUpMenu} selectedDataId={selectedDataId}
          Image1={"/static/dashboard/enterprisemanager/estate/location.png"}
          Image2={"/static/dashboard/enterprisemanager/estate/house-2.png"}
        />
      ))}
    </div>
  );
};

export default EstateCard;
