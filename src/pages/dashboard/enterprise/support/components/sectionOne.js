import Image from 'next/image'
import React from 'react'

const SectionOne = () => {
  return (
    <div>
        <div className="max-w-[420px] gap-6  flex flex-col">
          <p className="text-[16px] mt-2 font-[400] text-GrayHomz ">
            Any questions or remarks? Just send us a message. Fill up the form
            and our team will get back to you.
          </p>
          <div className=" mt-8 flex gap-8">
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image
                src={"/call.png"}
                height={24}
                width={24}
                alt={`call-img`}
              />
            </div>
            <div className="flex gap-5 flex-col">
              <div className="  flex gap-2">
                <p className="text-[16px] font-[400] text-GrayHomz ">
                  +23481012345678
                </p>
                <div>
                  <Image
                    className="cursor-pointer"
                    src={"/copy.png"}
                    alt="copy-img"
                    height={16}
                    width={17}
                  />
                </div>
              </div>
              <div className="flex gap-2 pl-4">
                <p className="text-[16px] font-[400] text-GrayHomz ">
                  +2349012345678
                </p>
                <div>
                  <Image
                    className="cursor-pointer"
                    src={"/copy.png"}
                    alt="copy-img"
                    height={16}
                    width={17}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-1 flex gap-8">
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image src={"/sms.png"} height={24} width={24} alt={`call-img`} />
            </div>
            <div className=" flex gap-2">
              <p className="text-[16px] font-[400] underline text-GrayHomz ">
                info@homz.ng
              </p>
              <div>
                <Image
                  className="cursor-pointer"
                  src={"/copy.png"}
                  alt="copy-img"
                  height={16}
                  width={17}
                />
              </div>
            </div>
          </div>
          <div className=" flex mt-3 gap-5">
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image
                src={"/Vector_insta.png"}
                height={18.75}
                width={18.75}
                alt={`call-img`}
              />
            </div>
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image
                src={"/Vector_facebook.png"}
                height={18.75}
                width={18.75}
                alt={`call-img`}
              />
            </div>
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image
                src={"/Vector_twitter.png"}
                height={18.75}
                width={18.75}
                alt={`call-img`}
              />
            </div>
            <div className="rounded-full h-[32px] w-[32px] flex justify-center items-center bg-blue-100">
              <Image
                src={"/Vector_Linkedin.png"}
                height={18.75}
                width={18.75}
                alt={`call-img`}
              />
            </div>
            <div className="flex gap-1">
              <p className="text-[16px] font-[400] text-GrayHomz ">homz.ng</p>
              <div>
                <Image
                  className="cursor-pointer"
                  src={"/copy.png"}
                  alt="copy-img"
                  height={12}
                  width={17}
                />
              </div>
            </div>
          </div>
        </div>
        
    </div>
  )
}

export default SectionOne