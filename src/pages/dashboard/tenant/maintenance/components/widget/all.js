"use client";
import React, { useEffect, useState } from "react";

const All = () => {
  const [data, setData] = useState([]);


  // useEffect to load data from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("DataII");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  console.log(data);
  
  return <div>All</div>;
};

export default All;
