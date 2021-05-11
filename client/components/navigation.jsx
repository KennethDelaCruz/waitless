import React from 'react';

class Navigation extends React.Component {
  render() {
    return (
      <div className="navigation container" >
        <div className="row column-full">
          <Button hash="#geosearch-search" icon={<i className="nav-icons fas fa-map-marker-alt"></i>} text="Search by Geolocation" />
          <Button hash="#city-state-search" icon={<i className="nav-icons fas fa-street-view"></i>} text="Search by City/State"/>
        </div>
        <div className="row column-full">
          <Button hash="#edit-reservation" icon={<i className="nav-icons fas fa-edit"></i>} text="Edit Reservations"/>
          <Button hash="#delete-reservation" icon={<i className="nav-icons fas fa-ban"></i>} text="Cancel Reservations"/>
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
        {props.icon}
        <br />
        <p style={{ width: '100%', margin: '10px 0px 0px 0px', fontSize: '16px', color: '#505050', fontWeight: 600 }}>{props.text}</p>
        </button>
    </a>
  );
}

export default Navigation;
