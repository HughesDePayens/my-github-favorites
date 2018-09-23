import React from 'react';

import Button from './Button';
import Input from './Input';


class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className='search-form' onSubmit={this.props.action}>
        <Input searchInputValue={this.props.searchInputValue}
          handler={this.props.inputHandler} />
        <Button disabled={!this.props.searchInputValue ? true : false} />
      </form>
    );
  }
}


export default Form;
