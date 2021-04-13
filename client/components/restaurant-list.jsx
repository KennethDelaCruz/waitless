import React from 'react';
import Rating from '../lib/rating.js';
import hotTimes from '../lib/hot-times.js';

// create a new component for the form, and add a prop and state for the restaurnt
// to tackle Restaurant wait time, add a Componentdidmount to fetch the api for the waittimes,
// and add another state that will determine when to render teh page/ loading or not loading etc..

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
  }

  handleJoin(restaurant) {
    this.setState({ toggle: true });
  }

  modalClose() {
    if (this.state.toggle && event.target.className === 'form-modal') {
      this.setState({ toggle: false });
    }
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
          <button className={this.props.buttonDisplay} onClick={() => this.handleJoin(this.props.info)}>Join Waitlist</button>
        </div>
        <div onClick={() => this.modalClose()} className={this.state.toggle ? 'form-modal' : 'form-modal hidden'} >
          <div className="form-container column-half">
            <form >
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required></input>
              <select id="party-size">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </form>
          </div>
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
