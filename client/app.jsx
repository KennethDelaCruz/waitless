import React, { useEffect, useState } from 'react';
import parseRoute from './lib/parse-route.js';
import Home from './pages/home.jsx';
import Search from './pages/search.jsx';
import Header from './components/header.jsx';
import ReservationForm from './pages/edit-delete-form.jsx';
import StateSearch from './pages/state-search.jsx';

function App() {
  const [route, setRoute] = useState(parseRoute(window.location.hash));

  useEffect(() => {
    window.addEventListener('hashchange', event => {
      setRoute(parseRoute(window.location.hash));
    });
  });

  function renderPage() {
    if (route.path === '') {
      return <Home />;
    } else if (route.path === 'geosearch-search') {
      return <Search geolocation={true} />;
    } else if (route.path === 'edit-reservation') {
      return <ReservationForm />;
    } else if (route.path === 'delete-reservation') {
      return <ReservationForm delete={true} />;
    } else if (route.path === 'city-state-search') {
      return <StateSearch />;
    }
  }

  return (
    <>
      <Header />
      {renderPage()}
    </>
  );

}

export default App;
