import React from 'react';
import { geoSearch } from '../lib';

class Navigation extends React.Component {
  render() {
    return (
      <div className="navigation">
        <button className="buttons" onClick={geoSearch}>Search by Geolocation</button>
      </div>
    );
  }
}

export default Navigation;
