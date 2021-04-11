import React from 'react';

function Rating(number) {
  if (number === 1) {
    return <i className="fas fa-star"></i>;
  } else if (number === 1.5) {
    return (
      <>
        <i className="fas fa-star"></i>
        <i className="fas fa-star-half-alt"></i>
      </>
    );
  } else if (number === 2) {
    return (
      <>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
      </>
    );
  } else if (number === 2.5) {
    return (
      <>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star-half-alt"></i>
      </>
    );
  } else if (number === 3) {
    return (
      <>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
      </>
    );
  } else if (number === 3.5) {
    return (
      <>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star-half-alt"></i>
      </>
    );
  } else if (number === 4) {
    return (
      <>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
      </>
    );
  } else if (number === 4.5) {
    return (
      <>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star-half-alt"></i>
      </>
    );
  } else {
    return (
      <>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
      </>
    );
  }

}

export default Rating;
