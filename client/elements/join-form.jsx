import React, { useState } from 'react';
import makeId from '../lib/unique-code';

function JoinForm(props) {
  const [submit, setSubmit] = useState(false);
  const [name, setName] = useState(null);
  const [partySize, setPartySize] = useState(null);
  const [uniqueCode] = useState(makeId(4));

  function handleTextChange(event) {
    setName(event.target.value.toUpperCase());
  }

  function handleSelectChange(event) {
    setPartySize(parseInt(event.target.value));
  }

  function handleSubmit() {
    event.preventDefault();
    const data = {
      name: name,
      partySize: partySize,
      restaurantId: props.restaurantId,
      uniqueCode: uniqueCode
    };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch('/api/waitlist-reservation', req)
      .then(response => response.json())
      .then(setSubmit(true))
      .catch(err => console.error(err));
  }

  function render() {
    if (!submit) {
      return (
        <div className="form-container ">
          <form className="join-form" onSubmit={handleSubmit}>
            <h2 className="form-title">
              {'Join Waitlist for: '}
            </h2>
            <h2 className="form-restaurant form-title">{props.name}</h2>
            <label htmlFor="name">First Name:</label><br />
            <input type="text" id="name" name="name" required onChange={handleTextChange}></input><br />
            <label htmlFor="party-size">Party Size:</label>
            <select id="party-size" onChange={handleSelectChange}>
              <option defaultValue="0" disabled></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select><br />
            <button className="form-button" type="submit">Submit</button>
          </form>
        </div>

      );
    } else {
      return (
        <div className="form-container">
          <div className="name-location">
            <p className="reservation-text">{`Reservation for: ${name}`}</p>
            <p className="reservation-text">At <span className="underline">{`${props.name}`}</span></p>
          </div>
          <div className="party-description">
            <p className="party-text">{`Party of: ${partySize}`}</p>
          </div>
          <p className="code-title">Reservation Code</p>
          <div className="uniqueCode-block">
            <h4 className="unique-code">
              {uniqueCode}
            </h4>
          </div>
        </div>
      );
    }
  }

  return render();
}

export default JoinForm;
