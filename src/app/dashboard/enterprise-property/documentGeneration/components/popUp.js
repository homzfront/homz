import ArrowLeft from "@/components/icons/arrowLeft";
import DownloadGray from "@/components/icons/downloadGray";

const PopUp = () => {
    return (
        <div className="z-20 drop-down absolute text-GrayHomz py-2 font-[500] top-5 right-1 border h-auto w-[150px] md:w-[218px] rounded-lg bg-white flex flex-col items-center justify-around">
            <div className=" h-[30px] rounded-md flex gap-1 items-center  px-2 w-full ">
                <div className="hover:bg-whiteblue flex items-center h-full w-full rounded-md">
                    <ArrowLeft />
                    <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2  text-GrayHomz hover:text-BlueHomz">
                        View
                    </p>
                </div>
            </div>
            <div className=" h-[30px] rounded-md flex gap-1 items-center px-2  w-full ">
                <div className="hover:bg-whiteblue flex items-center h-full w-full rounded-md">
                    <DownloadGray />
                    <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 text-GrayHomz hover:text-BlueHomz">
                        Download
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PopUp;
