import React from 'react'

const Document = ({ className = "#4E4E4E" }) => {
    return (
        <div>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6693 7.16927V10.5026C14.6693 13.8359 13.3359 15.1693 10.0026 15.1693H6.0026C2.66927 15.1693 1.33594 13.8359 1.33594 10.5026V6.5026C1.33594 3.16927 2.66927 1.83594 6.0026 1.83594H9.33594" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.6693 7.16927H12.0026C10.0026 7.16927 9.33594 6.5026 9.33594 4.5026V1.83594L14.6693 7.16927Z" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.66406 9.16406H8.66406" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.66406 11.8359H7.33073" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export default Document