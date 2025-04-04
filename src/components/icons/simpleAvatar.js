import React from 'react'

const SimpleAvatar = ({ className = "#292D32", classNameTwo = "#4E4E4E" }) => {
    return (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.4974 8.49999C10.3383 8.49999 11.8307 7.00761 11.8307 5.16666C11.8307 3.32571 10.3383 1.83333 8.4974 1.83333C6.65645 1.83333 5.16406 3.32571 5.16406 5.16666C5.16406 7.00761 6.65645 8.49999 8.4974 8.49999Z" stroke={classNameTwo} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.2268 15.1667C14.2268 12.5867 11.6601 10.5 8.5001 10.5C5.3401 10.5 2.77344 12.5867 2.77344 15.1667" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default SimpleAvatar