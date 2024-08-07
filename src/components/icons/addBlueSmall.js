import React from 'react'

const AddBlueSmall = ({ className = "#006AFF" }) => {
    return (
        <div>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                <path d="M4.5 8.5H12.5" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.5 12.5V4.5" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export default AddBlueSmall