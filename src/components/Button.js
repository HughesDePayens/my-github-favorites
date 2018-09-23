import React from 'react';
class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <button disabled={this.props.disabled}>Search</button>;
  }
}

export default Button;
