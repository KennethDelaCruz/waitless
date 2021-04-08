import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
  }

  render() {
    return (
      <div className="header">
        <img className="logo" src="/images/waitless.png"></img>
      </div>
    );
  }
}
