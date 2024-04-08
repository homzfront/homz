'use client';
import React, { useState } from 'react'
import UserRole from "./components/UserRole";
// import Access from "./components/Access";
import DropDown from './components/DropDown';

const PropertyInfo = ({data}) => {
  // console.log(data)
    const [openUserRoleDropdowns, setOpenUserRoleDropdowns] = useState({});
    const [incomingData, setData]= useState(data || {});
    const [edit, setEdit] = useState(false);

    const handleEditBtn = (event) => {
        event.preventDefault();
        setEdit(!edit);
        // console.log('clicked');
      };
      const handleStatusChange = (role, dataId, fn, setOpenDropdowns) => {
        setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));
        // console.log(data)
        
        const dataIndex = incomingData.findIndex((item) => item._id === dataId);
        if (dataIndex !== -1) {
          const updatedData = [...data];
          updatedData[dataIndex][fn] = role;
          setData(updatedData);
        }
      };
    
      const toggleUserRoleDropdown = (dataId) => {
        setOpenUserRoleDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
      };
   
  return (
    <div className='flex flex-col items-center space-y-20 w-full'>
    <main className="User_body profiles flex flex-col  md:flex-row  gap-[7rem] w-full">
        <div className="profiles flex flex-col space-y-6">
          <div className="w-[473px] space-y-1">
            <label for="PropertyName " className="">
            Property Name <span className='text-red-500'>*</span>
            </label>
            <br />
            <input
              type="text"
              id="PropertyName "
              className={`w-full h-[45px] p-[12px] rounded-[4px]  ${!edit ? "bg-[#E6E6E6]" : "adminCellBorders"}`}
              value={incomingData?.Name}
              name="PropertyName "
              placeholder="Property Name "
              readOnly={!edit && true}
            />
          </div>

          <div className="w-[473px] space-y-1">
            <label for="PropertySize">Property Address <span className='text-red-500'>*</span></label>
            <br />
            <input
              type="text"
              id="PropertySize"
              className={`w-full h-[45px] p-[12px] rounded-[4px] ${!edit ? "bg-[#E6E6E6]" : "adminCellBorders"}`}
              value={`${incomingData?.Location}`}
              name="PropertySize"
              placeholder="Property Size"
              readOnly={!edit && true}
            />
          </div>
          <div className="w-[473px] space-y-1">
            <label for="No_of_Houses">No of Houses <span className='text-red-500'>*</span></label>
            <UserRole
              data={incomingData}
              handleStatusChange={(role) =>
                handleStatusChange(
                  role,
                  data._id,
                  "No_of_Houses",
                  setOpenUserRoleDropdowns
                )
              }
              isOpen={openUserRoleDropdowns[data._id] || false}
              toggleDropdown={() => toggleUserRoleDropdown(data._id)}
              Editable={edit}
              width={'w-[228px]'}
            />
          </div>
        </div>
        <div className="profiles flex flex-col space-y-5">
          <div className="space-y-1">
            <label for="PropertyLocation">Property Location <span className='text-red-500'>*</span></label>
            <br />
          <DropDown hide={true} width={'w-[228px]'} height={'h-[45px]'} edit={edit}/>
          </div>

          <div className="space-y-1 w-[473px]">
            <label for="PropertySize">Property Size</label>
            <br />
            <div 
              className={`w-full h-[45px]  rounded-[4px] ${!edit ? "bg-[#E6E6E6]" : "adminCellBorders"}`}            
            >

            <input
              type="text"
              id="PropertySize"
              className={`w-[92%] h-[41px] p-[12px] rounded-[4px] ${!edit && "bg-[#E6E6E6]"}`}
              name="PropertySize"
              placeholder="0.00"
              readOnly={!edit && true}
            />
            <span className='text-[#A9A9A9]'>sqm</span>
            </div>
          </div>
          
        </div>
        {/* <div className=''></div> */}
      </main>
      {/* <div className="action text-center mx-auto">
      </div> */}
      <button
        className={`${
          edit ? "hidden" : "block"
        }  editBtn md:w-[83px] h-[40px] bg-blue-600 text-white rounded-[4px] mr-[3rem] text-center md:ml-auto  md:mt-[1.5rem] relative`}
        onClick={(e) => handleEditBtn(e)}
      >
        Update
      </button>
      <button
        className={`${
          !edit ? "hidden" : "block"
        }  editBtn md:w-[120px] h-[40px]   bg-blue-600 text-white rounded-[4px] mr-[3rem] text-center md:ml-auto  md:mt-[1.5rem] relative`}
        onClick={(e) => handleEditBtn(e)}
      >
        Save Update
      </button>
    
    </div>
  )
}

export default PropertyInfo;