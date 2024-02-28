import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {

    if (isOpen > 0) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-home">
        <button className="close-button" onClick={onClose}>
          Cerrar
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;