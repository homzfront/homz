"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OwnerLoginForm from "./form/ownerLoginForm";
import useProfileStore from "@/store/profile";
import Login from "./login";
import { acceptInvitation } from "@/api/acceptProManInvitation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Loading from "@/components/mainmenu/loading";
import LoadingII from "@/components/mainmenu/loadingII";

const Accept = () => {
  const [openForm, setOpenForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [dashboard, setDashboard] = useState(false);
  const [loadingII, setLoadingII] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  let urlParams;
  if (typeof window !== 'undefined') {
    const queryString = window.location.search;
    urlParams = new URLSearchParams(queryString);
  } else {
    urlParams = new URLSearchParams();
  }

  const email = urlParams.get("email");
  const role = urlParams.get("role");
  const invitation = urlParams.get("invitation");
  const isHomzEnterprise = urlParams.get("isHomzEnterprise");

  const closeForm = () => {
    setOpenForm(false);
  };

  const { user } = useProfileStore();

  useEffect(() => {
    if (isHomzEnterprise === "true") {
      if (!user) {
        setShowLogin(true);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else {
      setOpenForm(true);
      setData({
        email,
        role,
        invitation,
        isHomzEnterprise
      })
      setLoading(false);
    }
  }, [isHomzEnterprise, user]);

  useEffect(() => {
    if (!user) {
      setShowLogin(!showLogin);
      setLoading(false);
    }
    else {
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = async () => {
    setLoadingII(true);
    try {
      const { success, error } = await acceptInvitation(
        email,
        role,
        invitation,
        isHomzEnterprise
      );

      if (success) {
        setLoadingII(false);
        setDashboard(!dashboard);
      } else {
        setLoadingII(false);
        toast.error(error);
      }
    } catch (error) {
      toast.error("Update error", error);
    }
  };

  return (
    <div className="w-full">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {loadingII && <Loading />}
      {loading ? <LoadingII /> : openForm ? (
        <div>
          <OwnerLoginForm data={data} closeForm={closeForm} />
        </div>
      ) : dashboard ? (
        <div className="w-full mt-20 sm:mt-0 sm:h-screen flex justify-center items-center">
          <div className="max-w-[464px] m-auto bg-white h-[260px] rounded-md shadow-lg">
            <div className="mt-[-10px] md:w-[464px] flex flex-col justify-around p-8 items-center gap-3">
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"
                }
                alt=""
                height={48}
                width={48}
              />
              <h1 className="text-BlackHomz font-[700] text-[20px]">
                Account Created
              </h1>
              <p className="text-[16px] font-[400] text-GrayHomz text-center">
                Your account has successfully been created.
              </p>
              <Link
                href={"/dashboard/property-owner/dashboard"}
                className="h-[48px] rounded-md w-full bg-BlueHomz flex justify-center items-center text-white text-[16px] font-[700]"
              >
                Go to dashboard
              </Link>
            </div>
          </div>
        </div>
      ) : showLogin ? (
        <div className="mt-20 flex justify-center items-center">
          <Login setShowLogin={setShowLogin} />
        </div>
      ) : (
        <div className="w-full mt-20 sm:mt-0 sm:h-screen flex justify-center items-center">
          <div className="h-[260px] sm:h-[340px] w-[340px] sm:w-[580px] border rounded-[12px] flex flex-col items-center p-10 justify-between">
            <Image src={"/Icon.png"} alt="" height={28} width={131} />

            <div className="w-[360px] sm:w-[517px] text-BlackHomz mt-0 sm:mt-2">
              <p className="text-[18px] sm:text-[23px] font-[700] text-center">
                User Role Invite
              </p>
              <p className="mt-1 text-[12px] sm:text-[18px] font-[400] text-center">
                Company’s Name has invited you to their dashboard as a
                viewer/editor.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                className="h-[40px] sm:h-[48px] w-[100px] sm:w-[160px] rounded-[4px] text-[12px] sm:text-[16px] font-[700] text-white bg-Success hover:bg-successBg"
              >
                Accept Invite
              </button>
              <Link href={"/"} className="h-[40px] sm:h-[48px] w-[100px] sm:w-[160px] flex justify-center items-center rounded-[4px] text-[12px] sm:text-[16px] font-[500] text-error border border-error hover:bg-successBg hover:text-white hover:border-none ">
                Decline
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accept;
