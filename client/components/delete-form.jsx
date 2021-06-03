import React from 'react';
import { Field, Form } from 'react-final-form';

// function DeleteForm(props) {
//   return (
//     <div className="edit-container">
//       <div className="update-container">
//         <form className="update-form" onSubmit={props.handleSubmit}>
//           <p className="reservation-text update-text update-title" style={{ textAlign: 'center' }} htmlFor="update-name">Cancel Reservation</p>
//           <label className="reservation-text update-text" htmlFor="unique-code">Unique Code:</label>
//           <input type="text"
//             id="unique-code"
//             name="unique-code"
//             placeholder="4 Digit/Letter Code"
//             onChange={props.handleCode}
//             minLength="4"
//             maxLength="4"></input>
//           <button type="submit" className="form-button cancel">Cancel</button>
//         </form>
//       </div>
//     </div>
//   );
// }

function DeleteForm(props) {
  return (
    <div className="edit-container">
      <div className="update-container">
        <Form
          onSubmit={formObject => {
            props.handleSubmit(formObject);
          }}
          render={({ handleSubmit }) => (
            <form className="update-form" onSubmit={handleSubmit}>
              <p className="reservation-text update-text update-title" style={{ textAlign: 'center' }} htmlFor="update-name">Cancel Reservation</p>
              <label className="reservation-text update-text" html="unique-code">UniqueCode:</label>
              <Field
                type="text"
                id="unique-code"
                name="uniqueCode"
                component="input"
                placeholder="4 Digit/Letter Code"
                minLength={4}
                maxLength={4}
                required
              />
              <button type="submit" className="form-button cancel">Cancel</button>
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default DeleteForm;
