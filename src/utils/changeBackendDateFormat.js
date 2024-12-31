// function changeBackendDateFormat(inputDate) {
//   if (inputDate === "" || inputDate === null || inputDate === undefined) {
//     return "_______"; // Render the actual name if it exists
//   } else {
//     const date = new Date(inputDate);
//     const day = date.getDate();
//     const monthNames = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     const monthIndex = date.getMonth();
//     const year = date.getFullYear();

//     // Function to add ordinal suffix to day
//     function getOrdinalSuffix(day) {
//       if (day > 10 && day < 20) {
//         return "th";
//       } else {
//         const lastDigit = day % 10;
//         switch (lastDigit) {
//           case 1:
//             return "st";
//           case 2:
//             return "nd";
//           case 3:
//             return "rd";
//           default:
//             return "th";
//         }
//       }
//     }
//     const ordinalSuffix = getOrdinalSuffix(day);
//     const formattedDate = `${day}${ordinalSuffix} ${monthNames[monthIndex]}, ${year}`;

//     return formattedDate;
//   }
// }

// export default changeBackendDateFormat;


function changeBackendDateFormat(dateString) {
  if (!dateString) return ;
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const getOrdinalSuffix = (n) => {
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };
  const formattedDate = `${getOrdinalSuffix(day)} ${month}, ${year}`;
  return formattedDate;
}

export default changeBackendDateFormat;
