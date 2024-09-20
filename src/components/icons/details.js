import React from 'react'

const Details = ({ className = "#4E4E4E" }) => {
    return (
        <div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.33594 8.40625H12.6693" stroke={className} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.6693 6.85385V11.6205C12.6493 13.5205 12.1293 14.0005 10.1493 14.0005H3.85596C1.84262 14.0005 1.33594 13.5005 1.33594 11.5139V6.85385C1.33594 5.05385 1.75594 4.47385 3.33594 4.38052C3.49594 4.37385 3.66929 4.36719 3.85596 4.36719H10.1493C12.1626 4.36719 12.6693 4.86719 12.6693 6.85385Z" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.6693 4.48667V9.14667C14.6693 10.9467 14.2493 11.5267 12.6693 11.62V6.85333C12.6693 4.86667 12.1626 4.36667 10.1493 4.36667H3.85596C3.66929 4.36667 3.49594 4.37333 3.33594 4.38C3.35594 2.48 3.87596 2 5.85596 2H12.1493C14.1626 2 14.6693 2.5 14.6693 4.48667Z" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.5 11.875H4.64665" stroke={className} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.07031 11.875H8.36365" stroke={className} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export default Details