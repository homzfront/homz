import React from 'react'

const ExportSmall = ({className="#4E4E4E"}) => {
    return (
        <div>
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 5.99844L10.6 1.89844" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.0016 3.9V1.5H8.60156" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.5 1.5H4.5C2 1.5 1 2.5 1 5V8C1 10.5 2 11.5 4.5 11.5H7.5C10 11.5 11 10.5 11 8V7" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export default ExportSmall