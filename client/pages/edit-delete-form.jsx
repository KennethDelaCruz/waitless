import React from 'react';
import EditForm from '../components/edit-delete-form.jsx';
import EditComplete from '../components/edit-complete.jsx';

class ReservationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      partySize: null,
      name: null,
      uniqueCode: null,
      submitted: false,
      error: false,
      restaurantName: null
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleCode = this.handleCode.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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

  render() {
    if (this.state.submitted) {
      return (
        <EditComplete info={this.state} />
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
