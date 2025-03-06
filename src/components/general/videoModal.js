import React, { useState } from "react";
import ReactPlayer from "react-player";
import useClickOutside from "@/utils/clickOutside";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import Watch from "../icons/watch";

const VideoModal = ({ videoUrl }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useClickOutside(() => setIsOpen(false));

    return (
        <div className="">
            <button onClick={() => setIsOpen(true)} className="text-[12px] md:text-[14px] font-normal text-GrayHomz flex items-center gap-1 underline">
                <Watch />
                Watch how it works
            </button>
            <div ref={dropdownRef} className="">
                <CustomizedModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
                    <div className="w-full md:w-[900px] h-auto">
                        <div className={`hidden lg:flex flex-row-reverse gap-2 justify-start items-start w-full`}>
                            <ReactPlayer
                                url={videoUrl}
                                controls={true}
                                width="960px"
                                height="540px"
                                // style={{ objectFit: "cover", minHeight: "500px" }} 
                            />
                        </div>
                        <div className="lg:hidden flex flex-row-reverse gap-2 justify-start items-start w-full">
                            <ReactPlayer
                                url={videoUrl}
                                controls={true}
                                width="100%"
                                height="100%"
                                // style={{ objectFit: "cover", minHeight: "500px" }} 
                            />
                        </div>
                    </div>
                </CustomizedModal >
            </div>
        </div>
    );
};

export default VideoModal;
