"use client";
import React, { useEffect, useState } from "react";
// import InnerProfile from "./InnerProfile";
import PropertyInfo from "./PropertyInfo";
import PropertyDoc from "./PropertyDocs";
import Tenants from "./Tenant/Tenants";
import PropertyPhotos from "./PropertyPhotos";
import ContactInfo from "./ContactInfo";
import { useRouter } from "next/navigation";
import Loading from "../../components/loadingII";

const PropertiesPane = ({ data }) => {
  const [active, setActive] = useState(true);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  const [activeFour, setActiveFour] = useState(false);
  const [activeFive, setActiveFive] = useState(false);
  //   const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);

  //  console.log(data)

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    },4000);
    // Clean up function
    return () => clearTimeout(timeout);
  }, []);

  const handlePageChange = () => {
    setActive(true);
    setActiveTwo(false);
    setActiveThree(false);
    setActiveFour(false);
    setActiveFive(false);
  };

  const handlePageChangeTwo = () => {
    setActiveTwo(true);
    setActiveFour(false);
    setActive(false);
    setActiveThree(false);
    setActiveFive(false);
  };

  const handlePageChangeThree = () => {
    setActiveThree(true);
    setActiveFour(false);
    setActiveTwo(false);
    setActive(false);
    setActiveFive(false);
  };
  const handlePageChangeFour = () => {
    setActiveFour(true);
    setActiveThree(false);
    setActiveTwo(false);
    setActive(false);
    setActiveFive(false);
  };
  //   const handlePageChangeFive = () => {
  //     setActiveFive(true);
  //     setActiveFour(false);
  //     setActiveThree(false);
  //     setActiveTwo(false);
  //     setActive(false);

  //     const currentUrl = window.location.href;
  //     const profileIdRegex = /\/Profiles\/(\d+)/;
  //     const match = profileIdRegex.exec(currentUrl);
  //     if (match && match.length > 1) {
  //       const profileId = match[1];
  //     //   setId(profileId);
  //       handleRowClick(profileId);
  //     }
  //     // console.log("clicked");
  //   };

  const handlePageChangeFive = async () => {
    setLoading(true); // Start loading

    try {
      // Your routing logic here
      const profileId = await fetchProfileId(); // Example async function to fetch profile ID
      router.push(`/second_release/Properties/${profileId}/Tenant`);
    } catch (error) {
      console.error("Error while loading:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const fetchProfileId = async () => {
   
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUrl = window.location.href;
        const profileIdRegex = /\/Profiles\/(\d+)/;
        const match = profileIdRegex.exec(currentUrl);
        if (match && match.length > 1) {
          const profileId = match[1];
          resolve(profileId);
        }
      }, 3000);
    });
  };

  const router = useRouter();

  const handleRowClick = (Profile) => {
    // console.log(Profile);
    router.push(`/second_release/Properties/${Profile}/Tenant`);
  };
  return (
    <div className="profiles adminCellBorders flex flex-col rounded-[8px] relative">
      <div className="Taskbar flex flex-wrap md:flex-nowrap gap-[2rem] items-center border-b-2 p-3 md:pl-[2.75rem] h-[70px]">
        <button
          className={` items-center ${
            active ? "text-BlueHomz" : "text-BlackHomz"
          }`}
          onClick={(e) => handlePageChange(e)}
        >
          Property Information
        </button>
        <button
          className={`${activeTwo ? "text-BlueHomz " : "text-BlackHomz"}`}
          onClick={(e) => handlePageChangeTwo(e)}
        >
          Photos
        </button>
        <button
          className={`${activeThree ? "text-BlueHomz" : "text-BlackHomz "}`}
          onClick={(e) => handlePageChangeThree(e)}
        >
          Contact Information
        </button>
        <button
          className={`${activeFour ? "text-BlueHomz" : "text-BlackHomz"}`}
          onClick={(e) => handlePageChangeFour(e)}
        >
          Documents
        </button>
        <button
          className={`${activeFive ? "text-BlueHomz" : "text-BlackHomz"}`}
          onClick={(e) => handlePageChangeFive(e)}
        >
          Tenants
        </button>
      </div>
      <main className="User_body pl-[1rem] pt-[2.5rem] pb-[4rem]">
        {loading ? (
          <Loading />
        ) : (
          <>
            {active && <PropertyInfo data={data} />}

            {activeTwo && <PropertyPhotos data={data} />}

            {activeThree && <ContactInfo data={data} />}

            {activeFour && <PropertyDoc data={data} />}
            {/* {activeFive && <Link href={`/second_release/Tenant/${id}`}></Link>} */}
          </>
        )}
      </main>
    </div>
  );
};

export default PropertiesPane;
