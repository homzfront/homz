"use client";
import Image from "next/image";
import React, { useMemo } from "react";
import DropDown from "../../components/DropDown";
import UsersTable from "./TableGrid";




const Data = [
    {
      id: 1,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Admin",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 2,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Customer Support",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 3,
      Name: "Adeyemo Olayemi",
      Access: "Can view",
      Status: "online",
      UserRole: "Security",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 4,
      Name: "Adeyemo Olayemi",
      Access: "Can view",
      Status: "online",
      UserRole: "Customer Support",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 5,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Admin",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 6,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Customer Support",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 7,
      Name: "Adeyemo Olayemi",
      Access: "Can view",
      Status: "online",
      UserRole: "Admin",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 8,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Customer Support",
      ProfileType: "Tenant",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 9,
      Name: "Adeyemo Olayemi",
      Access: "Can view",
      Status: "online",
      UserRole: "Admin",
      ProfileType: "Landlord",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 10,
      Name: "Adeyemo Olayemi",
      Access: "Can view",
      Status: "offline",
      UserRole: "Customer Support",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 11,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Admin",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 12,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Landlord",
      ProfileType: "Landlord",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 13,
      Name: "Adeyemo Olayemi",
      Access: "Can view",
      Status: "online",
      UserRole: "Admin",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 14,
      Name: "Adeyemo Olayemi",
      Access: "Can view",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 15,
      Name: "Adeyemo Olayemi",
      Access: "Can view",
      Status: "online",
      UserRole: "Admin",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 16,
      Name: "Adeyemo Olayemi",
      Access: "Can view",
      Status: "online",
      UserRole: "Landlord",
      ProfileType: "Landlord",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 17,
      Name: "Adeyemo Olayemi",
      Access: "Can view",
      Status: "online",
      UserRole: "Landlord",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 18,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Customer Support",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 19,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Admin",
      ProfileType: "Tenant",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 20,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Admin",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 21,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Admin",
      ProfileType: "Landlord",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 22,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Landlord",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 23,
      Name: "Adeyemo Olayemi",
      Access: "Can view",
      Status: "offline",
      UserRole: "Security",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 24,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Security",
      ProfileType: "Tenant",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 25,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Admin",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 26,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Security",
      ProfileType: "Landlord",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 27,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Admin",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 28,
      Name: "Adeyemo Olayemi",
      Access: "Can view",
      Status: "online",
      UserRole: "Admin",
      ProfileType: "Property Manager",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 29,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Security",
      ProfileType: "Landlord",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 30,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 31,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 32,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 33,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 34,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 35,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 36,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 37,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 38,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 39,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 40,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 41,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 42,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 43,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 44,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 45,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 46,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 47,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 48,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 49,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 50,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 51,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 52,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    {
      id: 53,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 54,
      Name: "Adeyemo Olayemi",
      Access: "Can view",
      Status: "online",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 55,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenant",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 56,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 57,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 58,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 59,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 60,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 60,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 61,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "offline",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    {
      id: 62,
      Name: "Adeyemo Olayemi",
      Access: "Can edit",
      Status: "online",
      UserRole: "Landlord",
      ProfileType: "Tenanat",
      Email: "ViktorJohn@gmail.com",
      
    },
    
    
  ];

  const UserTable = () => {
    // Memoize the Data array
    const memoizedData = useMemo(() => Data, []);
  
    return (
      <div className="flex gap-6 flex-col">
        {/* number of users */}
        <div className='flex justify-between items-center mt-4'>
  
          <div className="flex gap-2 items-center ">
            <p className="text-[20px] font-[500]">All user</p>
            <span className="bg-blue-100 w-[30px] h-[30px] flex justify-center items-center rounded-[8px]">
              <span className="text-blue-600 text-[18px] font-[400]">{Data.length}</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="pt-[5px]">
              <DropDown />
            </div>
  
            <button className="adminBorders to-blue-600 items-center text-[14px] font-[500] flex text-blue-600 px-[10px] p-1 rounded cursor-pointer">
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
          <div>
            <button className="adminBorders border-red-600 items-center text-[14px] font-[500] flex text-red-600 px-[10px] p-1 rounded cursor-pointer">
              <span>
                <Image
                  src={"/static/images/trash.svg"}
                  alt=""
                  height={12}
                  width={16}
                />
              </span>
              Delete Account(s)
            </button>
          </div>
        </div>
        <div>
          {/* Pass memoizedData to the UsersTable component */}
          <UsersTable Data={memoizedData}/>
        </div>
      </div>
    );
  };
  
  export default UserTable;