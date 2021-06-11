import React from 'react';

export default function Header(props) {
  function render() {
    return (
      <header>
        <div className ="column-full container">
          <a href="#">
            <img className="logo" src="/images/waitless.png" alt="waitless-app-logo"></img>
          </a>
        </div>
      </header>
    );
  }

  return render();
}
