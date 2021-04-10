import React from 'react';
import { geoSearch } from '../lib';

class Navigation extends React.Component {
  render() {
    return (
      <div className="navigation container" >
        <div className="row column-full">
          <Button hash="#restaurants" icon={<i className="fas fa-map-marker-alt"></i>} />
          <Button hash="#restaurants" handleClick={geoSearch} icon={'placeholder'} />
        </div>
        <div className="row column-full">
          <Button hash="#restaurants" handleClick={geoSearch} icon={'placeholder'} />
          <Button hash="#restaurants" handleClick={geoSearch} icon={'placeholder'} />
        </div>
        <div className="row column-full">
          <Button hash="#restaurants" handleClick={geoSearch} icon={'placeholder'} />
          <Button hash="#restaurants" handleClick={geoSearch} icon={'placeholder'} />
        </div>

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
