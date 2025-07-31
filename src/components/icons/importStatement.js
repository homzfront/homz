import React from 'react'

const ImportStatement = ({ className = "#4E4E4E" }) => {
    return (
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.7002 7.91406C16.7002 8.1724 17.9252 9.71406 17.9252 13.0891V13.1974C17.9252 16.9224 16.4336 18.4141 12.7086 18.4141H7.28356C3.55856 18.4141 2.06689 16.9224 2.06689 13.1974V13.0891C2.06689 9.73906 3.27523 8.1974 6.22523 7.9224" stroke={className} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 2.16406V12.8974" stroke={className} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.7918 11.0391L10.0002 13.8307L7.2085 11.0391" stroke={className} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default ImportStatement
