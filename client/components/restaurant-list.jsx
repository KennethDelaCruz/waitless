import React from 'react';

// function rating(number) {
//   const half = number % 1;
//   if (half !== 0) {
//     let stars;
//     for (let i = 0; i < number; i++) {
//       stars += <i className="fas fa-star"></i>;
//     }
//     stars += <i className="fas fa-star-half-alt"></i>;
//     return stars;
//   } else {
//     let stars;
//     for (let i = 0; i < number; i++) {
//       stars += <i className="fas fa-star"></i>;
//     }
//     return stars;
//   }

// }

function Restaurant(props) {
  return (
    <div className="column-half restaurant-card">
      <img className="restaurant-image" src={props.info.image_url} alt={`restaurant picture for ${props.name}`} />
      <div className="description">
        <h4>{props.info.name}</h4>
      </div>
    </div>
  );
}

function RestaurantList(props) {
  return (
    <div className="restaurant-list">
      {props.restaurants.map((restaurant, i) => {
        return <Restaurant key={i} info={restaurant} />;
      })}
    </div>
  );
}

export default RestaurantList;
