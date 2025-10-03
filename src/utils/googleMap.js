
import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import axios from "axios";
import MapLoaderSkeleton from "./puffLoader";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const initialCenter = {
  lat: -3.745,
  lng: -38.523,
};

const MyComponent = ({addressData}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP,
  });
let address="ikeja lagos"
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(initialCenter);

  // Fetch address from the database and geocode it
  useEffect(() => {
    const fetchAddress = async () => {
      try {
      
        // Geocode the address to get latitude and longitude
        const geocodeResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            addressData
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`
        );
        // console.log(geocodeResponse)
        const location = geocodeResponse.data.results[0].geometry.location;
        // setCenter({ lat: location.lat, lng: location.lng });
      } catch (error) {
        console.error("Error fetching or geocoding the address:", error);
      }
    };

    fetchAddress();
  }, [addressData]);

  const onLoad = useCallback(function callback(map) {
    if (typeof window !== 'undefined' && window.google) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
    }
    setMap(map);
  }, [center]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <MapLoaderSkeleton />
  );
};

export default React.memo(MyComponent);