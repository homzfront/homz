import React from 'react'

const Reminder = ({className = "#4E4E4E", classNameTwo = "#292D32"}) => {
    return (
        <div>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.1673 8.50065C15.1673 12.1807 12.1807 15.1673 8.50065 15.1673C4.82065 15.1673 1.83398 12.1807 1.83398 8.50065C1.83398 4.82065 4.82065 1.83398 8.50065 1.83398C12.1807 1.83398 15.1673 4.82065 15.1673 8.50065Z" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.9739 10.6192L8.90724 9.38586C8.54724 9.17253 8.25391 8.65919 8.25391 8.23919V5.50586" stroke={classNameTwo} strokewidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export default Reminder