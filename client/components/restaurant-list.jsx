import React from 'react';
import Rating from '../lib/rating.js';
import hotTimes from '../lib/hot-times.js';

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggle: false };
  }

  handleJoin(restaurant) {
    this.setState({ toggle: true });
  }

  render() {
    return (
      <>
        <img src={this.props.info.image_url} className="restaurant-image" />
        <div className="description" >
          <h4 style={{ marginBottom: 0 }}>{this.props.info.name}</h4>
          <p style={{ margin: 0 }}>
            {Rating(this.props.info.rating)}
            <span style={{ fontSize: '10px', marginLeft: '4px' }}>
              {`${this.props.info.review_count} reviews`}
            </span>
          </p>
          <p style={{ margin: '5px 0px', fontSize: '12px' }}>
            {this.props.info.categories.map(i => `${i.title}, `)}
          </p>
          <p className="wait-time">Current Wait: {hotTimes(20)}</p>
          <button className={this.props.buttonDisplay} onClick={() => this.handleJoin(this.props.info)}>this is a test</button>
        </div>
        <div className={
          this.state.toggle ? 'waitlist-form' : 'waitlist-form hidden'
        }>
          {/* adding styling to form for it to take the whole screen
          and when user taps the 'gray' area, let it set toggle to false */}
          <form>
            <input type="text"></input>
          </form>
        </div>
      </>
    );
  }
}

class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };

  }

  handleClick(i) {
    if (event.target.tagName === 'BUTTON') {
      return;
    }
    if (this.state.selected === i) {
      this.setState({ selected: null });
    } else {
      this.setState({ selected: i });
    }

  }

  buttonDisplay(i) {
    if (this.state.selected === i) {
      return 'waitlist-button';
    } else {
      return 'waitlist-button hidden';
    }
  }

  render() {
    return (
      <div className="container restaurant-list">
        {this.props.restaurants.map((restaurant, i) => {
          return (
            <div key={i} onClick={() => this.handleClick(i)} className="column-half restaurant-card">
              <Restaurant onClick={i => this.handleClick(i)} info={restaurant} buttonDisplay={this.buttonDisplay(i)}/>;
            </div>
          );
        })}
      </div>
    );
  }

}

export default RestaurantList;
