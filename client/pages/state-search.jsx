import React from 'react';
import StateSelect from '../elements/state-select.jsx';
import RestaurantList from '../components/restaurant-list.jsx';
import Loading from '../elements/loading.jsx';

class StateSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      isLoading: false,
      city: null,
      stateCode: null,
      restaurants: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleState = this.handleState.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const location = `${this.state.city}, ${this.state.stateCode}`;
    const body = {
      attributes: ['reservation'],
      location,
      limit: 10
    };
    const searchRequest = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    fetch('/api/yelp-search/city', searchRequest)
      .then(response => response.json())
      .then(data => {
        this.setState({ restaurants: data.jsonBody.businesses, isLoading: false });
      })
      .catch(err => console.error(err));
  }

  handleCity(event) {
    this.setState({ city: event.target.value.toLowerCase() });
  }

  handleState(event) {
    this.setState({ state: event.target.value.toLowerCase() });
  }

  render() {
    if (!this.state.submitted) {
      return (
        <div className="edit-container">
          <div className="update-container">
            <form className="update-form" onSubmit={this.handleSubmit}>
              <p className="reservation-text update-text update-title" style={{ textAlign: 'center' }} htmlFor="update-name">Find Restaurants by City/State</p>
              <label className="reservation-text update-text" htmlFor="city">City:</label>
              <input type="text"
                id="city"
                name="city"
                onChange={this.handleCity}></input>
              <div className="state-select-section">
                <label className="party-text reservation-text" htmlFor="state-select">State:</label>
                <StateSelect id="state-select" class="party-select" handleChange={this.handleState} />
              </div>
              <button type="submit" className="form-button">Submit</button>
            </form>
          </div>
        </div>
      );
    } else {
      return this.state.isLoading
        ? <Loading />
        : <RestaurantList restaurants={this.state.restaurants} />;
    }
  }
}

export default StateSearch;
