// "use client";
// import React, { useState } from "react";

// const DropDown = () => {
//   const options = [
//     { id: 1, label: "Property Management" },
//     { id: 2, label: "Property Listing" },
//     { id: 3, label: "Enterprise Solution" },
//     { id: 4, label: "Renter Management" },
//     // Add more options as needed
//   ];

//   const [formData, setFormData] = useState({
//     document_options: options[0].label, // Default value is the first option
//   });

//   const [isDropdownOpen, setDropdownOpen] = useState(false);

//   const handleDropdownChange = (value) => {
//     setFormData({ ...formData, document_options: value });
//     setDropdownOpen(false);
//   };

//   return (
//     <div className="mt-10 ml-4">
//       <div className="relative">
//         <div
//           className={`text-BlackHomz px-4 h-[45px] border text-[16px] max-w-[780px] font-[500] mb-1 p-2 rounded cursor-pointer ${
//             isDropdownOpen ? "border" : ""
//           }`}
//           onClick={() => setDropdownOpen(!isDropdownOpen)}
//         >
//           <div className="flex justify-between items-center">
//             <span className="mr-2">{formData.document_options}</span>
//             <svg
//               className={`w-5 h-5 ${isDropdownOpen ? "transform rotate-180 transition duration-1000  ease-in-out" : ""}`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M19 9l-7 7-7-7"
//               ></path>
//             </svg>
//           </div>
//         </div>
//         {isDropdownOpen && (
//           <div className="absolute left-0 mt-2 w-full max-w-[780px] transition duration-1000  ease-in-out  bg-white border rounded shadow-lg">
//             {/* Dropdown Options */}
//             {options.map((option) => (
//               <div
//                 key={option.id}
//                 className="cursor-pointer p-2 m-2 hover:rounded-md hover:text-white hover:bg-BlueHomz"
//                 onClick={() => handleDropdownChange(option.label)}
//               >
//                 {option.label}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DropDown;
