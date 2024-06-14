"use client";
import useConversationStore from "@/store/useConversationStore";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  const { Data, selectedTenantId } = useConversationStore();

  function getCurrentDate() {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const dateFormatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = dateFormatter.formatToParts(new Date());

    return `${formattedDate[2].value} ${formattedDate[0].value}. ${formattedDate[4].value}`;
  }

  // Example usage:
  const currentDate = getCurrentDate();
  const data = new Date();

  return (
    <div className="sidebar">
      <div className="shadow-lg">
        <div className="relative w-full h-[1024px] p-8 flex flex-col justify-start">
        <Link href={"/dashboard/property-owner/dashboard"}>
          <div>
            <Image
              src={"/Homz_Logo_Blue.png"}
              height={28}
              width={131}
              priority
              alt="img"
            />
          </div>
          </Link>

          {selectedTenantId && (
            <div>
              <div className="flex mt-[80px] gap-2 items-center">
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/notification/add.png"
                  }
                  height={16}
                  width={16}
                  alt=""
                />
                <p className="text-[16px] font-[400] text-BlueHomz">
                  Start New Chat
                </p>
              </div>
              <div className="w-full mt-[20px] bg-blue-100 absolute p-8 left-0">
                <div className="flex items-start gap-4">
                  <Image src={Data.Image} height={40} width={40} alt="" />
                  <div>
                    <p className="text-[14px] font-[500] text-BlackHomz">
                      {Data.Name}
                    </p>
                    <p className="text-[16px] font-[400] text-GrayHomz">
                      You’re welcome
                    </p>
                    <p className="text-[11px] font-[400] text-GrayHomz">
                      {currentDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
