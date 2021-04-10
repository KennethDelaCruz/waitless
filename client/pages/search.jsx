import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: null,
      latitude: null,
      restaurants: [],
      isLoading: true
    };
  }

  componentDidMount() {
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
      fetch('api/yelp-search', searchRequest)
        .then(response => response.json())
        .then(data => {
          this.setState({ restaurants: data, isLoading: false });
        })
        .catch(err => console.error(err));
    });
  }

  render() {
    return this.state.isLoading ? <p>loading..</p> : <p>finished loading</p>;
  }
}
