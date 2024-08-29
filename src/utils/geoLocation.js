import React, { useEffect, useState } from "react";

const Geolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    cordination: {
      lat: "",
      lng: "",
    },
  });

  const onSuccess = (position) => {
    setLocation({
      loaded: true,
      cordination: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    });
  };
  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  return location;
};

export default Geolocation;
