import React from 'react';

export default class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { restaurants: [] };
  }

  componentDidMount() {
    function success(pos) {
      const { longitude, latitude } = pos.coords;
      const data = {
        attributes: ['reservation'],
        longitude,
        latitude,
        limit: 10
      };
      const searchRequest = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      fetch('api/yelp-search', searchRequest)
        .then(response => response.json())
        .then(data => {
          this.setState({ restaurants: data });
        })
        .catch(err => console.error(err));
    }
    // if failed, it should bring the user back to the navigation screen

    function failure(err) {
      console.error(err);
    }

    navigator.geolocation.getCurrentPosition(success, failure);
  }

  render() {
    return (
      <button></button>
    );
  }
}
