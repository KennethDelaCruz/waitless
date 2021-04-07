import React from 'react';

class Button extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <button type="button" className="buttons">This is a test</button>
    )
  }
}

export default Button;
