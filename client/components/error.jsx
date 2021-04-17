import React from 'react';

function ErrorVisual(props) {
  return (
    <div className="edit-container">
      <div className="error-container edit-container">
        <div className="error-section">
          <p className="error-title">{'Oh no!'}</p>
          <p className="error-text">{props.text}</p>
        </div>
        <div className="error-section">
          <p className="error-back underline" onClick={props.reset}>Please retry request</p>
        </div>
      </div>

    </div>
  );
}

export default ErrorVisual;
