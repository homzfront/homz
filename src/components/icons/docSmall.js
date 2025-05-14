import React from 'react'

const DocSmall = ({ className = "#202020" }) => {
    return (
        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 5.5V8C11 10.5 10 11.5 7.5 11.5H4.5C2 11.5 1 10.5 1 8V5C1 2.5 2 1.5 4.5 1.5H7" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 5.5H9C7.5 5.5 7 5 7 3.5V1.5L11 5.5Z" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.5 7H6.5" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.5 9H5.5" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default DocSmall