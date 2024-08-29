import React, { useRef, useState } from "react";
import { Map, MapContainer, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import mapConfig from "./mapProvider";
import Markerposition from "./Markerposition";
// import useGeoLocation from "./geoLocation";
import getCordinates from "@/utils/getLocation";


const customIcon = new Icon({
  iconUrl: "/static/images/location.png",
  iconSize: [33, 33],
});


const MapFrame = ({street, area,state}) => {
    
    const locationDetails = {
        street,
        area,
        state,
    };
    let place=`${area}, ${state}`
    const zoom_level = 13;
    const mapRef = useRef();
    // const location = useGeoLocation();
    const cordinates=getCordinates(locationDetails);
    const [center, setCenter] = useState({ lat:cordinates.lat, lng:cordinates.lng });
//   console.log(cordinates)

  return (
    <div className="w-full h-full">
      <MapContainer
        center={center}
        zoom={zoom_level}
        zoomControl={true}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
     

        <TileLayer
          url={mapConfig.maptiler.url}
        //   attribution={mapConfig.maptiler.attribution}
        />
        {/* {location.loaded && !location.error && (
        )} */}
          <Markerposition cord={[cordinates.lat, cordinates.lng]} icon={customIcon} card={place} />
      </MapContainer>
    </div>
  );
};

export default MapFrame;
