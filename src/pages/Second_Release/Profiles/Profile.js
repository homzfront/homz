import Image from "next/image";
import React from "react";

const ProfileCard = () => {
  return (
    <div className="profiles py-[1rem] px-[2rem] adminCellBorders bg-white rounded-[12px] w-max h-[686px]">
      <div className=" flex flex-col items-center justify-center pb-6">
        <div className="relative">
          <div className="">
            <Image
              src={"/static/dashboard/enterprisemanager/tenants/Ellipse 70.png"}
              height={195}
              width={195}
              alt=""
            />
          </div>

          <Image
            src={"/static/images/camera.svg"}
            alt=""
            height={45}
            width={35}
            className="profileIcons p-[8px] rounded-[8px] absolute bottom-[-11px] left-[60px]"
          />

          <Image
            src={"/static/images/trash.svg"}
            alt=""
            height={45}
            width={35}
            className="profileIcons p-[8px] rounded-[8px] absolute bottom-[-11px] left-[106px]"
          />
        </div>
        <h1 className="text-[1.5rem] font-[500]  pt-[1.5rem]">John Doe</h1>
        <p className="text-[14px] font-[500]">{"User.ProfileType"}</p>
      </div>

      <hr
        style={{
          height: "1.5px",
          width: "100%",
          borderWidth: "0",
          background: "rgba(128, 128, 128, 0.3)", // Adjust the opacity here (0.5 for 50% opacity)
        }}
      />

      <div className="flex flex-col gap-y-3 text-sm pt-[1.4rem]">
        <table className="w-full profiles">
          <tbody className="text-left profiles">
            <tr className="border-b">
              <td className="w-6 py-2 ">Email</td>
              <td className="text-gray-700 font-[600] w-6/12 dark:text-white p pl-[5rem] py-2">
                {"User.email"}
              </td>
            </tr>
            <tr className="border-b">
              <td className=" py-2  pr-[3rem]">Phone Number</td>
              <td className="text-gray-700 font-[600] w-6/12 dark:text-white py-2 pl-[5rem]">
                {"User.phone"}
              </td>
            </tr>
            <tr className="border-b">
              <td className="w-6/12 py-2 ">Address</td>
              <td className="text-gray-700 font-[600] w-6/12 dark:text-white py-2 pl-[5rem]">
                {"User.address"}
              </td>
            </tr>
            <tr className="border-b">
              <td className="w-6/12 py-2 ">User Role</td>
              <td className="text-gray-700 font-[600] w-6/12 dark:text-white py-2 pl-[5rem]">
                {"User.role"}
              </td>
            </tr>
            <tr className="border-b">
              <td className="w-6/12 py-2 ">User Access</td>
              <td className="text-gray-700 font-[600] w-6/12 dark:text-white py-2 pl-[5rem]">
                {"User.access"}
              </td>
            </tr>
            <tr className="border-b">
              <td className="w-6/12 py-2 ">Status</td>
              <td className="py-2">
                <div className="flex pl-[5rem] items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      // "User.Status" === "online"
                      //   ? 
                        "bg-green-600"
                        // : "bg-gray-400"
                    }`}
                  ></span>
                  <span
                    className={`text-[12px] ${
                      // "User.Status" === "online"
                      //   ? 
                        "text-green-500"
                        // : "text-gray-400"
                    }`}
                  >
                    {"User.Status"}
                  </span>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className="w-6/12 py-2 ">Latest Login</td>
              <td className="text-gray-700 font-[600] w-6/12 dark:text-white py-2 pl-[5rem]">
                {"User.latest"}
              </td>
            </tr>
            <tr>
              <td className="w-6/12 py-2 ">Last Login</td>
              <td className="text-gray-700 font-[600] w-6/12 dark:text-white py-2 pl-[5rem]">
                {"User.last"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileCard;
