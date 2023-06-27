import React, { Component } from 'react';

export class Filter extends Component {
  render() {
    return (
      <>
        <label>
          Find contacts by name
          <input
            type="text"
            value={this.props.value}
            name="filter"
            onChange={this.props.changeValue}
          />
        </label>
      </>
    );
  }
}
