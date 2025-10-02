import Image from "next/image";

const InstagramView = ({ url }) => {
  const view = () => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex justify-between items-center h-[44px] rounded-[4px] p-[12px]  bg-[#EEF5FF] mt-5">
      <div className="flex gap-[8px]">
        <Image
          src="/static/images/insta.svg"
          width="16"
          height="16"
          alt="instagram"
          className=""
        />
        <p className="text-[13px] leading-[19.5px] font-[400] text-[#006AFF] ">
          View on Instagram
        </p>
      </div>
      <button
        className="w-[89px] h-[25px] py-[4px] px-[12px] rounded-[8px] text-[11px] font-[400] leading-[16.5px] text-white bg-[#006AFF]"
        onClick={view}
      >
        Click to view
      </button>
    </div>
  );
};

export default InstagramView;
