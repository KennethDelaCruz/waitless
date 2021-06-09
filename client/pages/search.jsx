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
