import React, { useState } from 'react';
import EditForm from '../components/edit-form.jsx';
import EditComplete from '../components/edit-complete.jsx';
import DeleteForm from '../components/delete-form.jsx';
import ErrorVisual from '../components/error.jsx';
import DeleteComplete from '../components/delete-complete.jsx';

function ReservationForm(props) {
  const [deleteOn] = useState(props.delete ? true : null);
  const [partySize, setPartySize] = useState(null);
  const [name, setName] = useState(null);
  const [uniqueCode, setUniqueCode] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState({ ok: true, status: null });
  const [restaurantName, setRestaurantName] = useState(null);
  const state = {
    deleteOn,
    partySize,
    name,
    uniqueCode,
    submit,
    error,
    restaurantName
  };

  function handleUpdate(event) {
    setPartySize(parseInt(event.target.value));
  }

  function handleCode(event) {
    setUniqueCode(event.target.value.toUpperCase());
  }

  function handleEdit(object) {
    event.preventDefault();
    const { partySize, uniqueCode } = object;
    setUniqueCode(uniqueCode);
    // THIS NEEDS TO BE CHANGED WHEN WE REFACTOR TO HOOKS
    // THE UNIQUECODE
    const data = {
      partySize,
      uniqueCode
    };
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch('/api/edit-reservation', req)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          setError({ ok: false, status: response.status });
          setSubmit(true);
        }
      })
      .then(data => {
        setRestaurantName(data.restaurantName);
        setPartySize(data.partySize);
        setName(data.customerName);
        setSubmit(true);
      })
      .catch(err => console.error(err));
  }

  function handleDelete(formObject) {
    event.preventDefault();
    const data = formObject;
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch('/api/delete-reservation', req)
      .then(response => {
        if (response.ok) {
          setSubmit(true);
        } else {
          setError({ ok: false, status });
        }
      })
      .catch(err => console.error(err));
  }
  function handleRetry() {
    setPartySize(null);
    setName(null);
    setUniqueCode(null);
    setSubmit(false);
    setError({ ok: true, status: null });
    setRestaurantName(null);
  }

  function render() {
    if (!error.ok) {
      return (
        <ErrorVisual
          reset={handleRetry}
          text={'It looks like the Reservation you were looking for did not exist..'} />
      );
    } else if (submit && deleteOn) {
      return (
        <DeleteComplete reset={handleRetry} />
      );
    } else if (submit) {
      return (
        <EditComplete info={state} />
      );
    } else if (deleteOn) {
      return (
        <DeleteForm
          handleSubmit={handleDelete}
          handleCode={handleCode} />
      );

    } else {
      return (
        <EditForm
          handleAfter={handleUpdate}
          handleCode={handleCode}
          handleSubmit={handleEdit}
        />
      );
    }
  }

  return render();

}

export default ReservationForm;
