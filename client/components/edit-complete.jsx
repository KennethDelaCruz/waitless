import React from 'react';

function EditComplete(props) {
  return (
    <div className="edit-container">
      <div className="update-container update-complete">
        <p className="complete-title reservation-text update-text">Updated Party Size for <span className="underline">{`${props.info.customerName}`}</span></p>
        <p className="complete-title reservation-text update-text">
          At: <span className="underline">{`${props.info.restaurantName}`}
          </span> to Party of <span className="underline">{`${props.info.partySize}`}</span>
        </p>
        <p className="code-title">Reservation Code</p>
        <div className="uniqueCode-block">
          <h4 className="unique-code">
            {`${props.info.uniqueCode}`}
          </h4>
        </div>

      </div>
    </div>
  );
}

export default EditComplete;
