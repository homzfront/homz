import Image from "next/image";
import React from "react";

const TransferHis = () => {
  const Data = [
    {
      Id: 1,
      From: "Adeyemo Olayemi",
      Status: "Receive",
      To: "Adeyemo Olayemi",
      Image: "/static/dashboard/enterprisemanager/payment/Avatar.png",
      TransDate: "16 Nov, 2024",
      Amount: "N4, 000,000 ",
    },
    {
      Id: 2,
      From: "Adeyemo Olayemi",
      Status: "Sent",
      To: "Adeyemo Olayemi",
      Image: "/static/dashboard/enterprisemanager/payment/Avatar.png",
      TransDate: "16 Nov, 2024",
      Amount: "N500,000 ",
    },
    {
      Id: 3,
      From: "Adeyemo Olayemi",
      Status: "Receive",
      To: "Adeyemo Olayemi",
      Image: "/static/dashboard/enterprisemanager/payment/Avatar.png",
      TransDate: "16 Nov, 2024",
      Amount: "N1,500,000 ",
    },
    {
      Id: 4,
      From: "Adeyemo Olayemi",
      Status: "Sent",
      To: "Adeyemo Olayemi",
      Image: "/static/dashboard/enterprisemanager/payment/Avatar.png",
      TransDate: "16 Nov, 2024",
      Amount: "N4, 000,000 ",
    },
    {
      Id: 5,
      From: "Adeyemo Olayemi",
      Status: "Sent",
      To: "Adeyemo Olayemi",
      Image: "/static/dashboard/enterprisemanager/payment/Avatar.png",
      TransDate: "16 Nov, 2024",
      Amount: "N500,000 ",
    },
    {
      Id: 6,
      From: "Adeyemo Olayemi",
      Status: "Receive",
      To: "Adeyemo Olayemi",
      Image: "/static/dashboard/enterprisemanager/payment/Avatar.png",
      TransDate: "16 Nov, 2024",
      Amount: "N1,500,000 ",
    },
  ];
  return (
    <div className="p-5 border rounded-[12px] mt-8 overflow-auto h-[323px] scrollbar-container">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image
            src={"/static/dashboard/enterprisemanager/payment/clock.png"}
            alt=""
            height={21}
            width={20}
          />
          <p className="text-[14px] font-[500] text-GrayHomz">Activities</p>
        </div>

        <div className="flex gap-1 items-center">
          <p className="text-[13px] font-[400] text-BlackHomz">View All</p>
          <Image
            src={"/static/dashboard/enterprisemanager/payment/arrow-right.png"}
            alt=""
            height={17}
            width={17}
          />
        </div>
      </div>
      <div>
        {Data.map((data) => (
          <div key={data.Id}>
            <div>
              {data.Status === "Receive" ? (
                <div className="flex items-center justify-between mt-6 border-b h-[40px] pb-5">
                  <div className="flex gap-6 items-center">
                    <Image
                      src={
                        "/static/dashboard/enterprisemanager/payment/received_2.png"
                      }
                      width={20}
                      height={21}
                      alt=""
                    />
                    <div>
                      <Image src={data.Image} alt="" height={32} width={32} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[-5px]">
                    <p className="text-[10px] font-[500] text-GrayHomz w-[220px]">
                      Received {data.Amount} from {data.From}
                    </p>
                    <span className="text-[10px] font-[400] text-GrayHomz2">
                      {data.TransDate}
                    </span>
                  </div>
                  <div className="text-[10px] font-[400] text-Success w-[65px]">
                    {data.Amount}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between mt-6 border-b h-[40px] pb-5">
                  <div className="flex gap-6 items-center">
                    <Image
                      src={
                        "/static/dashboard/enterprisemanager/payment/send.png"
                      }
                      width={20}
                      height={21}
                      alt=""
                    />
                    <div>
                      <Image src={data.Image} alt="" height={32} width={32} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[-5px]">
                    <p className="text-[10px] font-[500] text-GrayHomz w-[220px] ">
                      You sent {data.Amount} to {data.From}
                    </p>
                    <span className="text-[10px] font-[400] text-GrayHomz2">
                      {data.TransDate}
                    </span>
                  </div>
                  <div className="text-[10px] font-[400] text-error w-[65px]">
                    {data.Amount}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransferHis;
