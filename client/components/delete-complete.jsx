import React from 'react';

function DeleteComplete(props) {
  return (
    <div className="edit-container">
      <div className="error-container edit-container">
        <div className="error-section">
          <p className="error-title" style={{ textAlign: 'center' }}>{'Request has been sucessfully deleted!'}</p>
        </div>
        <div className="error-section">
          <p className="error-back underline" onClick={props.reset}>Return to request page</p>
        </div>
      </div>

    </div>
  );
}

export default DeleteComplete;
