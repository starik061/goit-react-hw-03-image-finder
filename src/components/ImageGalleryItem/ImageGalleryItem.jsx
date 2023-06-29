import React, { Component } from 'react';
import {
  ImageGalleryItemStyle,
  ImageGalleryItemImgStyle,
} from './ImageGallery.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = { openModal: false };

  componentDidMount() {}
  closeModal = () => {
    this.setState({ openModal: false });
  };
  render() {
    return (
      <ImageGalleryItemStyle>
        <ImageGalleryItemImgStyle
          onClick={() => {
            this.setState({ openModal: true });
          }}
          src={this.props.url}
        />
        {this.state.openModal && (
          <Modal onClose={this.closeModal} modalUrl={this.props.modalUrl} />
        )}
      </ImageGalleryItemStyle>
    );
  }
}
