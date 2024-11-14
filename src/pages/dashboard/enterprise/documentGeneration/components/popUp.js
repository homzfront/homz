import ArrowLeft from "@/components/icons/arrowLeft";
import DeleteRed from "@/components/icons/deleteRed";
import DownloadGray from "@/components/icons/downloadGray";

const PopUp = ({ dropdownRef, item, openPreview, deleteItem }) => {
    return (
        <div ref={dropdownRef} className="z-20 drop-down absolute text-GrayHomz py-2 font-[500] top-[20px] right-[64px] border h-auto w-[150px] md:w-[180px] rounded-lg bg-white flex flex-col items-center justify-around">
            <div className="cursor-pointer h-[30px] rounded-md flex gap-1 items-center  px-2 w-full ">
                <div onClick={() => openPreview(item)} className="    text-GrayHomz hover:text-BlueHomz hover:bg-whiteblue flex items-center h-full w-full rounded-md">
                    <ArrowLeft />
                    <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2">
                        View
                    </p>
                </div>
            </div>
            <div className="cursor-pointer text-GrayHomz h-[30px] hover:bg-bgRed hover:text-error rounded-md flex gap-1 items-center px-2  w-full ">
                <div 
                onClick={() => deleteItem(item?._id)}
                className=" flex items-center h-full w-full rounded-md">
                    <DeleteRed />
                    <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2">
                        Delete
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PopUp;
