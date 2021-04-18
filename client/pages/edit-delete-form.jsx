import React from 'react';
import EditForm from '../components/edit-form.jsx';
import EditComplete from '../components/edit-complete.jsx';
import DeleteForm from '../components/delete-form.jsx';
import ErrorVisual from '../components/error.jsx';
import DeleteComplete from '../components/delete-complete.jsx';

class ReservationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteOn: this.props.delete ? true : null,
      partySize: null,
      name: null,
      uniqueCode: null,
      submitted: false,
      errorObject: { ok: true, status: null },
      restaurantName: null
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleCode = this.handleCode.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRetry = this.handleRetry.bind(this);
  }

  handleUpdate(event) {
    this.setState({ partySize: parseInt(event.target.value) });
  }

  handleName(event) {
    this.setState({ name: event.target.value.toUpperCase() });
  }

  handleCode(event) {
    this.setState({ uniqueCode: event.target.value.toUpperCase() });
  }

  handleEdit() {
    event.preventDefault();
    const { partySize, uniqueCode } = this.state;
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
      .then(response => response.json())
      .then(data => {
        const { restaurantName, partySize, customerName } = data;
        this.setState({
          restaurantName,
          partySize,
          name: customerName,
          submitted: true
        });
      })
      .catch(err => console.error(err));
  }

  handleDelete() {
    event.preventDefault();
    const { uniqueCode } = this.state;
    const data = { uniqueCode };
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
          this.setState({ submitted: true });
        } else {
          const { ok, status, statusText } = response;
          this.setState({ errorObject: { ok, status, statusText } });
        }
      })
      .catch(err => console.error(err));
  }

  handleRetry() {
    this.setState({
      partySize: null,
      name: null,
      uniqueCode: null,
      submitted: false,
      errorObject: { ok: true, status: null, statusText: null },
      restaurantName: null
    });
  }

  render() {
    if (!this.state.errorObject.ok) {
      return (
        <ErrorVisual
        reset={this.handleRetry}
        text={'It looks like the Reservation you were looking for did not exist..'}/>
      );
    } else if (this.state.submitted && this.state.deleteOn) {
      return (
        <DeleteComplete reset={this.handleRetry}/>
      );
    } else if (this.state.submitted) {
      return (
        <EditComplete info={this.state} />
      );
    } else if (this.state.deleteOn) {
      return (
        <DeleteForm
        handleSubmit={this.handleDelete}
        handleCode={this.handleCode} />
      );

    } else {
      return (
      <EditForm
        handleAfter={this.handleUpdate}
        handleCode={this.handleCode}
        handleSubmit={this.handleEdit}
      />
      );
    }

  }
}

export default ReservationForm;
