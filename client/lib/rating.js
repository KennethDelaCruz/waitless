import React from 'react';

function Rating(number) {
  const starElements = Array(5).fill(null).map((i, index) => {
    if (index + 1 <= number) {
      return <i key={i} className="fas fa-star" />;
    }
    if (index + 0.5 === number) {
      return <i key ={i}className="fas fa-star-half-alt" />;
    }
    return <i key={i} className="far fa-star" />;
  });
  return starElements;
}

export default Rating;
