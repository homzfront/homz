import React, { useState } from "react";
import BashedEye from "@/components/icons/BashedEye";
import Eye from "@/components/icons/Eye";
import Loading from "@/components/mainmenu/loading";


const CreatePassword = ({ password, setPassword, rePassword, setRepassword, handleSubmit, setLoginError, loginError, loading }) => {

  const [visible, setVisible] = useState(false);
  const [visibleII, setVisibleII] = useState(false);

  const Visible = () => {
    setVisible(!visible);
  };

  const VisibleII = () => {
    setVisibleII(!visibleII)
  }

  return (
    <div>
      {
        loading && <Loading />
      }
      <div className="h-[634px] px-6 W-[320px] sm:w-full py-4">
        <div className="flex flex-col gap-6 m-auto  max-w-[450px]">
          <h1 className="text-center w-full  text-[23px] font-[700] text-BlackHomz">
            Create A Tenant Account
          </h1>
          <p className=" text-center w-full mt-[-15px] text-[18px] font-[400] text-GrayHomz">
            Create a password to secure your account
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4">
              <div className="relative flex flex-col gap-2 items-start">
                <label className="text-center text-[14px] font-[500] text-BlackHomz">
                  Password<span className="text-red-600">*</span>
                </label>
                <input
                  className="border w-full sm:w-[450px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
                  type={visible ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError(null); // Reset login error when password field is active again
                  }}
                  placeholder="Create a password"
                  autoComplete="new-password"
                />
                <div className="absolute top-11 right-4" onClick={Visible}>
                  {visible ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <BashedEye className="w-4 h-4" />
                  )}
                </div>
              </div>
              <div className="relative flex flex-col gap-2 items-start">
                <label className="text-center text-[14px] font-[500] text-BlackHomz">
                  Re-enter Password<span className="text-red-600">*</span>
                </label>
                <input
                  className="border w-full sm:w-[450px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
                  type={visibleII ? "text" : "password"}
                  value={rePassword}
                  onChange={(e) => {
                    setRepassword(e.target.value);
                    setLoginError(null); // Reset login error when password field is active again
                  }}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                />
                <div className="absolute top-11 right-4" onClick={VisibleII}>
                  {visibleII ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <BashedEye className="w-4 h-4" />
                  )}
                </div>
              </div>
              {loginError && (
                <span className="mt-[-10px] font[400] text-[13px] text-red-500">
                  {loginError}
                </span>
              )}
            </div>
            <button
              className="bg-BlueHomz mt-3 text-white font-[700] text-[16px] w-full sm:w-[450px] rounded-[4px] h-[47px] hover:bg-white hover:text-BlueHomz hover:border hover:border-BlueHomz"
              type="Submit"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default CreatePassword