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
    <>
      <div className="image-container" style={style}/>
      <div className="description" >
        <h4 style={{ marginBottom: 0 }}>{props.info.name}</h4>
        <p style={{ margin: 0 }}>
          {`rating placeholder ${props.info.rating}`}
          <span style={{ fontSize: '10px', marginLeft: '4px' }}>
            {`${props.info.review_count} reviews`}
          </span>
        </p>
        <p style={{ margin: 0, fontSize: '11px' }}>
          {props.info.categories.map(i => { return `${i.title}, `; })}
        </p>
      </div>
      <div className={props.selected}>
        <p></p>
      </div>
    </>
  );
}

class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    if (this.state.selected === i) {
      this.setState({ selected: null });
    } else {
      this.setState({ selected: i });
    }

  }

  render() {
    return (
      <div className="container restaurant-list">
        {this.props.restaurants.map((restaurant, i) => {
          return (
            <div key={i} onClick={() => this.handleClick(i)} className="column-half restaurant-card">
              <Restaurant onClick={i => this.handleClick(i)} info={restaurant} />;
            </div>
          );
        })}
      </div>
    );
  }

}

export default RestaurantList;
