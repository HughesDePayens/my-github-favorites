import React from 'react';

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleActionClick = this.handleActionClick.bind(this);
  }

  buildAction() {
    const action = this.props.action;

    return this.props.isInFavorites ? false : (
      <a href='#' onClick={this.handleActionClick}>{ action.charAt(0).toUpperCase() + action.slice(1) }</a>
    )
  }

  handleActionClick(e) {
    e.preventDefault();
    this.props.handler(this.props.name, this.props.language, this.props.latestTag, this.props.url);
  }


  render() {
    return (
      <tr>
        <td><a href={this.props.url}>{this.props.name}</a></td>
        <td>{this.props.language}</td>
        <td>{this.props.latestTag}</td>
        <td>{this.buildAction()}</td>
      </tr>
    )
  }
}

export default TableRow;
