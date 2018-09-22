import React from 'react';

class TableRow extends React.Component {
  constructor(props) {
    super(props);
  }

  buildAction() {
    const action = this.props.action;
    return <a href='#'>{ action.charAt(0).toUpperCase() + action.slice(1) }</a>
  }

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.language}</td>
        <td>{this.props.latestTag}</td>
        {this.buildAction()}
      </tr>
    )
  }
}

export default TableRow;
