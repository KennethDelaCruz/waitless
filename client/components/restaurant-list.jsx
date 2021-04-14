import React from 'react';
import Rating from '../lib/rating.js';
import hotTimes from '../lib/hot-times.js';

function Restaurant(props) {
  return (
    <>
      <img src={props.info.image_url} className="restaurant-image" />
      <div className="description" >
        <h4 style={{ marginBottom: 0 }}>{props.info.name}</h4>
        <p style={{ margin: 0 }}>
          {Rating(props.info.rating)}
          <span style={{ fontSize: '10px', marginLeft: '4px' }}>
            {`${props.info.review_count} reviews`}
          </span>
        </p>
        <p style={{ margin: '5px 0px', fontSize: '12px' }}>
          {props.info.categories.map(i => `${i.title}, `)}
        </p>
        <p className="wait-time">Current Wait: {hotTimes(20)}</p>
      </div>
    </>
  );
}

class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
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
