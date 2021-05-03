import React from 'react';
import RestaurantList from '../components/restaurant-list';
import Loading from '../elements/loading.jsx';
import ErrorVisual from '../components/error.jsx';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      isLoading: true,
      error: null
    };
    this.handleReset = this.handleReset.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleReset() {
    this.setState({
      restaurants: [],
      isLoading: true,
      error: null
    });
    this.handleSearch();
  }

  handleSearch() {
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
        .catch(err => {
          console.error(err);
          this.setState({ error: true });
        });
    });

  }

  componentDidMount() {
    this.handleSearch();
  }

  render() {
    if (this.state.error) {
      return <ErrorVisual text="Looks like something went wrong..." reset={this.handleReset} />;
    }
    return this.state.isLoading
      ? <Loading class="loading-large"/>
      : <RestaurantList restaurants={this.state.restaurants}/>;
  }
}
