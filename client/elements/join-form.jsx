import React from 'react';
import makeId from '../lib/unique-code';

class JoinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      name: null,
      'party-size': null,
      'unique-code': null
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const code = makeId(4);
    this.setState({ 'unique-code': code });

  }

  handleTextChange(event) {
    this.setState({ name: event.target.value.toUpperCase() });
  }

  handleSelectChange(event) {
    this.setState({ 'party-size': parseInt(event.target.value) });
  }

  handleSubmit() {
    event.preventDefault();
    const data = {
      name: this.state.name,
      partySize: this.state['party-size'],
      restaurantId: this.props.restaurantId,
      uniqueCode: this.state['unique-code']
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
      .then(this.setState({ submitted: true }))
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.submitted) {
      return (
        <div className="form-container ">
          <form className="join-form" onSubmit={this.handleSubmit}>
            <h2 className="form-title">
              {'Join Waitlist for: '}
            </h2>
            <h2 className="form-restaurant form-title">{this.props.name}</h2>
            <label htmlFor="name">First Name:</label><br />
            <input type="text" id="name" name="name" required onChange={this.handleTextChange}></input><br />
            <label htmlFor="party-size">Party Size:</label>
            <select id="party-size" onChange={this.handleSelectChange}>
              <option value="0" selected disabled></option>
              <option value="1" >1</option>
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
            <p className="reservation-text">{`Reservation for: ${this.state.name}`}</p>
            <p className="reservation-text">At <span className="underline">{`${this.props.name}`}</span></p>
          </div>
          <div className="party-description">
            <p className="party-text">{`Party of: ${this.state['party-size']}`}</p>
          </div>
          <p className="code-title">Reservation Code</p>
          <div className="uniqueCode-block">
            <h4 className="unique-code">
              {this.state['unique-code']}
            </h4>
          </div>
        </div>
      );
    }
  }
}

export default JoinForm;
