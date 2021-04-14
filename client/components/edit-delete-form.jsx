import React from 'react';
import Select from '../elements/select.jsx';

function EditForm(props) {
  return (
    <div className="edit-container">
      <div className="update-container">
        <form className="update-form" onSubmit={props.handleSubmit}>
          <label className="reservation-text update-text" htmlFor="update-name">Update Reservation for:</label><br />
          <input type="text" id="update-name" name="name" placeholder="Name.." onChange={props.handleName} required></input>
          <label className="reservation-text update-text" htmlFor="unique-code">Unique Code:</label>
          <input type="text" id="unique-code" name="unique-code" placeholder="4 Digit/Letter Code" onChange={props.handleCode}></input>
          <p className="reservation-text update-text">Party Size:</p>
          <div className="party-size-section">
            <div className="party-half">
              <label className="party-text reservation-text" htmlFor="from-party">For:</label>
              <Select id="from-party" class="party-select" handleChange={props.handleBefore}/>
            </div>
            <div className="party-half">
              <label className="party-text reservation-text" htmlFor="to-party">To:</label>
              <Select id="to-party" class="party-select" handleChange={props.handleAfter}/>
            </div>
          </div>
          <button type="submit" className="form-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
