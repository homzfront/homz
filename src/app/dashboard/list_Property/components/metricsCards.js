import Image from "next/image";
import api from "@/utils/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const UpperMetrics = () => {
  const { data } = useQuery({
    queryKey: ["metric"],
    queryFn: async () => {
      return await api.get(`/properties/property/metric`);
    },
    placeholderData: keepPreviousData,
    select: (metric) => {
      return metric.data.data;
    },
    // enabled: true,
  });

  const metricsStructure = [
    {
      name: "Listings",
      image: "buliding",
      aka: "totalListing",
    },
    {
      name: "Call Clicks",
      image: "mouse-circle",
      aka: "totalCallClicks",
    },
    {
      name: "WhatsApp Messages",
      image: "blue-whatsapp",
      aka: "totalMessages",
    },
    {
      name: "Views",
      image: "blue-eye",
      aka: "totalViews",
    },
  ];

  const combinedMetrics = metricsStructure.map((metric) => ({
    ...metric,
    value: data?.[metric.aka] ?? 0,
  }));

  return (
    <div className="w-full mx-auto space-y-3">
      <p className="font-[500] text-[20px] py-5">Dashboard</p>
      <div className="grid sm:grid-cols-4 grid-cols-2 gap-[12px] sm:pr-4 mx-auto ">
        {combinedMetrics.map((item, ind) => (
          <div
            className="sm:w-[228px] w-full sm:h-[110px] h-full rounded-[8px] gap-[10px] flex flex-col items-start justify-start p-[16px] border border-[#94a0b1]"
            key={ind}
            style={{
              background: item.name === "Listings" ? "#EEF5FF" : "#F6F6F6",
            }}
          >
            <p className="sm:text-[16px] text-[14px] font-[500] leading-[150%] text-[#202020]">
              [ {item.value} ]
            </p>

            <div className="flex items-center justify-between w-full">
              <p className="font-[500] text-[13px] sm:leading-[150%] leading-[120%] text-[#4E4E4E]">
                Total <br />
                {item.name}
              </p>
              <p
                className="w-[48px] h-[48px] rounded-[24px] flex items-center justify-center p-[12px]"
                style={{
                  background: item.name === "Listings" ? "#006AFF" : "#FFFFFF",
                }}
              >
                <Image
                  src={`/static/images/${item.image}.svg`}
                  alt=""
                  width={20}
                  height={20}
                  className="w-[24px] h-[24px]"
                />
              </p>
            </div>
          </div>
        ))}

        <div className=""></div>
      </div>
    </div>
  );
};
export default UpperMetrics;
