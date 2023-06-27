import React, { Component } from 'react';
import {
  ImageGalleryItemStyle,
  ImageGalleryItemImgStyle,
} from './ImageGallery.styled';
export class ImageGalleryItem extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <ImageGalleryItemStyle>
        <ImageGalleryItemImgStyle src={this.props.url} />
      </ImageGalleryItemStyle>
    );
  }
}
