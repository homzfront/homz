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
      <div className="absolute top-0 z-50 h-screen w-full inset-0 flex items-center justify-center shadow-lg bg-black bg-opacity-30">
        <div className="h-[410px] w-[816px] bg-white rounded-lg">
          <div className="border-b flex justify-between items-center py-8">
            <div className="px-8">
              <div className="flex gap-8 items-center">
                <div className="rounded-full shadow-md p-2">
                  {

                    data?.sender?.businessLogo?.url || data?.sender?.coverPhoto?.url ? <Image src={data?.sender?.coverPhoto?.url || data?.sender?.businessLogo?.url} alt="" height={40} width={40} className="rounded-full" />
                      :
                      <Image src="/static/dashboard/enterprisemanager/notification/AvatarEmpty.png" alt="" height={40} width={40} />
                  }
                </div>
                <div>
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
          <p className="text-[16px] font-[400] text-GrayHomz p-8">
            {data?.message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PopNotification