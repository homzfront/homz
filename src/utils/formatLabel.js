import React from 'react'

const FormatLabel = (name) => {
    return name ? name.split(" ") // Split by spaces
        .map((word, index) =>
            index === 0
                ? word.toLowerCase() // First word starts with lowercase
                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize others
        )
        .join("")
        : label
            .split(" ") // Split by spaces
            .map((word, index) =>
                index === 0
                    ? word.toLowerCase() // First word starts with lowercase
                    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize others
            )
            .join(""); // Join without spaces
};

export default FormatLabel