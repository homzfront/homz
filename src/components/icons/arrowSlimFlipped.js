import React from 'react'

const ArrowSlimFlipped = ({ className = "#D92D20" }) => {
    return (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.63135 7.715L6.66635 10.75L9.70135 7.715" stroke={className} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.6665 2.25V10.665" stroke={className} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default ArrowSlimFlipped
