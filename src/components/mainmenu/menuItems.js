import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

function capitalizeFirstLetter(word) {
  if (word.length === 0) {
    return word;
  }
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
const MenuItems = ({
  title,
  option1,
  name,
  width,
  items,
  onChange,
  reg,
  errors,
  setSelectedClicked,
  selectedClicked,
  required,
  showError,
  Desktop,
  Mobile
}) => {
//   const { watch, setValue } = useFormContext();
//   const selectedValue = watch(name);
  const widthClass = width ? `sm:w-[${width}]` : "sm:w-full";

//   useEffect(() => {
//     if (!selectedValue) {
//       setSelectedClicked(true);
//     }
//   }, [selectedValue, setSelectedClicked]);
  return (
    <div className={`custom-select-wrapper space-y-2 ${Desktop ? "hidden sm:block" : ""} ${Mobile ? "sm:hidden" : ""}`}>
      <label
        className="text-[14px] font-[500] text-BlackHomz"
        htmlFor={name}
      >
        {title} {required && <span className="text-red-500 text-xs">*</span>}
      </label>
      <br />
      <select
  name={name}
  className={`custom-select h-[43px] md:h-[45px] ${widthClass} p-[4px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]`}
  id={name}
  {...(required ? reg(name, { required: `This is required` }) : reg(name))}
  onChange={onChange}
  onClick={() => setSelectedClicked(false)}
>
  <option value="" disabled selected>
    {option1}
  </option>

  {items &&
    items.map((type, index) => (
      <option key={index} value={type}>
        {typeof type === "string" ? capitalizeFirstLetter(type) : type}
      </option>
    ))}
</select>

      {showError && errors[name] && (
        <p className="italic text-error text-[11px] font-[400]">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default MenuItems;
