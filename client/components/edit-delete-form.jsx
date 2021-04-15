import React from 'react';
import Select from '../elements/select.jsx';

function EditForm(props) {
  return (
    <div className="edit-container">
      <div className="update-container">
        <form className="update-form" onSubmit={props.handleSubmit}>
          <p className="reservation-text update-text update-title" style={{ textAlign: 'center' }} htmlFor="update-name">Update Reservation</p>
          <label className="reservation-text update-text" htmlFor="unique-code">Unique Code:</label>
          <input type="text"
                  id="unique-code"
                  name="unique-code"
                  placeholder="4 Digit/Letter Code"
                  onChange={props.handleCode}
                  minLength="4"
                  maxLength="4"></input>
          <div className="party-size-section">
            <label className="party-text reservation-text" htmlFor="to-party">New Party Size:</label>
            <Select id="to-party" class="party-select" handleChange={props.handleAfter} />
          </div>
          <button type="submit" className="form-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
