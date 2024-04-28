import React from "react";

const StarRating = ({ rating }) => {
  // Convert rating to a value between 0 and 5
  const normalizedRating = Math.min(Math.max(rating, 0), 5);

  // Generate an array of stars based on the rating
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < normalizedRating) {
      stars.push(
        <span
          key={i}
          style={{ color: "black", margin: "1px", fontSize: "25px" }}
        >
          &#9733;
        </span>
      ); // Filled star
    } else {
      stars.push(
        <span key={i} style={{ margin: "1px", fontSize: "20px" }}>
          &#9734;
        </span>
      ); // Empty star
    }
  }

  return <div>{stars}</div>;
};

export default StarRating;
