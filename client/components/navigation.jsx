import React from 'react';
import { geoSearch } from '../lib';

class Navigation extends React.Component {
  render() {
    return (
      <div className="navigation">
        <Button hash="#restaurants" handleClick={geoSearch} icon={<i className="fas fa-map-marker-alt"></i>} />
      </div>
    );
  }
}

function Button(props) {

  return (
    <a
      href={props.hash}>
        <button className="buttons" onClick={props.handleClick}>{props.icon}</button>
    </a>
  );
}

export default Navigation;
