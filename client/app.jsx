import React from 'react';
import Navigation from './components/navigation.jsx';
import Header from './components/header.jsx';
import parseRoute from './lib/parse-route.js';

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

  render() {
    return (
      <>
        <Header />
        <Navigation />
      </>
    );
  }
}

export default App;
