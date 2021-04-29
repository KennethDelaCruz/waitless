import React from 'react';

class Navigation extends React.Component {
  render() {
    return (
      <div className="navigation container" >
        <div className="row column-half">
          <Button hash="#geosearch-search" icon={<i className="nav-icons fas fa-map-marker-alt"></i>} />
          <Button hash="#city-state-search" icon={<i className="nav-icons fas fa-street-view"></i>} />
        </div>
        <div className="row column-full">
          <Button hash="#edit-reservation" icon={<i className="nav-icons fas fa-edit"></i>} />
          <Button hash="#delete-reservation" icon={<i className="nav-icons fas fa-ban"></i>} />
        </div>
      </div>
    );
  }
}

function Button(props) {

  return (
    <a
      href={props.hash}>
        <button className="buttons" onClick={props.handleClick}>
        {props.text}
        {props.icon}
        </button>
    </a>
  );
}

export default Navigation;
