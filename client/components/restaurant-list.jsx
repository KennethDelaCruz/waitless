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
  const style = {
    backgroundImage: `url(${props.info.image_url})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '5px',
    boxShadow: '2px 2px 2px rgb(110, 110, 110)'
  };
  return (
    <div className="column-half restaurant-card">
      <div className="image-container" style={style}/>
      <div className="description" style={{ border: '2px solid black' }}>
        <h4>{props.info.name}</h4>
      </div>
    </div>
  );
}

function RestaurantList(props) {
  return (
    <div className="container restaurant-list">
      {props.restaurants.map((restaurant, i) => {
        return <Restaurant key={i} info={restaurant} />;
      })}
    </div>
  );
}

export default RestaurantList;
