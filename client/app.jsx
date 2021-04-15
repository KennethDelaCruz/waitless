import React from 'react';
import parseRoute from './lib/parse-route.js';
import Home from './pages/home.jsx';
import Search from './pages/search.jsx';
import Header from './components/header.jsx';
import ReservationForm from './pages/edit-delete-form.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const parse = parseRoute(window.location.hash);
      this.setState({ route: parse });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    } else if (route.path === 'geosearch-restaurants') {
      return (
        <Search />
      );
    } else if (route.path === 'edit-reservation') {
      return (
        <ReservationForm />
      );
    } else if (route.path === 'delete-reservation') {
      return (
        <ReservationForm delete={true}/>
      );
    }

  }

  render() {
    return (
      <>
        <Header />
        {this.renderPage()}
      </>
    );
  }
}

export default App;
