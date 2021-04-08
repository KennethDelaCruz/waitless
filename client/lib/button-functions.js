export default function geoSearch() {

    const data = {
     location: 'carson, ca',
     limit:10
    }
    const searchRequest = {
      method: "GET",
      mode: 'no-cors',
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer qENdnEeMTb_oC38tACiv1NPdkHXDbUx_XHPzAmrCZUYUt5xm9E4qWdZrQc-dbI2S58Z2SlEabiSDGvu9_BWcTtIRCO-LRtDmsErnbRtepX34mMD4-jYOWbhCJUtuYHYx`,
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
