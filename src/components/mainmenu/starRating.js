import React, { useState } from "react";

const StarRating = ({ initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating || 0);
  const [hover, setHover] = useState(0);

  const handleStarClick = (index) => {
    setRating(index);
    onRatingChange && onRatingChange(index);
  };

  return (
    <div className="star-rating mt-8">
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <button
            key={index}
            type="button"
            className={`focus:outline-none ${
              index <= (hover || rating) ? "text-BlueHomz" : "text-gray-300"
            }`}
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
            onDoubleClick={() => {
              setRating(0);
              setHover(0);
              onRatingChange && onRatingChange(0);
            }}
          >
            <span className="text-2xl">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
