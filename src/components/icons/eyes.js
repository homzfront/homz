import React from 'react'

const Eyes = ({ className = "#4E4E4E" }) => {
    return (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.3866 8.50385C10.3866 9.82385 9.31995 10.8905 7.99995 10.8905C6.67995 10.8905 5.61328 9.82385 5.61328 8.50385C5.61328 7.18385 6.67995 6.11719 7.99995 6.11719C9.31995 6.11719 10.3866 7.18385 10.3866 8.50385Z" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.9999 14.0099C10.3532 14.0099 12.5466 12.6232 14.0732 10.2232C14.6732 9.28323 14.6732 7.70323 14.0732 6.76323C12.5466 4.36323 10.3532 2.97656 7.9999 2.97656C5.64656 2.97656 3.45323 4.36323 1.92656 6.76323C1.32656 7.70323 1.32656 9.28323 1.92656 10.2232C3.45323 12.6232 5.64656 14.0099 7.9999 14.0099Z" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default Eyes