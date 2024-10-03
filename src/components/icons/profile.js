import React from 'react'

const Profile = ({ className = "#4E4E4E" }) => {
    return (
        <div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.9974 8.0026C9.83834 8.0026 11.3307 6.51022 11.3307 4.66927C11.3307 2.82832 9.83834 1.33594 7.9974 1.33594C6.15645 1.33594 4.66406 2.82832 4.66406 4.66927C4.66406 6.51022 6.15645 8.0026 7.9974 8.0026Z" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.7268 14.6667C13.7268 12.0867 11.1601 10 8.0001 10C4.8401 10 2.27344 12.0867 2.27344 14.6667" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export default Profile