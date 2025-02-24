"use client";
import React, { useState, useEffect } from "react";
import TenantLoginForm from "./(form)/tenantLoginForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingII from "@/components/mainmenu/loadingII";

const Accept = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  let urlParams;
  if (typeof window !== 'undefined') {
    const queryString = window.location.search;
    urlParams = new URLSearchParams(queryString);
  } else {
    urlParams = new URLSearchParams();
  }

  const tenantEmail = urlParams.get("tenantEmail");
  const tenantFullName = urlParams.get("tenantFullName");
  const invitation = urlParams.get("invitation");

  useEffect(() => {
    if (invitation) {
      setData({ tenantEmail, tenantFullName, invitation });
    }
    setLoading(false);

  }, [invitation]);

  useEffect(() => {
    if (tenantEmail) {
      localStorage.setItem("tenantEmail", tenantEmail);
    }
  }, [tenantEmail])


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
      {loading ? <LoadingII /> :
        <div>
          <TenantLoginForm data={data} />
        </div>
      }
    </div>
  );
};

export default Accept;
