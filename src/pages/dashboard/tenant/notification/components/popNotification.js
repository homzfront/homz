import timeAgo from '@/utils/timeAgo';
import Image from 'next/image'
import React from 'react'

const PopNotification = ({ selectedId, closeMenu }) => {
  // Ensure that Data is defined and not null
  if (!selectedId) {
    return null; // or handle accordingly, e.g., return a loading state
  }
  // Ensure Data is defined before use
  const data = selectedId || []; // Assign an empty array if Data is undefined

  return (
    <div>
      <div className="absolute top-0 z-50 h-screen w-full inset-0 flex items-center justify-center shadow-lg bg-black bg-opacity-30 px-4 md:px-0">
        <div className="md:h-[410px] md:w-[816px] bg-white rounded-lg pt-2 md:pt-0">
          <div className="border-b flex justify-between md:items-center pt-4 md:pt-0 py-4 md:py-8">
            <div className="md:px-8 px-4">
              <div className="flex md:gap-8 md:items-center">
                <div className="rounded-full w-[30%] md:shadow-md md:p-2 md:w-auto">
                  {

                    data?.sender?.businessLogo?.url || data?.sender?.coverPhoto?.url ?
                     <Image
                      src={data?.sender?.coverPhoto?.url || data?.sender?.businessLogo?.url}
                      alt=""
                      height={40}
                      width={40}
                      layout="full" // Specify the desired height
                      objectFit="cover"
                      objectPosition="center"
                      className="object-cover bg-center h-[40px] rounded-full"
                      quality={100}
                      priority />
                      :
                      <Image src="/static/dashboard/enterprisemanager/notification/AvatarEmpty.png" alt="" height={40} width={40} />
                  }
                </div>
                <div className='w-[70%] md:w-auto'>
                  <p className="text-[16px] font-[600] text-BlackHomz">
                    {data?.subject}
                  </p>
                  <p className="text-[13px] font-[400] text-GrayHomz">
                    {timeAgo(data?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-8">
              <div
                onClick={(e) => { closeMenu(e); e.stopPropagation(); }}

                className="cursor-pointer bg-GrayHomz6 h-8 w-8 rounded-md flex items-center justify-center"
              >
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/notification/Icon.png"
                  }
                  alt=""
                  height={12}
                  width={12}
                />
              </div>
            </div>
          </div>
          <p className="text-[16px] text-justify font-[400] text-GrayHomz mb-1 md:mb-0 p-4 md:p-8">
            {data?.message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PopNotification