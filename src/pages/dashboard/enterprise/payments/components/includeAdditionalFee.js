import CloseSmall from '@/components/icons/closeSmall'
import Ticked from '@/components/icons/ticked'
import UnTicked from '@/components/icons/unTicked'
import React from 'react'

const IncludeAdditionalFee = ({ setShowPop, include, setInclude }) => {
    const [includeHi, setIncludeHi] = React.useState("");
    return (
        <div className="max-h-[600px]">
            <div className="w-[350px] md:w-[500px] h-auto bg-white rounded-[12px] p-6 overflow-y-auto">
                <div className="w-full flex justify-between items-start">
                    <div className="flex flex-col gap-1 w-[85%]">
                        <p className="text-BlackHomz font-[500] text-[14px] md:text-[18px]">
                            Include Additional Fees?
                        </p>
                        <p className="text-GrayHomz font-[400] text-[12px] md:text-sm">
                            Would you like to include your management fee or other charges in this financial statement?
                        </p>
                    </div>
                    <div
                        onClick={() => setShowPop(false)}
                        className="cursor-pointer"
                    >
                        <CloseSmall />
                    </div>
                </div>
                <div className="mt-6 flex gap-2 items-center">
                    <div
                        onClick={() => {
                            setIncludeHi("withFee")
                        }}
                        className="cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            checked={includeHi}
                            onChange={() => {
                                setIncludeHi("withFee")
                            }}
                            className="hidden"
                        />
                        {includeHi === "withFee" ? <Ticked /> : <UnTicked />}
                    </div>
                    <div>
                        <h2 className="text-sm font-normal text-BlackHomz">
                            Yes, include fees
                        </h2>
                    </div>
                </div>
                <div className="mt-2 flex gap-2 items-center">
                    <div
                        onClick={() => {
                            setIncludeHi("withoutFee")
                        }}
                        className="cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            checked={includeHi}
                            onChange={() => {
                                setIncludeHi("withoutFee")
                            }}
                            className="hidden"
                        />
                        {includeHi === "withoutFee" ? <Ticked /> : <UnTicked />}
                    </div>
                    <div>
                        <h2 className="text-sm font-normal text-BlackHomz">
                            No, generate statement without fees
                        </h2>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setInclude(includeHi)
                        setShowPop(false)
                    }}
                    type="button"
                    className={`mt-4 h-[48px] w-full ${includeHi
                        ? "bg-BlueHomz"
                        : "pointer-events-none bg-GrayHomz6"}      
                            rounded-[4px] text-white`}
                >
                    Continue
                </button>
            </div>
        </div>
    )
}

export default IncludeAdditionalFee