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
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formObject)
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

// class ReservationForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       deleteOn: this.props.delete ? true : null,
//       partySize: null,
//       name: null,
//       uniqueCode: null,
//       submitted: false,
//       errorObject: { ok: true, status: null },
//       restaurantName: null
//     };
//     this.handleUpdate = this.handleUpdate.bind(this);
//     this.handleName = this.handleName.bind(this);
//     this.handleCode = this.handleCode.bind(this);
//     this.handleEdit = this.handleEdit.bind(this);
//     this.handleDelete = this.handleDelete.bind(this);
//     this.handleRetry = this.handleRetry.bind(this);
//   }

//   handleUpdate(event) {
//     this.setState({ partySize: parseInt(event.target.value) });
//   }

//   handleName(event) {
//     this.setState({ name: event.target.value.toUpperCase() });
//   }

//   handleCode(event) {
//     this.setState({ uniqueCode: event.target.value.toUpperCase() });
//   }

//   handleEdit() {
//     event.preventDefault();
//     const { partySize, uniqueCode } = this.state;
//     const data = {
//       partySize,
//       uniqueCode
//     };
//     const req = {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     };
//     fetch('/api/edit-reservation', req)
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           this.setState({ errorObject: { ok: false, status: response.status }, submitted: true });
//         }
//       })
//       .then(data => {
//         const { restaurantName, partySize, customerName } = data;
//         this.setState({
//           restaurantName,
//           partySize,
//           name: customerName,
//           submitted: true
//         });
//       })
//       .catch(err => console.error(err));
//   }

//   handleDelete() {
//     event.preventDefault();
//     const { uniqueCode } = this.state;
//     const data = { uniqueCode };
//     const req = {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     };
//     fetch('/api/delete-reservation', req)
//       .then(response => {
//         if (response.ok) {
//           this.setState({ submitted: true });
//         } else {
//           const { ok, status, statusText } = response;
//           this.setState({ errorObject: { ok, status, statusText } });
//         }
//       })
//       .catch(err => console.error(err));
//   }

//   handleRetry() {
//     this.setState({
//       partySize: null,
//       name: null,
//       uniqueCode: null,
//       submitted: false,
//       errorObject: { ok: true, status: null, statusText: null },
//       restaurantName: null
//     });
//   }

//   render() {
//     if (!this.state.errorObject.ok) {
//       return (
//         <ErrorVisual
//         reset={this.handleRetry}
//         text={'It looks like the Reservation you were looking for did not exist..'}/>
//       );
//     } else if (this.state.submitted && this.state.deleteOn) {
//       return (
//         <DeleteComplete reset={this.handleRetry}/>
//       );
//     } else if (this.state.submitted) {
//       return (
//         <EditComplete info={this.state} />
//       );
//     } else if (this.state.deleteOn) {
//       return (
//         <DeleteForm
//         handleSubmit={this.handleDelete}
//         handleCode={this.handleCode} />
//       );

//     } else {
//       return (
//       <EditForm
//         handleAfter={this.handleUpdate}
//         handleCode={this.handleCode}
//         handleSubmit={this.handleEdit}
//       />
//       );
//     }

//   }
// }

export default ReservationForm;
