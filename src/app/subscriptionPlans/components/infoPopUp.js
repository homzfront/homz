import React, {useState} from 'react'
import Image from "next/image";

const InfoPopUp = ({handleInfoClic, feature, selectedData, index}) => {
  const [openInfo, setOpenInfo] = useState(false);
  const [selectedDataId, setSelectedDataId] = useState(null);

  const handleInfoClick = (event, featureId, index) => {
    const rect = event.target.getBoundingClientRect();
    // setTooltipPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    setSelectedDataId(index);
    setOpenInfo(!openInfo);
  };
  
console.log(index)
  return (
    <div>
      <button
             
              onClick={(e) => handleInfoClick(e, feature.id, index)}
              className={`relative h-[14px] w-[16px] cursor-pointer ${
                !feature.enable && "hidden"
              }`}
              disabled={feature.info ===""}
            >
              <Image
                height={10.5}
                width={12}
                alt="img"
                src={"/static/images/gray-info-icon.svg"}
              />
            </button>
    
            {openInfo && selectedDataId === index && (
            <div
              className="absolute w-[460px] left-[117px] top-[576px] flex justify-between border border-[#D5D5D5] bg-[#D5D5D5] rounded-[12px] p-[12px]"
           
            >
              <p className="break-words text-[#4E4E4E] text-[13px] leading-[19.5px] font-[400] max-w-[382px]">
                {feature.info}
              </p>
              <Image
                src="/static/images/close-square.svg"
                height={16}
                width={16}
                alt=""
                onClick={() => setOpenInfo(false)}
                className="cursor-pointer pb-5"
              />
            </div>
          )}
    </div>
  )
}

export default InfoPopUp