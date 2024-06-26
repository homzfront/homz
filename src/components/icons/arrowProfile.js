import React from 'react'

const ArrowProfile = ({className = "#4E4E4E", classNameTwo = "#292D32"}) => {
    return (
        <div>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.1191 4.45312L14.1658 8.49979L10.1191 12.5465" stroke={className} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" stroke-linejoin="round" />
                <path d="M2.83398 8.5H14.054" stroke={classNameTwo} strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export default ArrowProfile