import React, { Component } from 'react';
import { LoadMoreButtonStyle } from './LoadMoreButton.styled';

export class LoadMoreButton extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <LoadMoreButtonStyle
        onClick={this.props.onLoadMoreBtnClick}
        type="button"
      >
        Load more
      </LoadMoreButtonStyle>
    );
  }
}
