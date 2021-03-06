import React from 'react';
import Rating from '../lib/rating.js';
import hotTimes from '../lib/hot-times.js';
import JoinForm from '../elements/join-form.jsx';
import Loading from '../elements/loading.jsx';

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      restaurantId: null,
      waitlist: null,
      isLoading: true
    };
    this.handleCurrentWait = this.handleCurrentWait.bind(this);
    this.newRestaurant = this.newRestaurant.bind(this);
  }

  handleJoin(restaurant) {
    this.setState({ toggle: true });
  }

  modalClose() {
    if (this.state.toggle && event.target.className === 'form-modal') {
      this.setState({ toggle: false });
    }
  }

  newRestaurant() {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(`/api/restaurantId/${this.props.info.name}`, req)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          this.setState({ waitlist: undefined });
        }
      })
      .then(data => {
        const { restaurantId } = data;
        this.setState({ restaurantId });
        this.handleCurrentWait();
      });
  }

  handleCurrentWait() {
    fetch(`/api/restaurantId/${this.props.info.name}`)
      .then(response => {
        if (response.status === 404) {
          this.newRestaurant();
        } else {
          return response.json();
        }
      })
      .then(data => {
        const { restaurantId } = data;
        this.setState({ restaurantId });
        fetch(`/api/waitlist/${this.state.restaurantId}`)
          .then(response => response.json())
          .then(data => {
            const waitlist = parseInt(data.count);
            this.setState({ waitlist, isLoading: false });
          });
      })
      .catch(err => {
        console.error(err);
      });

  }

  componentDidMount() {
    this.handleCurrentWait();
  }

  render() {
    const restaurant = this.props.info;
    if (this.state.isLoading) {
      return <Loading class={'loading-small'}/>;
    }
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
          <p style={{ margin: '5px 0px', fontSize: '12px' }}>
            {`${restaurant.location.address1} ${restaurant.location.city}, ${restaurant.location.state}`}

          </p>
          <p className="wait-time">Current Wait: {hotTimes(this.state.waitlist)}</p>
          <button className={this.props.buttonDisplay} onClick={() => this.handleJoin(this.props.info)}>Join Waitlist</button>
        </div>
        <div onClick={() => this.modalClose()} className={this.state.toggle ? 'form-modal' : 'form-modal hidden'} >
          <JoinForm name={this.props.info.name} restaurantId={this.state.restaurantId} />
        </div>
      </>

    );
  }
}

function RestaurantList(props) {

  return (
    <div className="container restaurant-list">
      <div className="search-header-container">
        <p className="search-title">Search Results:</p>

      </div>
      {props.restaurants.map((restaurant, i) => {
        return (
          <div key={i} className="column-half restaurant-card">
            <Restaurant info={restaurant} buttonDisplay={'waitlist-button'} />
          </div>
        );
      })}
    </div>
  );
}

export default RestaurantList;
