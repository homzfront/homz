import React from 'react'

const Update = ({ className = "#202020" }) => {
    return (
        <div>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.83958 2.89689L3.36624 8.69022C3.15958 8.91022 2.95958 9.34356 2.91958 9.64356L2.67291 11.8036C2.58624 12.5836 3.14624 13.1169 3.91958 12.9836L6.06624 12.6169C6.36624 12.5636 6.78624 12.3436 6.99291 12.1169L12.4662 6.32356C13.4129 5.32356 13.8396 4.18356 12.3662 2.79022C10.8996 1.41022 9.78624 1.89689 8.83958 2.89689Z" stroke={className} stroke-width="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.92969 3.86719C8.21635 5.70719 9.70969 7.11385 11.563 7.30052" stroke={className} stroke-width="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 15.1641H14" stroke={className} stroke-width="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export default Update