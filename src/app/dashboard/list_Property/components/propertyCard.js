"use client";
import React, { useState, useEffect, useRef, useReducer } from "react";
import PromotionHooks from "@/utils/promoteProperty";
import ConfirmationModal from "@/components/mainmenu/ConfirmationModal";
import SuccessModal from "@/components/mainmenu/SuccessModal";
import useIsMobile from "@/components/mainmenu/useMobileView";
import PropertyInfo from "./propertyInfo";
import usePropertyPromotionsData from "@/store/propertyPromotions";
import Confirm from "@/components/mainmenu/actionModal";
import {
  publishAndRepublishProperty,
  removeProperty,
} from "@/api/propertyService";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Autoplay, Navigation } from "swiper/modules";

const initialState = {
  publishedSuccess: false,
  unpublishedSuccess: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "Property publish status updated to published":
      return {
        ...state,
        publishedSuccess: true,
        unpublishedSuccess: false,
      };
    case "Property publish status updated to unpublished":
      return {
        ...state,
        publishedSuccess: false,
        unpublishedSuccess: true,
      };
    case "Close Modal":
      return {
        ...state,
        publishedSuccess: false,
        unpublishedSuccess: false,
      };
    default:
      return state;
  }
};
const PropertyCard = ({
  Property,
  selectedProperty,
  setSelectedProperty,
  promoteOptions,
  refreshData,
  setOpenPlanModal,
  // setPromotePropertry,
  setErrorModal,
  setTabName,
  pageManagement,
  metric,
  partOfTheDashboard,
}) => {
  const ITEMS_PER_PAGE = 8;
  const singlePropertyId = usePropertyPromotionsData((state) => state.singleId);
  const propertyPlan = usePropertyPromotionsData(
    (state) => state.propertyPlanType
  );
  const [publish, setPublish] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = Math.ceil(Property?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProperties = Array.isArray(Property)
    ? Property.slice(startIndex, endIndex)
    : [];
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePromo, setActivePromoted] = useState(false);
  const [notPublished, setNotPublished] = useState(false);
  const [deleteProperty, setDeleteProperty] = useState(false);
  const [propertyDeleted, setPropertyDeleted] = useState(false);
  const [publishProperty, setPublisProperty] = useState(false);
  const [stopPromote, setStopPromotion] = useState(false);
  const [unpromoteProperty, setUnpromoteProperty] = useState(false);
  const [promotionStoppedModal, setPromotionStoppedModal] = useState(false);
  const [isLoading, setLoader] = useState(false);
  let unpublishedText =
    "This property will no longer be visible to the public but will be saved in your drafts";
  let publishedText = "This property will be made visible to the public.";
  const popUp = useRef(null);

  const [publishState, dispatch] = useReducer(reducer, initialState);
  const isMobile = useIsMobile();
  const [promoteProperty, setPromotePropertry] = useState(false);
  const [promotePropertySuccess, setPromotePropertrySuccess] = useState(false);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: false,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    speed: 2000,
    autoplaySpeed: 2000,
    // centerMode: true,
    centerPadding: "10px",
    className: "center",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.5,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          centerPadding: "30px",
        },
      },
    ],
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     const clickedOutsidePopup =
  //       popUp.current && !popUp.current.contains(event.target);

  //     const clickedInsideSwiper = event.target.closest(".swiper");

  //     if (clickedOutsidePopup && !clickedInsideSwiper) {
  //       setIsMenuOpen(false);
  //     }
  //   };

  //   if (isMenuOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isMenuOpen]);

  // const refreshData = async (stat) => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const pageNumber = urlParams.get("page");
  //   const res = await filterData(pageNumber, stat);
  //   if (stat === "all" && res?.data?.totalCount === 0) {
  //     sessionStorage.setItem("initialDataStatus", false); // Set to false if no data
  //   }
  // };
  const handlePropertyPromotion = async () => {
    setLoader(true);
    var status = false;

    const propertyId = singlePropertyId || id;
    const promotionPlan = propertyPlan || plan;
    const promotionDate = new Date().toISOString().split("T")[0];

    try {
      const results = await PromotionHooks.promoteProperty(
        promotionDate,
        propertyId,
        promotionPlan,
        selectedProperty
      );
      // console.log(results);
      setLoader(false);

      if (results?.status) {
        setPromotePropertrySuccess(true);

        status = true;
      } else if (
        results?.message ===
        "You have reached the limit of the listings for your current plan."
      ) {
        setLimitModal(true);
      } else if (results.message === "Network Error") {
        setErrorModal(true);
      }
      setPromotePropertry(false);
    } catch (error) {
      console.error("Error promoting the property:", error);
      setLoader(false);
      status = false;
    }
    return status;
  };

  const closePromotionModal = () => {
    const params = getParams();
    refreshData(params.propertyStatus);
    setPromotePropertrySuccess(false);
  };
  const handleCheckboxChange = (propertyId, is_promoted, is_published) => {
    if (!is_published) {
      setSelectedDataId(propertyId);
      setNotPublished(true);
      return;
    }
    if (is_promoted) {
      setActivePromoted(true);
      return;
    }
    setSelectedProperty((prevSelected) =>
      prevSelected.includes(propertyId)
        ? prevSelected.filter((item) => item !== propertyId)
        : [...prevSelected, propertyId]
    );
  };
  const handleDeleteProperty = () => {
    setLoader(true);
    removeProperty(selectedDataId)
      .then((result) => {
        setLoader(false);
        setDeleteProperty(false);
        setPropertyDeleted(true);
      })
      .catch((error) => {
        setLoader(false);
        setDeleteProperty(false);
        setErrorModal(true);
        // console.log(error);
      });
  };
  const handlePublishedUnpublishProperty = async () => {
    setLoader(true);
    publishAndRepublishProperty(selectedDataId)
      .then((result) => {
        dispatch({ type: result.message });
        setPublisProperty(false);
        setNotPublished(false);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        setPublisProperty(false);
        setErrorModal(true);
        console.error("Error publishing this property:", error);
      });
  };
  const getParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page");
    const propertyStatus = urlParams.get("propertystatus");
    return {
      page: page ? parseInt(page) : 1,
      propertyStatus: propertyStatus ? propertyStatus : "all",
    };
  };
  const closePublishedSuccessModal = () => {
    const params = getParams();
    dispatch({ type: "Close Modal" });
    setTabName("unpublished");

    pageManagement(params.page, "unpublished");
    refreshData("unpublished");
  };
  const closeModal = () => {
    const params = getParams();
    refreshData(params.propertyStatus);
    setTabName(params.propertyStatus);
    dispatch({ type: "Close Modal" });

    pageManagement(params.page, params.propertyStatus);
  };
  const handleStopPropertyPromotion = async (type) => {
    setLoader(true);
    try {
      const results = await PromotionHooks.stopSinglePromotion(selectedDataId);

      if (results.status === true) {
        if (type === "unpublish") {
          setPublisProperty(true);
          setUnpromoteProperty(false);
        } else if (type === "stopPromotion") {
          setPromotionStoppedModal(true);
          setStopPromotion(false);
        }
      } else {
        setErrorModal(true);

        if (type === "stopPromotion") {
          setStopPromotion(false);
        } else if (type === "unpublish") {
          setUnpromoteProperty(false);
        }
        // return;
      }
    } catch (error) {
      console.error("Error stopping the promotion:", error);
      setErrorModal(true);

      if (type === "stopPromotion") {
        setStopPromotion(false);
      } else if (type === "unpublish") {
        setUnpromoteProperty(false);
      }
    } finally {
      setLoader(false);
    }
  };

  const closeSuccessModal = () => {
    const params = getParams();
    setPropertyDeleted(false);
    refreshData(params.propertyStatus);
    setActivePromoted(false);
    setNotPublished(false);
    setPromotionStoppedModal(false);
  };

  const handleDeleteModal = (propertyId) => {
    setSelectedDataId(propertyId);
    setDeleteProperty(true);
  };
  const handleUnpublished = (propertyId, promoted) => {
    setSelectedDataId(propertyId);
    if (promoted) {
      setUnpromoteProperty(true);
    } else {
      setPublisProperty(true);
    }
  };
  const handlePublished = (propertyId) => {
    setSelectedDataId(propertyId);
    setPublisProperty(true);
  };

  const handleMenuToggle = (index) => {
    setSelectedDataId(index);
    setIsMenuOpen(!isMenuOpen);
  };

  const getGridClass = (partOfTheDashboard) => {
    if (partOfTheDashboard === "mostViewed") return "md:grid-cols-1 gap-3";
    if (partOfTheDashboard === "viewAll")
      return "sm:grid-cols-4 sm:gap-0 gap-5";
    return "sm:grid-cols-4 gap-5";
  };

  const getDisplayedProperties = (props, part) => {
    // if (part === "mostViewed") return props.slice(0, 2);
    if (part === "viewAll") return props.slice(0, 4);
    return props;
  };

  const displayedProperties = getDisplayedProperties(
    currentProperties,
    partOfTheDashboard
  );
  return (
    // <>
    <div
      className={`w-full ${
        metric ? "mt-2" : "mt-6"
      }  md:justify-center md:items-center h-fit`}
    >
      {/* Desktop & Tablet View */}
      <div
        className={`${metric && isMobile ? "hidden" : "grid"}  ${getGridClass(
          partOfTheDashboard
        )} grid-cols-1 h-fit`}
      >
        {displayedProperties.map((property, index) => (
          <PropertyInfo
            property={property}
            selectedProperty={selectedProperty}
            promoteOptions={promoteOptions}
            setOpenPlanModal={setOpenPlanModal}
            setPromotePropertry={setPromotePropertry}
            setErrorModal={setErrorModal}
            metric={metric}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            handleCheckboxChange={handleCheckboxChange}
            handleDeleteModal={handleDeleteModal}
            handleUnpublished={handleUnpublished}
            handlePublished={handlePublished}
            handleMenuToggle={handleMenuToggle}
            setSelectedDataId={setSelectedDataId}
            setStopPromotion={setStopPromotion}
            selectedDataId={selectedDataId}
            publish={publish}
            popUp={popUp}
            setPublish={setPublish}
            key={index}
          />
        ))}
      </div>

      <div className={`${metric && isMobile ? "block" : "hidden"} `}>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={2}
          grabCursor={true}
          navigation
          className="w-full"
        >
          {displayedProperties.map((property, index) => (
            <SwiperSlide key={index}>
              <PropertyInfo
                property={property}
                selectedProperty={selectedProperty}
                promoteOptions={promoteOptions}
                setOpenPlanModal={setOpenPlanModal}
                setPromotePropertry={setPromotePropertry}
                setErrorModal={setErrorModal}
                metric={metric}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                handleCheckboxChange={handleCheckboxChange}
                handleDeleteModal={handleDeleteModal}
                handleUnpublished={handleUnpublished}
                handlePublished={handlePublished}
                handleMenuToggle={handleMenuToggle}
                setSelectedDataId={setSelectedDataId}
                setStopPromotion={setStopPromotion}
                selectedDataId={selectedDataId}
                publish={publish}
                popUp={popUp}
                setPublish={setPublish}
                key={index}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Delete a property */}

      <Confirm
        title="Property is Actively Promoted"
        description="Stop promotion before unpublishing. Do you want to proceed?"
        action1={() => handleStopPropertyPromotion("unpublish")}
        action2={() => setUnpromoteProperty(false)}
        isOpen={unpromoteProperty}
        loader={isLoading}
        action1Title="Proceed"
      />
      <ConfirmationModal
        isOpen={deleteProperty}
        title="Delete Property?"
        confirmatoryText={`This property will be permanently removed`}
        handleEvent={handleDeleteProperty}
        cancel={() => {
          setLoader(false);
          setDeleteProperty(false);
        }}
        optionText="Proceed"
        optionText2="Cancel"
        color="text-[#D92D20]"
        isLoading={isLoading}
      />
      <SuccessModal
        isOpen={propertyDeleted}
        title="Property Deleted Successfully"
        handleEvent={closeSuccessModal}
      />
      <SuccessModal
        isOpen={activePromo}
        title="This property is already promoted"
        handleEvent={() => setActivePromoted(false)}
      />

      <Confirm
        title="This property must be published to promote."
        description="Publish the property to promote it. Would you like to proceed?"
        action1={handlePublishedUnpublishProperty}
        action2={() => setNotPublished(false)}
        isOpen={notPublished}
        loader={isLoading}
        action1Title="Proceed"
      />

      {/* Unpublish a property */}
      <ConfirmationModal
        isOpen={publishProperty}
        title={`${publish ? "Unpublish Property?" : "Publish Property?"}`}
        confirmatoryText={`${publish ? unpublishedText : publishedText}`}
        handleEvent={handlePublishedUnpublishProperty}
        cancel={() => {
          setLoader(false);
          setPublisProperty(false);
        }}
        optionText="Proceed"
        optionText2="Cancel"
        isLoading={isLoading}
        // color="text-[#D92D20]"
      />
      <SuccessModal
        isOpen={
          publishState.unpublishedSuccess || publishState.publishedSuccess
        }
        title={
          publishState.unpublishedSuccess
            ? "Property Unpublished Successfully"
            : "Property Published Successfully"
        }
        handleEvent={closeModal} //close modal button
        optionTextnbutton={
          publishState.unpublishedSuccess ? "View Unpublished" : undefined
        }
        handleOptionButton={
          //close and view unpublished modal
          publishState.unpublishedSuccess
            ? closePublishedSuccessModal
            : undefined
        }
        buttonColor={publishState.unpublishedSuccess ? true : undefined}
      />

      {/* stop property promotion */}
      <ConfirmationModal
        isOpen={stopPromote}
        title="Stop Promotion?"
        confirmatoryText="This property will no longer be promoted on Homz"
        handleEvent={() => handleStopPropertyPromotion("stopPromotion")}
        cancel={() => {
          setLoader(false);
          setStopPromotion(false);
        }}
        optionText="Proceed"
        optionText2="Cancel"
        isLoading={isLoading}
        // color="text-[#D92D20]"
      />
      <SuccessModal
        isOpen={promotionStoppedModal}
        title="Promotion Stopped Successfully"
        handleEvent={closeSuccessModal}
      />

      <ConfirmationModal
        isOpen={promoteProperty}
        title="Promote Property?"
        confirmatoryText="You are about to promote this property on Homz"
        handleEvent={handlePropertyPromotion}
        cancel={() => {
          setLoader(false);
          setPromotePropertry(false);
        }}
        optionText="Proceed"
        optionText2="Cancel"
        isLoading={isLoading}
        // color="text-[#D92D20]"
      />
      <SuccessModal
        isOpen={promotePropertySuccess}
        title="Promotion is Active"
        handleEvent={closePromotionModal}
        successText="Your promotion is currently running for this property"
        // optionalText="View listed properties"
      />
    </div>
  );
};

export default PropertyCard;

{
  /* <Slider {...settings} className="w-full rounded-[24px] space-x-3">
          {displayedProperties.map((property, index) => (
            <div key={index} className="w-full">
              <PropertyInfo
                property={property}
                selectedProperty={selectedProperty}
                promoteOptions={promoteOptions}
                setOpenPlanModal={setOpenPlanModal}
                setPromotePropertry={setPromotePropertry}
                setErrorModal={setErrorModal}
                metric={metric}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                handleCheckboxChange={handleCheckboxChange}
                handleDeleteModal={handleDeleteModal}
                handleUnpublished={handleUnpublished}
                handlePublished={handlePublished}
                handleMenuToggle={handleMenuToggle}
                setSelectedDataId={setSelectedDataId}
                setStopPromotion={setStopPromotion}
                selectedDataId={selectedDataId}
                publish={publish}
                popUp={popUp}
                setPublish={setPublish}
                key={index}
              />
            </div>
          ))}
        </Slider> */
}
