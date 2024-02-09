import Image from "next/image";
import React from "react";

const Activities = ({ illuminateWallet }) => {
  const Data = [
    {
      Id: 1,
      From: "Adeyemo Olayemi",
      Status: "Receive",
      To: "Adeyemo Olayemi",
      Image: "/static/dashboard/tenant/finance/strongbox.png",
      TransDate: "16 Nov, 2024",
      Amount: "N4, 000,000 ",
    },
    {
      Id: 2,
      From: "Adeyemo Olayemi",
      Status: "Sent",
      To: "Adeyemo Olayemi",
      Image: "/static/dashboard/tenant/finance/strongbox.png",
      TransDate: "16 Nov, 2024",
      Amount: "N500,000 ",
    },
    {
      Id: 3,
      From: "Adeyemo Olayemi",
      Status: "Receive",
      To: "Adeyemo Olayemi",
      Image: "/static/dashboard/tenant/finance/strongbox.png",
      TransDate: "16 Nov, 2024",
      Amount: "N1,500,000 ",
    },
    {
      Id: 4,
      From: "Adeyemo Olayemi",
      Status: "Sent",
      To: "Adeyemo Olayemi",
      Image: "/static/dashboard/tenant/finance/strongbox.png",
      TransDate: "16 Nov, 2024",
      Amount: "N4, 000,000 ",
    },
    {
      Id: 5,
      From: "Adeyemo Olayemi",
      Status: "Sent",
      To: "Adeyemo Olayemi",
      Image: "/static/dashboard/tenant/finance/strongbox.png",
      TransDate: "16 Nov, 2024",
      Amount: "N500,000 ",
    },
    {
      Id: 6,
      From: "Adeyemo Olayemi",
      Status: "Receive",
      To: "Adeyemo Olayemi",
      Image: "/static/dashboard/tenant/finance/strongbox.png",
      TransDate: "16 Nov, 2024",
      Amount: "N1,500,000 ",
    },
  ];
  return (
    <div className="p-5 border rounded-[12px] overflow-auto h-[250px] scrollbar-container">
      <div className="h-[40px] flex justify-between items-center">
        <div className="flex gap-2 items-center">
        {illuminateWallet ? (
          <Image
          src={"/static/dashboard/enterprisemanager/payment/clock.png"}
          alt=""
          height={21}
          width={20}
        />
          ) : (
            <Image
            src={"/static/dashboard/tenant/finance/clock.png"}
            alt=""
            height={21}
            width={20}
          />
          )}
          <p
            className={`text-[14px] font-[500] ${
              illuminateWallet ? "text-GrayHomz" : "text-GrayHomz6"
            }`}
          >
            Activities
          </p>
        </div>

        <div className="flex gap-1 items-center">
          <p
            className={`text-[13px] font-[400]   ${
              illuminateWallet ? "text-BlackHomz" : "text-GrayHomz6"
            }`}
          >
            View All
          </p>
          {illuminateWallet ? (
            <Image
              src={
                "/static/dashboard/enterprisemanager/payment/arrow-right.png"
              }
              alt=""
              height={17}
              width={17}
            />
          ) : (
            <Image
              src={"/static/dashboard/tenant/finance/arrow-right.png"}
              alt=""
              height={17}
              width={17}
            />
          )}
        </div>
      </div>
      <div className={`${illuminateWallet ? "block" : "hidden"}`}>
        {Data.map((data) => (
          <div key={data.Id}>
            <div>
              {data.Status === "Receive" ? (
                <div className="flex items-center justify-between mt-8 border-b h-[40px] pb-8">
                  <div className="flex gap-6 items-center">
                    <Image
                      src={
                        "/static/dashboard/enterprisemanager/payment/received_2.png"
                      }
                      width={20}
                      height={21}
                      alt=""
                    />
                    <div className="flex p-2 bg-BlueHomz rounded-full">
                      <Image src={data.Image} alt="" height={20} width={20} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[-5px]">
                    <p className="text-[10px] font-[500] text-GrayHomz w-[220px]">
                      Received {data.Amount} from rent savings
                    </p>
                    <span className="text-[10px] font-[400] text-GrayHomz2">
                      {data.TransDate}
                    </span>
                  </div>
                  <div className="text-[10px] font-[400] text-Success w-[75px]">
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
                    <div className="flex p-2 bg-BlueHomz rounded-full">
                      <Image src={data.Image} alt="" height={20} width={20} />
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
                  <div className="text-[10px] font-[400] text-error w-[75px]">
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

export default Activities;
