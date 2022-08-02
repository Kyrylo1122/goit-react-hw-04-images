import { useEffect } from 'react';
import { createPortal } from 'react-dom';
const modalContainer = document.querySelector('#modal-root');

export function Modal({ url, onClose }) {
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const handleKeydown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });
  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={url.largeImageURL} alt={url.tags} />
      </div>
    </div>,
    modalContainer
  );
}
