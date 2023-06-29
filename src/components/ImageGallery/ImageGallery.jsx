import React, { Component } from 'react';
import { ImageGalleryStyle } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    searchQuery: '',
    imagesData: [],
  };

  componentDidMount() {}

  render() {
    const imagesData = this.props.galleryImages;
    return (
      <ImageGalleryStyle>
        {imagesData.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              url={webformatURL}
              modalUrl={largeImageURL}
            />
          );
        })}
      </ImageGalleryStyle>
    );
  }
}
