import React from 'react';
import RestaurantList from '../components/restaurant-list';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoLocationOn: this.props.geoLocation,
      location: { city: this.props.city, stateCode: this.props.stateCode },
      restaurants: [],
      isLoading: true
    };
  }

  componentDidMount() {
    if (this.state.geoLocationOn) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { longitude, latitude } = pos.coords;
        const body = {
          attribute: ['reservation'],
          longitude,
          latitude,
          limit: 10
        };
        const searchRequest = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        };
        fetch('/api/yelp-search/geolocation', searchRequest)
          .then(response => response.json())
          .then(data => {
            this.setState({ restaurants: data.jsonBody.businesses, isLoading: false });
          })
          .catch(err => console.error(err));
      });
    }
  }

  render() {
    return this.state.isLoading
      ? <img style={{ width: '200px', height: '200px' }}src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif"></img>
      : <RestaurantList restaurants={this.state.restaurants}/>;
  }
}
