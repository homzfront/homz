import React, { useState } from "react";
import PersonalInfo from "./components/personalInfo";
import CreatePassword from "./components/createPassword";
import { acceptEnterpriseInvitation } from "@/api/acceptProManInvitation";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

const Widget = ({ data }) => {
  const [active, setActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [name, setName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('')
  const [rePassword, setRepassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [dashboard, setDashboard] = useState(false);

  const handlePageChange = () => {
    setActive(false);
    setActiveTwo(false);
  };

  const handlePageChangeTwo = () => {
    setActiveTwo(true);
    setActive(true);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (password.length < 8) {
      setLoginError("Password must be at least 8 characters long.");
    } else if (password !== rePassword) {
      setLoginError("Passwords do not match.");
    } else {
      setLoading(true);
      const { email, role, invitation, isHomzEnterprise } = data;
      try {
        const { success, upDateddata, error } = await acceptEnterpriseInvitation(
          email,
          role,
          invitation,
          isHomzEnterprise,
          name,
          phonenumber,
          password,
          rePassword
        );

        if (success) {
          const  data = upDateddata?.data?.token;
          localStorage.setItem('jwt', data)
          setLoading(false);
          setDashboard(true);
          // toast.success(upDateddata?.message);
        } else {
          setLoading(false);
          toast.error(error);
        }
      } catch (error) {
        toast.error("Update error", error);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {
        dashboard &&
          <div className="absolute  inset-0 z-50 w-full mt-20 sm:mt-0 sm:h-screen flex justify-center items-center bg-black bg-opacity-30">
            <div className="max-w-[464px] m-auto bg-white h-[260px] rounded-md shadow-lg">
              <div className="mt-[-10px] w-[464px] flex flex-col justify-around p-8 items-center gap-3">
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
          }
          <div className="sm:w-full w-[360px] h-auto">
            <div className="h-auto  flex justify-center">
              <div className="z-0 absolute w-[360px] sm:w-[440px] pr-[92px] pl-[96px] py-[27px]">
                <div className="border-[1px]"></div>
              </div>
              <div className="z-1 relative flex mt-5 gap-4 justify-between items-center px-8  w-[360px] sm:w-[440px]">
                <div className="flex flex-col items-center gap-2 justify-center">
                  <div
                    className={`flex flex-col items-center p-2 justify-center ${!active
                      ? " bg-white rounded-full  w-1 h-1 shadow-md "
                      : "h-1 w-1"
                      }`}
                    onClick={handlePageChange}
                  >
                    <div
                      className={`rounded-full w-[1px] h-[1px] cursor-pointer bg-BlueHomz p-1 text-[14px] font-[500] text-center`}
                    ></div>
                  </div>
                  <p className="text-[14px] font-400">Personal Information</p>
                </div>

                <div className="flex flex-col items-center gap-2 justify-center">
                  <div
                    className={`flex flex-col p-2 items-center justify-center ${activeTwo
                      ? " bg-white rounded-full  w-1 h-1 shadow-md "
                      : "h-1 w-1"
                      }`}
                    onClick={handlePageChangeTwo}
                  >
                    <div
                      className={`rounded-full w-[1px] h-[1px] cursor-pointer bg-BlueHomz p-1 text-[14px] font-[500] text-center`}
                    ></div>
                  </div>
                  <p className="text-[14px] font-400">Create password</p>
                </div>
              </div>
            </div>
            <div className=" my-5  rounded-[12px]">
              <div className={`${!active ? "inline" : "hidden"}`}>
                <PersonalInfo
                  data={data}
                  name={name}
                  setName={setName}
                  phonenumber={phonenumber}
                  setPhoneNumber={setPhoneNumber}
                  handlePageChangeTwo={handlePageChangeTwo}
                />
              </div>
              <div className={`${activeTwo ? "inline" : "hidden"}`}>
                <CreatePassword
                  password={password}
                  setPassword={setPassword}
                  rePassword={rePassword}
                  setRepassword={setRepassword}
                  handleSubmit={handleSubmit}
                  setLoginError={setLoginError}
                  loginError={loginError}
                  loading={loading}
                />
              </div>
            </div>
          </div>
    </div>
  );
};

export default Widget;
