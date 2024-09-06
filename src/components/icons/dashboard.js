import React from 'react'

const Dashboard = ({className = "#4E4E4E", classNameTwo = "#292D32"}) => {
    return (
        <div>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.0026 13.7693V3.23594C7.0026 2.23594 6.57594 1.83594 5.51594 1.83594H2.8226C1.7626 1.83594 1.33594 2.23594 1.33594 3.23594V13.7693C1.33594 14.7693 1.7626 15.1693 2.8226 15.1693H5.51594C6.57594 15.1693 7.0026 14.7693 7.0026 13.7693Z" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.6667 6.1826V3.15594C14.6667 2.21594 14.24 1.83594 13.18 1.83594H10.4867C9.42667 1.83594 9 2.21594 9 3.15594V6.17594C9 7.1226 9.42667 7.49594 10.4867 7.49594H13.18C14.24 7.5026 14.6667 7.1226 14.6667 6.1826Z" stroke={classNameTwo} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.6667 13.68V10.9867C14.6667 9.92667 14.24 9.5 13.18 9.5H10.4867C9.42667 9.5 9 9.92667 9 10.9867V13.68C9 14.74 9.42667 15.1667 10.4867 15.1667H13.18C14.24 15.1667 14.6667 14.74 14.6667 13.68Z" stroke={classNameTwo} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export default Dashboard