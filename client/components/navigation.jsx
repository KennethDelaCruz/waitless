import React from 'react';
import Button from '../elements/button.jsx'
import{ geoSearch } from '../lib'

class Navigation extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log(geoSearch)
  }

  render() {
    return (
      <button className="buttons" onClick={geoSearch}>This is a test</button>
    )
  }
}

export default Navigation
