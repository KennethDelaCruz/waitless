import React from 'react';
import Button from '../elements/button.jsx'


export default class Header extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log('header image click works')
  }

  render(){
    return (
      <div className="header">
        <img className="logo" src="../../images/waitless.png"></img>
      </div>
    )
  }
}
