import React from "react";
import TenantsTwo from "../../tenants/firstPage/tenantsTwo";
import Image from "next/image";
import Link from "next/link";

const Tenants = () => {
  const Data = [
    {
      id: 1,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 2,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 3,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 4,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 5,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 6,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 7,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 8,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 9,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 10,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 11,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 12,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 13,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 14,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 15,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 16,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 17,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 18,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 19,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 20,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 21,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 22,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 23,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 24,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 25,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 26,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 27,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 28,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 29,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 30,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 31,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 32,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 33,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 34,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Paid",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 35,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Over Due",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
    {
      id: 36,
      Tenant: "Adeyemo Olayemi",
      Estate: "Sunrise Estate",
      Rent: "N750,000",
      Status: "Pending",
      DueDate: "4th January, 2024",
      ApartmentNo: "Apartment1",
      Address: "17, Alapere, Alagomeji Area, Yaba, Lagos",
      Email: "AdeyemoOla@gmail.com",
      PhoneNo: "0801  000 0000",
    },
  ];

  return (
    <div className="w-[1147px]  p-8">
      <div className="mb-4">
      <div className="w-[475px] flex gap-2 items-center">
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-left.png"
              }
              alt=""
              height={16}
              width={16}
            />
            <Link
              href={"/dashboard/property-owner/estates"}
              className="text-[14px] font-[400] text-GrayHomz2"
            >
              Go Back
            </Link>
            <Link
              href={"/dashboard/property-owner/estates"}
              className="text-[16px] font-[400] text-GrayHomz"
            >
              Estate Name<> </>/
            </Link>
            <div className="text-[20px] font-[500] text-GrayHomz">
            Tenants
            </div>
          </div>
      </div>
      <div className=" flex justify-between items-center">
        <div className="flex gap-2 ">
          <p>Tenants</p>
          <span className="bg-whiteblue w-6 h-6 flex justify-center ">
            <span className="text-BlueHomz ">{Data.length}</span>
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="text-[16px] font-[400] text-BlackHomz pr-2">
            Filter by:{" "}
          </p>
          <input
            type="date"
            className="border text-GrayHomz2 px-4 h-10 w-[120px] mb-1 py-2 rounded cursor-pointer"
          />
          <button className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-10 w-[92px] mb-1 p-1 rounded cursor-pointer">
            <span>
              <Image
                src={"/static/dashboard/enterprisemanager/dashboard/repeat.png"}
                alt=""
                height={17}
                width={16}
              />
            </span>
            Reset
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className={`p-[12px] h-10 w-[130px] border border-BlueHomz bg-white text-BlueHomz rounded-md flex items-center gap-1 text-[14px] font-[700]`}
          >
            <Image
              src={"/static/dashboard/enterprisemanager/estate/add-square.png"}
              alt=""
              width={16}
              height={17}
              style={{ height: "auto", width: "auto" }}
            />
            Add Tenant
          </button>
          <button
            className={`p-[12px] h-10 w-[170px] justify-center bg-BlueHomz text-white rounded-md flex items-center gap-1 text-[14px] font-[700]`}
          >
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
              }
              alt=""
              width={16}
              height={16}
            />
            Add New Estate
          </button>
        </div>
      </div>
              <div className="h-[734px] mb-4">
              <TenantsTwo Data={Data} />
              </div>
    </div>
  );
};

export default Tenants;
