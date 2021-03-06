import React from 'react';

import TableHead from './TableHead';
import TableRow from './TableRow';

class Panel extends React.Component {
  constructor(props) {
    super(props);
  }

  buildTableRows() {
    const rows = [];

    this.props.rows.forEach((item, idx) => {
      rows.push(
        <TableRow name={item.name}
          url={item.url}
          language={item.language}
          latestTag={item.latestTag}
          role={this.props.role}
          action={this.props.action}
          isInFavorites={item.isInFavorites}
          handler={this.props.handler}
          key={idx} />
      );
    });

    return rows;
  }

  render() {
    return (
      <section className={this.props.panelClass}>
        <table>
          <TableHead />

          <tbody>
            {this.buildTableRows()}
          </tbody>
        </table>
      </section>
    )
  }
}

export default Panel;
