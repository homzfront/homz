import Image from 'next/image'
import React from 'react'

const PopNotification = ({selectedId, closeMenu}) => {
  return (
    <div>
         <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center shadow-lg bg-black bg-opacity-30">
          <div className="h-[410px] w-[816px] bg-white rounded-lg">
            <div className="border-b flex justify-between items-center py-8">
              <div className="px-8">
                <div className="flex gap-8 items-center">
                  <div className="rounded-full shadow-md p-2">
                    <Image
                      src={selectedId.Image}
                      alt=""
                      height={40}
                      width={40}
                    />
                  </div>
                  <div>
                    <p className="text-[16px] font-[600] text-BlackHomz">
                      {selectedId.Noti}
                    </p>
                    <p className="text-[13px] font-[400] text-GrayHomz">
                      {selectedId.Time}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-8">
                <div
                  onClick={closeMenu}
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
              {selectedId.Text}
            </p>
          </div>
        </div>
    </div>
  )
}

export default PopNotification