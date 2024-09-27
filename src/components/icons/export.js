import React from 'react'

const Export = ({className = "#EEF5FF"}) => {
    return (
        <div>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.66406 7.83385L14.1307 2.36719" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.6687 5.03594V1.83594H11.4688" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.33594 1.83594H6.0026C2.66927 1.83594 1.33594 3.16927 1.33594 6.5026V10.5026C1.33594 13.8359 2.66927 15.1693 6.0026 15.1693H10.0026C13.3359 15.1693 14.6693 13.8359 14.6693 10.5026V9.16927" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export default Export