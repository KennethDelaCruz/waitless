import React from 'react';
import EditForm from '../components/edit-delete-form.jsx';

class ReservationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      partyBefore: null,
      partyUpdate: null,
      name: null,
      uniqueCode: null,
      submitted: false
    };
    this.handleBefore = this.handleBefore.bind(this);
    this.handleAfter = this.handleAfter.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleCode = this.handleCode.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleBefore(event) {
    this.setState({ partyBefore: event.target.value });
  }

  handleAfter(event) {
    this.setState({ partyUpdate: event.target.value });
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleCode(event) {
    this.setState({ uniqueCode: event.target.value });
  }

  handleEdit() {
    event.preventDefault();
    const { name, partyBefore, partyUpdate, uniqueCode } = this.state;
    const data = {
      name,
      partyBefore,
      partyUpdate,
      uniqueCode
    };
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  }

  render() {

    return (
      <EditForm
        handleBefore={this.handleBefore}
        handleAfter={this.handleAfter}
        handleName={this.handleName}
        handleCode={this.handleCode}
        handleSubmit={this.handleEdit}
      />
    );
  }
}

export default ReservationForm;
