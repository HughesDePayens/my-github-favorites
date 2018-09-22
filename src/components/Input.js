import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input type='text' onChange={this.props.handler} />
    )
  }
}

export default Input;
