'use client';
import React, { useState } from 'react'
import UserRole from "./components/UserRole";
import Access from "./components/Access";

const InnerProfile = ({Data}) => {
    const [openUserRoleDropdowns, setOpenUserRoleDropdowns] = useState({});
    const [openAccessDropdowns, setOpenAccessDropdowns] = useState({});
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState(Data || {});

    const handleEditBtn = (event) => {
        event.preventDefault();
        setEdit(!edit);
        // console.log('clicked');
      };
      const handleStatusChange = (role, dataId, fn, setOpenDropdowns) => {
        setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));
        const dataIndex = data.findIndex((item) => item.id === dataId);
        if (dataIndex !== -1) {
          const updatedData = [...data];
          updatedData[dataIndex][fn] = role;
          setData(updatedData);
        }
      };
    
      const toggleUserRoleDropdown = (dataId) => {
        setOpenUserRoleDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
      };
      const toggleAccessDropdown = (dataId) => {
        setOpenAccessDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
      };
  return (
    <div className='flex flex-col items-center space-y-20 w-full'>
    <main className="User_body profiles flex flex-col md:flex-row md:items-center gap-10 w-full">
        <div className="profiles flex flex-col space-y-7">
          <div className="w-[320px] space-y-1">
            <label for="fullname" className="">
              Full Name
            </label>
            <br />
            <input
              type="text"
              id="fullname"
              className={`field ${!edit ? "bg-[#E6E6E6]" : "adminCellBorders"}`}
              name="fullname"
              placeholder="John Doe"
              readOnly={!edit && true}
            />
          </div>

          <div className="w-[320px] space-y-1">
            <label for="phoneNo">Phone Number</label>
            <br />
            <input
              type="text"
              id="phoneNumber"
              className={`field ${!edit ? "bg-[#E6E6E6]" : "adminCellBorders"}`}
              name="phoneNumber"
              placeholder="09023347689"
              readOnly={!edit && true}
            />
          </div>
          <div className="w-[320px] space-y-1">
            <label for="userRole">User Role</label>
            <UserRole
              data={data}
              handleStatusChange={(role) =>
                handleStatusChange(
                  role,
                  data.id,
                  "UserRole",
                  setOpenUserRoleDropdowns
                )
              }
              isOpen={openUserRoleDropdowns[data.id] || false}
              toggleDropdown={() => toggleUserRoleDropdown(data.id)}
              bg_color={edit}
            />
          </div>
        </div>
        <div className="profiles flex flex-col space-y-7">
          <div className="space-y-1 w-[320px]">
            <label for="email">Email</label>
            <br />
            <input
              type="text"
              id="email"
              className={`field ${!edit ? "bg-[#E6E6E6]" : "adminCellBorders"}`}
              name="email"
              placeholder="JohnDoe@gmail.com"
              readOnly={!edit && true}
            />
          </div>

          <div className="space-y-1 w-[320px]">
            <label for="phoneNo">Address</label>
            <br />
            <input
              type="text"
              id="Address"
              className={`field ${!edit ? "bg-[#E6E6E6]" : "adminCellBorders"}`}
              name="Address"
              placeholder="High view estate, lagos"
              readOnly={!edit && true}
            />
          </div>
          <div className="space-y-1 w-[320px] ">
            <label for="Access">Access</label>
            <Access
              data={data}
              handleStatusChange={(role) =>
                handleStatusChange(
                  role,
                  data.id,
                  "Access",
                  setOpenUserRoleDropdowns
                )
              }
              isOpen={openAccessDropdowns[data.id] || false}
              toggleDropdown={() => toggleAccessDropdown(data.id)}
              editable={edit}
            />
          </div>
        </div>
        {/* <div className=''></div> */}
      </main>
      {/* <div className="action text-center mx-auto">
      </div> */}
      <button
        className={`${
          edit ? "hidden" : "block"
        } md:pl-3 editBtn md:w-[670px] h-[48px] p-[12px] rounded-[4px] text-center md:mr-auto  md:mt-[1.5rem] relative`}
        onClick={(e) => handleEditBtn(e)}
      >
        Edit Profile
      </button>
      <button
        className={`${
          !edit ? "hidden" : "block"
        } md:pl-3 editBtn md:w-[670px] h-[48px] p-[12px] rounded-[4px] text-center md:mr-auto  md:mt-[1.5rem] relative`}
        onClick={(e) => handleEditBtn(e)}
      >
        Save Update
      </button>
    
    </div>
  )
}

export default InnerProfile