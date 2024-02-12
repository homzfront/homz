import React from "react";

const Resolved = ({ data }) => {
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Function to add ordinal suffix to day
    function getOrdinalSuffix(day) {
      if (day > 10 && day < 20) {
        return "th";
      } else {
        const lastDigit = day % 10;
        switch (lastDigit) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      }
    }

    const ordinalSuffix = getOrdinalSuffix(day);
    const formattedDate = `${day}${ordinalSuffix} ${monthNames[monthIndex]}, ${year}`;

    return formattedDate;
  }

  const smallLetter = (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  return (
    <div>
      <div className="text-[13px] font-[500] text-BlackHomz flex px-8 py-4 bg-walletBg">
        <p className="w-[180px]">Subject</p>
        <p className="w-[180px]">Request Date</p>
        <p className="w-[180px]">Status</p>
      </div>
      <div className="">
        {data &&
          data?.map(
            (data) =>
              smallLetter(data?.status) === "resolved" && (
                <div
                  key={data?._id}
                  className={`text-[11px] font-[400] text-GrayHomz flex px-8 py-4 border-b`}
                >
                  <p className="w-[180px]">{data?.subject}</p>
                  <p className="w-[180px]">{formatDate(data?.requestDate)}</p>
                  <p className="w-[180px] ">
                    <span
                      className={`px-3 py-1 rounded-[8px] bg-successBg text-Success`}
                    >
                      {" "}
                      Resolved
                    </span>
                  </p>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default Resolved;
