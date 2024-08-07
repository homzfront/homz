import React from 'react'

const ArrowDownWhite = ({ className = "#EEF5FF" }) => {
    return (
        <div>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.2797 6.4668L8.93306 10.8135C8.41973 11.3268 7.57973 11.3268 7.06639 10.8135L2.71973 6.4668" stroke={className} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
    )
}

export default ArrowDownWhite