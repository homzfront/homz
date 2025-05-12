import ArrowSlim from "@/components/icons/arrowSlim";
import ArrowSlimFlipped from "@/components/icons/arrowSlimFlipped";
import React from "react";

const StatCard = ({
    bgColor,
    title,
    amount,
    percentage,
    isPositive,
    borderColor = "border-gray-300",
    hideCurrencySymbol = false,
    width = "w-auto",
    badgeBg = "bg-green-100",
    iconColor = "text-green-500"
}) => {
    return (
        <div
            className={`relative md:min-w-[250px] h-[100px] md:h-[130px] ${width} p-4 rounded-[8px] border ${borderColor} ${bgColor} flex flex-col justify-between`}
        >
            <div className="flex w-full gap-2 justify-between items-center">
                {/* Title */} 
                <div className="text-[12px] md:text-sm font-medium text-GrayHomz">{title}</div>
                {/* Badge */}
                <div
                    className={`flex items-center gap-1 font-normal text-[10px] md:text-[11px] px-2 py-1 rounded-[4px] ${badgeBg} text-[${iconColor}]`}
                >
                    {isPositive ? (
                        <ArrowSlim className={iconColor} />
                    ) : (
                        <ArrowSlimFlipped className={iconColor} />
                    )}
                    {percentage}
                </div>
            </div>

            {/* Amount */}
            <div className={`text-sm md:text-[20px] font-bold text-BlackHomz`}>
                {!hideCurrencySymbol && <span className="font-sans mr-0.5 font-normal">₦</span>}
                {amount}
            </div>
        </div>
    );
};

export default StatCard;
