import Image from 'next/image'
import React from 'react'
import DropDown from './components/dropDown'

const Propertylisting = () => {
  return (
    <div className="w-[1081px] p-8">
    <div className=" flex justify-between  items-center">
      <div className="flex gap-1">
        <p>Properties</p>
        <span className="bg-whiteblue w-6 h-6 flex justify-center ">
          <span className="text-BlueHomz ">0</span>
        </span>
      </div>
    </div>
    <div className="flex flex-col gap-3 mt-5">
      <h1 className="text-[41px] font-[700] text-BlueHomz">Get Started</h1>
      <p className="text-[18px] font-[400] text-GrayHomz">
      List your properties so Tenants can see them.
      </p>
      <button className="p-[12px] w-[145px] bg-BlueHomz text-white rounded-md flex items-center gap-1 text-[16px] font-[700]">
        <Image
          src={
            "/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
          }
          alt=""
          width={16}
          height={16}
        />
        List Property
      </button>
    </div>
  </div>
  )
}

export default Propertylisting