import React, { useEffect, useState } from 'react';
import RestaurantList from '../components/restaurant-list';
import Loading from '../elements/loading.jsx';
import ErrorVisual from '../components/error.jsx';

export default function Search(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function handleReset() {
    setRestaurants([]);
    setLoading(true);
    setError(null);
    handleSearch();
  }

  function handleSearch() {
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
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
      };
      fetch('/api/yelp-search/geolocation', searchRequest)
        .then(response => response.json())
        .then(data => {
          setRestaurants(data.jsonBody.businesses);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError(true);
        });
    }, () => {
      window.location.hash = '#city-state-search';
    });
  }

  function render() {
    if (error) {
      return <ErrorVisual text="Looks like something went wrong..." reset={handleReset} />;
    }
    return loading
      ? <Loading class="loading-large" />
      : <RestaurantList restaurants={restaurants} />;
  }

  useEffect(() => handleSearch());

  return render();
}
// export default class Search extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       restaurants: [],
//       isLoading: true,
//       error: null
//     };
//     this.handleReset = this.handleReset.bind(this);
//     this.handleSearch = this.handleSearch.bind(this);
//   }

//   handleReset() {
//     this.setState({
//       restaurants: [],
//       isLoading: true,
//       error: null
//     });
//     this.handleSearch();
//   }

//   handleSearch() {
//     navigator.geolocation.getCurrentPosition(pos => {
//       const { longitude, latitude } = pos.coords;
//       const body = {
//         attribute: ['reservation'],
//         longitude,
//         latitude,
//         limit: 10
//       };
//       const searchRequest = {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(body)
//       };
//       fetch('/api/yelp-search/geolocation', searchRequest)
//         .then(response => response.json())
//         .then(data => {
//           this.setState({ restaurants: data.jsonBody.businesses, isLoading: false });
//         })
//         .catch(err => {
//           console.error(err);
//           this.setState({ error: true });
//         });
//     }, () => {
//       window.location.hash = '#city-state-search';
//     });

//   }

//   componentDidMount() {
//     this.handleSearch();
//   }

//   render() {
//     if (this.state.error) {
//       return <ErrorVisual text="Looks like something went wrong..." reset={this.handleReset} />;
//     }
//     return this.state.isLoading
//       ? <Loading class="loading-large"/>
//       : <RestaurantList restaurants={this.state.restaurants}/>;
//   }
// }
