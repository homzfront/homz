import React from 'react'

const BankDetails = ({ className = "#4E4E4E" }) => {
    return (
        <div>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.33594 6.17188H14.6693" stroke={className} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 11.5H5.33333" stroke={className} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 11.5H9.66667" stroke={className} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.29594 2.83594H11.7026C14.0759 2.83594 14.6693 3.4226 14.6693 5.7626V11.2359C14.6693 13.5759 14.0759 14.1626 11.7093 14.1626H4.29594C1.92927 14.1693 1.33594 13.5826 1.33594 11.2426V5.7626C1.33594 3.4226 1.92927 2.83594 4.29594 2.83594Z" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export default BankDetails