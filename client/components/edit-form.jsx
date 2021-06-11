import React from 'react';
import Select from '../elements/select.jsx';
import { Field, Form } from 'react-final-form';

function EditForm(props) {

  return (
    <div className="edit-container">
      <div className="update-container">
        <Form
          onSubmit={formObject => {
            props.handleSubmit(formObject);
          }}
          render={({ handleSubmit }) => (
            <form className="update-form" onSubmit={handleSubmit}>
              <p className="reservation-text update-text update-title" style={{ textAlign: 'center' }} htmlFor="update-name">Update Reservation</p>

              <label className="reservation-text update-text" htmlFor="unique-code">Unique Code:</label>
              <Field
                name="uniqueCode"
                id="unique-code"
                component="input"
                type="text"
                placeholder="4 Digit/Letter Code"
                minLength={4}
                maxLength={4}
                tooShort="Unique Code must be 4 Characters"
                required

              />
              <div className="party-size-section">
                <label className="party-text reservation-text" htmlFor="to-party">New Party  Size:</label>
                <Field
                  name="partySize"
                  component="select"
                  id="to-party"
                  className="party-select"
                  parse={value => parseInt(value)}
                  required
                  >
                  {Select}
                </Field>
              </div>
              <button type="submit" className="form-button">Submit</button>
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default EditForm;
