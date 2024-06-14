import React from 'react'
import formatNumber from "@/utils/formatNumber";
import Image from 'next/image'

const ContactCard = ({contactData}) => {
  return (
    <div className="py-[32px] mt-5 px-[16px] flex flex-col gap-[12px] rounded-[8px] text-white bg-[#202020]">
                  <p className="text-[13px] leading-[19.5px] font-[500]">
                    Interested in this property?
                  </p>
                  <div className="flex gap-[12px] ">
                    <div className="bg-white h-[40px] w-[240px] flex items-center justify-between p-[12px] rounded-[8px]">
                      <p className="text-[#006AFF] text-[13px] font-[400] leading-[19.5px]">
                        {formatNumber("08034567823")}
                      </p>
                      <button className="text-white bg-[#006AFF] py-[4px] px-[12px] rounded-[8px]  text-[11px] leading-[16.5px] font-[400]">
                        Call Agent
                      </button>
                    </div>
                    <div className="bg-white h-[40px] w-[240px] flex items-center justify-between p-[12px] rounded-[8px]">
                      <p className="text-[#039855] text-[13px] flex gap-2 font-[400] leading-[19.5px]">
                        <Image
                          src="/static/images/whatsapp.svg"
                          alt=""
                          width={16}
                          height={16}
                          className="h-[16px] w-[16px]"
                        />
                        <span>Whatsapp</span>
                      </p>
                      <button className="text-white bg-[#039855] py-[4px] px-[12px] rounded-[8px]  text-[11px] leading-[16.5px] font-[400]">
                      Send Message
                      </button>
                    </div>
                    <button className="text-white h-[40px] bg-[#006AFF] py-[8px] px-[12px] rounded-[8px] flex items-center text-[11px] leading-[16.5px] font-[400]">
                      <Image
                        src="/static/images/call.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="h-[16px] w-[16px]"
                      />
                     <span>Request Callback</span> 
                    </button>
                  </div>
                </div>
  )
}

export default ContactCard