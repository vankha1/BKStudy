import React from 'react';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {Array.from({ length: fullStars }, (_, index) => (
        <span key={index} className="text-yellow-500 text-2xl">&#9733;</span>
      ))}

      {hasHalfStar && (
        <span className="text-yellow-500 text-2xl">&#9733;</span>
      )}

      {Array.from({ length: 5 - Math.ceil(rating) }, (_, index) => (
        <span key={`empty-${index}`} className="text-gray-300 text-2xl">&#9734;</span>
      ))}
    </div>
  );
};

export default StarRating;
