import Image from 'next/image'
import React from 'react'
import Dropdown from './dropDownColor'

const options = [
  { id: 1, label: "Can View" },
  { id: 2, label: "Can Edit" },
  { id: 3, label: "Property Owner" },
  { id: 4, label: "Remove" },
]

const Data = [
  {
    id: 1,
    Image: "/static/dashboard/enterprisemanager/settings/Avatar.png",
    Name: "Victor Akpan",
    label: "Can Edit",

  },
  {
    id: 2,
    Image: "/static/dashboard/enterprisemanager/settings/Avatar.png",
    Name: "Victor Akpan",
    label: "Can View",
  },
  {
    id: 3,
    Image: "/static/dashboard/enterprisemanager/settings/Avatar.png",
    Name: "Victor Akpan",
    label: "Property Owner",
  },
  {
    id: 4,
    Image: "/static/dashboard/enterprisemanager/settings/Avatar.png",
    Name: "Victor Akpan",
    label: "Can View",
  },
]

const Invites = () => {
  return (
    <div className='p-8'>
      <p className='text-[14px] font-[400] text-GrayHomz'>
        Invitee
      </p>
      {Data.map((data) => (
        <div key={data.id} className=' flex gap-4 mt-4 items-start'>

          <Image src={data.Image} height={40} width={40} alt='img'/>  
          <Dropdown options={options} selectOption={data.label} className={"w-[190px]"}/>
        </div>
      ))}
    </div>
  )
}

export default Invites