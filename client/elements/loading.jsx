import React from 'react';

function Loading(props) {
  return (
    <div className="loading-container">
      <img className={props.class} src="/images/loading.gif" ></img>
    </div>

  );
}

export default Loading;
