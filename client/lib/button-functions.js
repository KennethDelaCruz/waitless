
export default function geoSearch() {
  // disregard most of the code that is in the bottom
  // it will need to be replaced with proper code that will talk request
  // from inhouse server > yelp server > inhouse server > back to client
    const data = {
     location: 'carson, ca',
     limit:10
    }
    const searchRequest = {
      method: "GET",
      mode: 'no-cors',
      headers: {
        'Content-Type': "application/json",
        body: JSON.stringify(data)
      }
    }

    fetch('https://api.yelp.com/v3/businesses/search', searchRequest)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.error(err))


}
