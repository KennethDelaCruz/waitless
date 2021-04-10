import React from 'react';
import parseRoute from './lib/parse-route.js';
import Home from './pages/home.jsx';
import Search from './pages/search.jsx';
import Header from './components/header.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
    this.renderPage = this.renderPage.bind(this);
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
    }
    if (route.path === 'restaurants') {
      return <Search restaurants={this.state.restaurants}/>;
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
