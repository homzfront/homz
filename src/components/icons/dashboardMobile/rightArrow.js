import React from 'react'

const RightArrow = ({ className = "text-GrayHomz" }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M7.42188 16.6004L12.8552 11.1671C13.4969 10.5254 13.4969 9.47539 12.8552 8.83372L7.42188 3.40039" stroke="#4E4E4E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

export default RightArrow