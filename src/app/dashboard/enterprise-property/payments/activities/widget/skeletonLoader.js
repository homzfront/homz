import React from "react";

const SkeletonLoader = ({ data }) => {
    const skeletonCount = data ? data : 1;

    return (
        <div className="mt-4 w-full">
            {Array.from({ length: skeletonCount }).map((_, index) => (
                <div key={index} className="w-full flex items-center justify-between mt-8 border-b h-[40px] pb-7 animate-pulse">
                    <div className="w-[80%] flex items-center gap-4">
                        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center gap-2">
                            <div className="hidden w-[32px] h-[32px] rounded-[100%] md:flex items-center justify-center bg-gray-300"></div>
                            <div className="flex flex-col">
                                <p className="w-24 h-4 bg-gray-300 rounded-md"></p>
                                <span className="w-16 h-3 bg-gray-300 rounded-md mt-2"></span>
                            </div>
                        </div>
                    </div>
                    <div className="w-[20%]">
                        <div className="w-16 h-4 bg-gray-300 rounded-md"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
