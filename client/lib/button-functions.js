
export default function geoSearch() {
  // disregard most of the code that is in the bottom
  // it will need to be replaced with proper code that will talk request
  // from inhouse server > yelp server > inhouse server > back to client

  function success(pos) {
    const { longitude, latitude } = pos.coords;
    const data = {
      attributes: ['reservation'],
      longitude,
      latitude,
      limit: 30
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
        const names = data.jsonBody.businesses.map(business => {
          return business.name;
        });
      })
      .catch(err => console.error(err));
  }

  function failure(err) { console.log(err); }

  navigator.geolocation.getCurrentPosition(success, failure);
}
