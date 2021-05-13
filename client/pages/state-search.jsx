import React, { useState } from 'react';
import StateSelect from '../elements/state-select.jsx';
import RestaurantList from '../components/restaurant-list.jsx';
import Loading from '../elements/loading.jsx';
import ErrorVisual from '../components/error.jsx';

function StateSearch(props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setLoading(true);
    const location = `${city}, ${state}`;
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
        setRestaurants(data.jsonBody.businesses);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
      });
  }

  function handleState(event) {
    setState(event.target.value.toLowerCase());
  }

  function handleCity(event) {
    setCity(event.target.value.toLowerCase());
  }

  function render() {
    if (error) {
      return <ErrorVisual text="Looks like something went wrong..." />;
    }
    if (!submitted) {
      return (
        <div className="edit-container">
          <div className="update-container">
            <form className="update-form" onSubmit={handleSubmit}>
              <p className="reservation-text update-text update-title" style={{ textAlign: 'center' }} htmlFor="update-name">Find Restaurants by City/State</p>
              <label className="reservation-text update-text" htmlFor="city">City:</label>
              <input type="text"
                id="city"
                name="city"
                onChange={handleCity}
              ></input>
              <div className="state-select-section">
                <label className="party-text reservation-text" htmlFor="state-select">State:</label>
                <StateSelect id="state-select" class="party-select" handleChange={handleState} />
              </div>
              <button type="submit" className="form-button">Submit</button>
            </form>
          </div>
        </div>
      );
    } else {
      return loading
        ? <Loading class={'loading-large'} />
        : <RestaurantList class="loading-container" restaurants={restaurants} />;
    }
  }

  return render();
}
// CODE WITHOUT REFACTORING

// class StateSearch extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       submitted: false,
//       isLoading: false,
//       city: null,
//       stateCode: null,
//       restaurants: [],
//       error: null

//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleCity = this.handleCity.bind(this);
//     this.handleState = this.handleState.bind(this);
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     this.setState({ submitted: true, isLoading: true });
//     const location = `${this.state.city}, ${this.state.stateCode}`;
//     const body = {
//       attributes: ['reservation'],
//       location,
//       limit: 10
//     };
//     const searchRequest = {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(body)
//     };
//     fetch('/api/yelp-search/city', searchRequest)
//       .then(response => response.json())
//       .then(data => {
//         this.setState({ restaurants: data.jsonBody.businesses, isLoading: false });
//       })
//       .catch(err => {
//         console.error(err);
//         this.setState({ error: true });
//       });
//   }

//   handleCity(event) {
//     this.setState({ city: event.target.value.toLowerCase() });
//   }

//   handleState(event) {
//     this.setState({ stateCode: event.target.value.toLowerCase() });
//   }

//   render() {
//     if (this.state.error) {
//       return <ErrorVisual text="Looks like something went wrong..." />;
//     }
//     if (!this.state.submitted) {
//       return (
//         <div className="edit-container">
//           <div className="update-container">
//             <form className="update-form" onSubmit={this.handleSubmit}>
//               <p className="reservation-text update-text update-title" style={{ textAlign: 'center' }} htmlFor="update-name">Find Restaurants by City/State</p>
//               <label className="reservation-text update-text" htmlFor="city">City:</label>
//               <input type="text"
//                 id="city"
//                 name="city"
//                 onChange={this.handleCity}
//                 ></input>
//               <div className="state-select-section">
//                 <label className="party-text reservation-text" htmlFor="state-select">State:</label>
//                 <StateSelect id="state-select" class="party-select" handleChange={this.handleState} />
//               </div>
//               <button type="submit" className="form-button">Submit</button>
//             </form>
//           </div>
//         </div>
//       );
//     } else {
//       return this.state.isLoading
//         ? <Loading class={'loading-large'}/>
//         : <RestaurantList class="loading-container" restaurants={this.state.restaurants} />;
//     }
//   }
// }

export default StateSearch;
