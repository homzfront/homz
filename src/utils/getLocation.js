import React, { useEffect, useState } from 'react';

const GetLocation = ({ street, area, state }) => {
    // console.log(street, area, state);
  const [center, setCenter] = useState({ lat: '', lng: '' });

  const getCoordinates = async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?state=${state}&city=${area}&country=nigeria&format=json`
      );
    //   const response = await fetch(
    //     `https://nominatim.openstreetmap.org/search?street=${street && street}&state=${state}&city=${area}&country=nigeria&format=json`
    //   );
    //   console.log(response)
    const data = await response.json();
    if (data.length > 0) {
      return { lat: data[0].lat, lng: data[0].lon };
    } else {
      throw new Error("Location not found");
    }
  };

  useEffect(() => {
    if (!area || !state) {
      console.log("Missing location parameters");
      return;
    }
    
    const fetchCoordinates = async () => {
      try {
        const coords = await getCoordinates();
        setCenter({ lat: parseFloat(coords.lat), lng: parseFloat(coords.lng) });
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [street, area, state]);

  return center;
};

export default GetLocation;
