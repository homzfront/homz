"use client";
import React, { useEffect, useState } from "react";
import Widget from "./widget";
import { tenantMe } from "@/api/tenantSevice";
import LoadingII from "@/components/mainmenu/loadingII";

const Profile = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tenantMe();
        const estate = response?.data;
        setData(estate);
      } catch (error) {
        // Handle error if needed, or simply ignore it
        console.error("Error fetching data:", error);
      } finally {
        // Set loading to false regardless of success or error
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-8 w-[1147px]">
      <p className="font-[500] text-[20px] text-GrayHomz">Profile</p>
      {loading ? <LoadingII /> : <Widget data={data} />}
    </div>
  );
};

export default Profile;
