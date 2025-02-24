import React from 'react'

const DownloadSmall = ({ className = "#006AFF" }) => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.9629 5.92969C13.3629 6.13635 14.3429 7.36969 14.3429 10.0697V10.1564C14.3429 13.1364 13.1496 14.3297 10.1696 14.3297H5.82958C2.84958 14.3297 1.65625 13.1364 1.65625 10.1564V10.0697C1.65625 7.38969 2.62292 6.15635 4.98292 5.93635" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 1.33594V9.9226" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.2323 8.42969L7.99896 10.663L5.76562 8.42969" stroke={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default DownloadSmall