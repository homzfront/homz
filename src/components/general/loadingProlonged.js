import React from 'react'
import Close from '../icons/Close'

const LoadingProlonged = ({ closeModal }) => {
    return (
        <div>
            <div className="flex gap-1 max-w-[80vw] md:max-w-[30vw] bg-white rounded-md p-4">
                <p className="text-center font-[700] text-BlackHomz text-[16px] mt-4">
                    This is taking a bit longer than expected. Please bear with us for a few more seconds. If the issue persists, consider checking your internet connection.
                </p>
                <div className="flex justify-end w-[40px]">
                    <button
                        onClick={closeModal}
                        className="p-2 h-[40px] border rounded-[4px] "
                        aria-label="Close"
                    >
                        <Close />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoadingProlonged