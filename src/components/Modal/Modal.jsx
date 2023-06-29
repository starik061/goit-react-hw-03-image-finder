import { Component } from 'react';
import { Overlay, ModalContainer } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeKeydown);
  }

  handleEscapeKeydown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleOverlayClick = () => {
    this.props.onClose();
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <ModalContainer src={this.props.modalUrl} />
      </Overlay>,
      modalRoot
    );
  }
}
