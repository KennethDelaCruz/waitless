import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './components/navigation.jsx';
import Header from './components/header.jsx'


class App extends React.Component {
  render(){
    return (
      <>
        <Header />
        <Navigation />
      </>
    )
  }
}

export default App;
