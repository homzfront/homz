import React from 'react'

const Search = ({ className = "#E6E6E6" }) => {
    return (
        <div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.66732 14.0007C11.1651 14.0007 14.0007 11.1651 14.0007 7.66732C14.0007 4.16951 11.1651 1.33398 7.66732 1.33398C4.16951 1.33398 1.33398 4.16951 1.33398 7.66732C1.33398 11.1651 4.16951 14.0007 7.66732 14.0007Z" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.6673 14.6673L13.334 13.334" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export default Search