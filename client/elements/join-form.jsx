import React from 'react';

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

  handleTextChange(event) {

    this.setState({ name: event.target.value });
  }

  handleSelectChange(event) {
    this.setState({ 'party-size': parseInt(event.target.value) });
    console.log(typeof parseInt(event.target.value));
  }

  handleSubmit() {
    event.preventDefault();
    console.log('this worked');
  }

  render() {
    if (!this.state.submitted) {
      return (
        <div className="form-container ">
          <form className="join-form" onSubmit={this.handleSubmit}>
            <h4>
              {'Join Waitlist for:'}
              <span className="form-restaurant"> {this.props.name}</span>
            </h4>
            <label htmlFor="name">Name:</label><br />
            <input type="text" id="name" name="name" required onChange={this.handleTextChange}></input><br />
            <label htmlFor="party-size">Pary for:</label><br />
            <select id="party-size" onChange={this.handleSelectChange}>
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
            <button type="submit">Submit</button>
          </form>
        </div>

      );
    }
  }
}

export default JoinForm;
