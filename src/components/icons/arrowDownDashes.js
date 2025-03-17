import React from 'react'

const ArrowDownDashes = ({ className = "#4E4E4E" }) => {
    return (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 5.16406H14" stroke={className} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 8.5H12" stroke={className} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6.66406 11.8359H9.33073" stroke={className} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

export default ArrowDownDashes