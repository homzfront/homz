import React from 'react'

const DateDotNowInHomz = () => {
    const date = new Date();
    const options = { month: 'long', year: 'numeric' };
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();

    // Determine the suffix for the day
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
        day === 2 || day === 22 ? 'nd' :
            day === 3 || day === 23 ? 'rd' :
                'th';

    return `${day}${suffix}, ${month} ${year}`;
}

export default DateDotNowInHomz;