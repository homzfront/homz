import React from "react";
import CardMenus from "./cardMenu";
import Image from "next/image";
import Link from "next/link";
// import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import formatDate from "@/utils/formatDate";

const PropertyInfo = ({
  property,
  selectedProperty,
  promoteOptions,
  setOpenPlanModal,
  setPromotePropertry,
  setErrorModal,
  isMenuOpen,
  setIsMenuOpen,
  handleCheckboxChange,
  handleDeleteModal,
  handleUnpublished,
  handlePublished,
  handleMenuToggle,
  setSelectedDataId,
  setStopPromotion,
  selectedDataId,
  publish,
  popUp,
  setPublish,
  metric,
}) => {
  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };
  // console.log(property);
  return (
    <div
      className={`relative flex ${
        metric
          ? "sm:flex-row flex-col sm:h-[167px]  bg-[#F6F6F6] border border-[#E6E6E6] sm:py-3 sm:px-2 items-center gap-1.5 "
          : "flex-col h-[361px] sm:h-[317px] md:w-[234px]"
      } w-full rounded-[12px] shadow-md`}
    >
      <div
        className={`cursor-pointer w-full ${
          metric
            ? "sm:h-[130px] sm:w-[138px] h-[212px]"
            : "sm:h-[168px] w-full h-[212px] sm:w-[234px]"
        }    rounded-[12p] `}
      >
        <div
          className={` relative ${
            metric
              ? "sm:h-[130px] sm:w-[138px] h-[212px]"
              : "sm:h-[168px] w-full h-[212px]"
          }  `}
        >
          <Link
            className="cursor-pointer text-[14px] h-full w-full"
            href={`/dashboard/list_Property/PreviewProperty/${property?._id}`}
          >
            <Image
              src={
                property?.coverPhoto?.url
                  ? property?.coverPhoto.url
                  : "/static/images/comingSoonImage.svg"
              }
              alt=""
              width={264}
              height={168}
              className={` h-full w-full object-cover relative z-0 ${
                metric ? "rounded-[12px]" : "rounded-t-[12px]"
              } `}
            />
          </Link>

          {/* <p className="bg-[#CDEADD] rounded-full w-[24px] h-[24px] absolute  left-[305px] md:left-[205px] flex items-center justify-center top-[14px] ">
                  <Image
                    src="/static/images/green_verify.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </p> */}
          {property?.is_published && (
            <p
              className={` ${
                metric ? "sm:hidden block" : "sm:block"
              } bg-[#CDEADD] text-[#039855] rounded-[8px] py-[4px] px-[8px] absolute left-[75%] md:left-[150px] top-[14px] text-[11px] leading-[16.5px] font-[400]`}
            >
              Published
            </p>
          )}

          {/* <p className="bg-[#DC6803] text-[#FCF3EB] rounded-[8px] py-[4px] px-[8px] absolute left-[96px] top-[12px] text-[11px] leading-[16.5px] font-[400]">Undergoing Review</p> */}
          {/* <p className="text-[#DC6803] bg-[#FCF3EB] rounded-[8px] py-[4px] px-[8px] absolute left-[250px] md:left-[165px] top-[14px] text-[11px] leading-[16.5px] font-[400]">Drafts</p> */}
          {/* <p className="bg-[#FDF2F2] text-[#D92D20] rounded-[8px] py-[4px] px-[8px] absolute left-[215px] md:left-[120px] top-[14px] text-[11px] leading-[16.5px] font-[400]">Unpublished</p> */}
        </div>
      </div>
      <div className="flex flex-col w-full px-2 py-5 md:pt-2 gap-[5px] md:gap-[2px] h-fit rounded-b-[12px]">
        <div className="flex justify-between items-center mb-2 text-[11px] md:text-[16px]">
          <Link
            href={`/dashboard/list_Property/PreviewProperty/${property?._id}`}
            className="text-[#006AFF] font-[700] leading-[13.86px] md:leading-[24px] text-left text-[16px]"
            title={property?.name ? property?.name : property?.title}
          >
            {truncateText(
              property?.name ? property?.name : property?.title,
              18
            )}
          </Link>
          <div className="relative">
            <Image
              src="/static/images/verticatDotsIcon.svg"
              alt=""
              width={20}
              height={20}
              className="h-[15px] w-[15px] md:w-[20px] md:h-[20px] cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                handleMenuToggle(property?._id);
                setPublish(property?.is_published);
              }}
            />
            {isMenuOpen && selectedDataId === property?._id && (
              <CardMenus
                data={property}
                publish={publish}
                handleDeleteModal={handleDeleteModal}
                handleUnpublished={handleUnpublished}
                handlePublished={handlePublished}
                setIsMenuOpen={setIsMenuOpen}
                refs={popUp}
                promoted={property?.is_promoted}
                setStopPromotion={setStopPromotion}
                setOpenPlanModal={setOpenPlanModal}
                setPromotePropertry={setPromotePropertry}
                setErrorModal={setErrorModal}
                metric={metric}
              />
            )}
          </div>
        </div>

        <p className="flex gap-1 items-center">
          <Image
            src="/static/images/Location_Vector.svg"
            alt=""
            width={12}
            height={15.85}
            className="h-[12px] w-[12px] md:w-[12px] md:h-[15.85px] "
          />
          <span className="text-[11px] font-[500]">
            {`${property?.area}, ${property?.state}`}
          </span>
        </p>
        <div className="flex justify-between items-center">
          <p className=" md:font-[700] leading-[11.34px] font-[500] md:leading-[13.86px]  font-['Plus Jakarta Sans'] text-[11px] flex items-center ">
            <Image
              src="/static/images/nairaIcon.svg"
              alt=""
              width={17}
              height={25}
              className="h-[12px] w-[12px] md:w-[15px] md:h-[25px]"
            />
            <span className="pl-1">
              {Number(property?.price).toLocaleString()}{" "}
            </span>
            {/* <span className="text-[16px] font-[400] md:text-[18px] md:font-[500] ml-1 pt-1 text-[#4E4E4E]">
              {capitalizeFirstLetter(property?.paymentType)}
            </span> */}
          </p>
        </div>
        <p
          className={`
                        text-[13px] md:text-[11px] 
                        flex items-center gap-1.5 justify-start 
                        leading-[16.5px] 
                        ${
                          property?.is_promoted ||
                          property?.is_promoted === null
                            ? "mt-0"
                            : "mt-4"
                        }
                      `}
        >
          <span className="text-[#A9A9A9] font-[400]">
            {"Added: " +
              formatDate(
                property?.createdAt,
                metric && window.innerWidth >= 640
              )}
          </span>

          {metric && (
            <span className="flex items-center gap-[4px]">
              <Image
                src="/static/images/black-eye.svg"
                alt="Views icon"
                width={10}
                height={10}
              />
              <span className="text-[11px] font-[400] text-[#4E4E4E]">
                {property?.totalViews}
              </span>
            </span>
          )}
        </p>

        <div className="flex gap-2 mt-2">
          {property?.is_published && property?.is_promoted && (
            <button
              className="border w-fit border-[#006AFF] bg-[#EEF5FF] py-[2px] px-[6px] rounded-[4px] flex items-center gap-[2px]"
              onClick={() => {
                setSelectedDataId(property?._id);
                setStopPromotion(true);
              }}
            >
              <Image
                src="/static/images/medal-star.svg"
                alt=""
                width={10}
                height={10}
              />
              <span className="font-[500] text-[11px] text-[#006AFF] leading-[16.5px]">
                Promoted
              </span>
            </button>
          )}

          {metric === true && (
            <div className="sm:flex gap-2 items-center justify-center hidden">
              {property?.is_published && (
                <p className="bg-[#CDEADD] text-[#039855] rounded-[4px] py-[4px] px-[8px] top-[14px] text-[11px] leading-[16.5px] font-[400]">
                  Published
                </p>
              )}
              {property?.is_verified && (
                <p className="bg-[#CDEADD] rounded-full w-[24px] h-[24px] flex items-center justify-center top-[14px] ">
                  <Image
                    src="/static/images/green_verify.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </p>
              )}
            </div>
          )}
        </div>
        {/* ) : (
                <p className="border w-fit border-[#DC6803] bg-[#FCF3EB] font-[500] text-[11px] py-[2px] px-[6px] rounded-[4px] flex items-center gap-[2px] leading-[16.5px] text-[#DC6803]">
                  <Image
                    src="/static/images/orangePromote.svg"
                    alt=""
                    width={10}
                    height={10}
                  />
                  <span className="md:inline-block hidden" >Promotion in review</span>
                  <span className=" md:hidden" >In review</span>
                </p> */}
      </div>
      {promoteOptions && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex items-center justify-center rounded-[12px] ">
          <label
            className="absolute  top-[12px] left-[15px] flex items-center rounded-full cursor-pointer"
            htmlFor={`checkbox-${index}`}
          >
            <input
              type="checkbox"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#D0D5DD] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 bg-[#FFFFFF] before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-[#EEF5FF] checked:before:bg-[#FFFFFF] hover:before:opacity-2"
              id={`checkbox-${index}`}
              onChange={() =>
                handleCheckboxChange(
                  property?._id,
                  property?.is_promoted,
                  property?.is_published
                )
              }
              checked={selectedProperty.includes(property._id)}
            />
            <span className="absolute text-BlueHomz transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
        </div>
      )}
    </div>
  );
};

export default PropertyInfo;
