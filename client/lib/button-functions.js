export default function geoSearch() {
  const success = position => {
    const {longitude, latitude} =  position.coords;
    console.log("Longitude:", longitude,"Latitude", latitude)
  }
  const failure = error => { console.error(err)};

  const options ={
    enableHighAccuracy: true
  }

 navigator.geolocation.getCurrentPosition(success, failure, options);

}
