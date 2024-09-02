import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThreeDotsLoader from "@/components/mainmenu/ThreeDotsLoader";
import PromotionHooks from "@/utils/promoteProperty";
import usePropertyPromotionData from "@/store/propertyPromotions";

function CardMenus({
  data,
  handleDelete,
  publish,
  handleDeleteModal,
  handleUnpublished,
  handlePublished,
  setIsMenuOpen,
  refs,
  setStopPromotion,
  setOpenPlanModal,
  promoted,
  setPromotePropertry,
  setErrorModal,
}) {
  const router = useRouter();
  const [isLoading, setLoader] = useState(false);
  const [isPending, startTransition] = useTransition();
  const setPropertyId = usePropertyPromotionData(
    (state) => state.setSinglePropertyId
  );
  const setPropertyPlanType = usePropertyPromotionData(
    (state) => state.setPropertyPlanType
  );

  useEffect(() => {
    if (isPending) {
      return setLoader(true);
    }
    setLoader(false);
  }, [isPending]);

  if (!data) {
    return null;
  }

  const handlePromoteProperty = async () => {
    setLoader(true);
    try {
      const response = await PromotionHooks.checkCurrentSubscription();
      // console.log(response);
      if (response.data === null) {
        localStorage.setItem("prp_tygf2ty", data._id);
        localStorage.setItem("prp_xry_pl#a$n", "single");
        setOpenPlanModal(true);
      } else if (response.message == "An unexpected error occurred.") {
        setLoader(false);
        setErrorModal(true);
      } else {
        if (promoted) {
          setModalIsOpen(true);
          setLoader(false);
        } else {
          setPromotePropertry(true);
          setPropertyId(data._id);
          setPropertyPlanType("single");
          setLoader(false);
        }
      }
    } catch (error) {
      console.error("Error", error.response?.data || error.message);
      return (
        error.response?.data || { message: "An unexpected error occurred." }
      );
    }
  };

  // const toggleModal = () => {
  //   setOpenPromoModal(false);
  // };

  return (
    <div
      className="absolute z-50 md:top-[1.55rem] top-[1rem] right-[5px]  md:right-[6px] mt-2 py-[12px] px-1  w-[217px] bg-white shadow-md rounded-[12px]"
      ref={refs}
    >
      <Link
        href={`/dashboard/list_Property/edit_property/${data?._id}`}
        className=" flex gap-3 items-center text-[14px] font-[500] leading-[21px] text-[#4E4E4E] p-[8px] hover:bg-gray-100 w-full"
      >
        <Image
          src="/static/images/new_edit-2.svg"
          alt=""
          width={16}
          height={16}
          className="h-[13px] w-[13px] md:w-[16px] md:h-[16px] cursor-pointer"
        />
        <span>Edit details</span>
      </Link>
      <button
        className=" flex gap-3 items-center text-[14px] font-[500] leading-[21px] text-[#4E4E4E] p-[8px] hover:bg-gray-100 w-full"
        onClick={(e) => {
          handleDeleteModal(data?._id);
        }}
      >
        <Image
          src="/static/images/black_trash.svg"
          alt=""
          width={16}
          height={16}
          className="h-[13px] w-[13px] md:w-[16px] md:h-[16px] cursor-pointer"
        />
        <span>Delete</span>
      </button>
      <button
        className={` flex gap-3 items-center text-[14px] font-[500] leading-[21px] ${
          publish ? "text-[#D92D20]" : "text-[#006AFF]"
        } p-[8px] hover:bg-gray-100 w-full`}
        onClick={() =>
          publish ? handleUnpublished(data?._id) : handlePublished(data?._id)
        }
      >
        <Image
          src={`/static/images/${publish ? "stop-circle.svg" : "send-2.svg"}`}
          alt=""
          width={16}
          height={16}
          className="h-[13px] w-[13px] md:w-[16px] md:h-[16px] cursor-pointer"
        />
        <span>{publish ? "Unpublish" : "Publish"}</span>
      </button>
      {publish && (
        <div className="">
          {promoted ? (
            <button
              className="w-full flex gap-[10px] h-[37px] md:px-[8px] text-[14px] items-center justify-start rounded-[8px] text-[#DC6803] bg-[#FCF3EB] flex-shrink-0 "
              onClick={() => setStopPromotion(true)}
            >
              <Image
                src="/static/images/orangePromotoStop.svg"
                alt=""
                height={16}
                width={16}
                className=""
              />
              <span>Stop Property promotion</span>
            </button>
          ) : (
            <button
              className={`w-full flex gap-[10px] h-[37px] md:px-[8px] text-[14px] items-center ${
                isLoading ? "justify-center" : "justify-start"
              }  rounded-[8px] text-white bg-[#DC6803] flex-shrink-0 `}
              onClick={handlePromoteProperty}
            >
              {!isLoading ? (
                <>
                  <Image
                    src="/static/images/orange-send.svg"
                    alt=""
                    height={16}
                    width={16}
                    className=""
                  />
                  <span>Promotion options</span>
                </>
              ) : (
                <ThreeDotsLoader color="#ffffff" />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default CardMenus;
