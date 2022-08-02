import { Component } from 'react';
import { createPortal } from 'react-dom';
const modalContainer = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }
  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdroClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const { url } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdroClick}>
        <div className="Modal">
          <img src={url.largeImageURL} alt={url.tags} />
        </div>
      </div>,
      modalContainer
    );
  }
}
