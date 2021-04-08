import React from 'react';
import { geoSearch } from '../lib';

class Navigation extends React.Component {
  render() {
    return (
      <div className="navigation">
        <button className="buttons" onClick={geoSearch}><i className="fas fa-map-marker-alt"></i></button>
      </div>
    );
  }
}

export default Navigation;
