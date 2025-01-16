import React from "react";

const PersonalInfo = ({
  data,
  handlePageChangeTwo
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePageChangeTwo();
  };

  return (
    <div>
      <div className="h-[634px] px-6  sm:W-[320px] sm:w-full py-4">
        <div className="flex flex-col gap-6 m-auto  max-w-[450px]">
          <h1 className="text-center w-full  text-[23px] font-[700] text-BlackHomz">
            Create A Tenant Account
          </h1>
          <p className=" text-center w-full mt-[-15px] text-[18px] font-[400] text-GrayHomz">
            Kindly confirm that your information here is correct before proceeding.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 items-start">
                <label className="text-center text-[14px] font-[500] text-BlackHomz">
                  Email<span className="text-red-600">*</span>
                </label>
                <input
                  className="border w-full sm:w-[450px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
                  type="email"
                  disabled
                  value={data?.tenantEmail}
                  placeholder="CVictor@gmail.com"
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label className="text-center text-[14px] font-[500] text-BlackHomz">
                  Full Name<span className="text-red-600">*</span>
                </label>
                <input
                  className="border w-full sm:w-[450px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
                  type="text"
                  disabled
                  value={data?.tenantFullName}
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            <button
              className="bg-BlueHomz mt-3 text-white font-[700] text-[16px] w-full sm:w-[450px] rounded-[4px] h-[47px] hover:bg-white hover:text-BlueHomz hover:border hover:border-BlueHomz"
              type="Submit"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
