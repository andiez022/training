import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.scss';

interface ModalProps {
  isShowing: boolean;
  children: React.ReactElement;
  align?: 'top' | 'left' | 'right' | 'bottom';
}

const Modal: React.FC<ModalProps> = ({ isShowing, align, children }) => {
  const classes = classNames('modal-wrapper', {
    'modal-wrapper--top': align === 'top',
    'modal-wrapper--left': align === 'left',
    'modal-wrapper--right': align === 'right',
    'modal-wrapper--bottom': align === 'bottom',
  });
  return isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay" />
          <div className={classes} aria-modal aria-hidden tabIndex={-1} role="dialog">
            {children}
          </div>
        </>,
        document.body,
      )
    : null;
};

export default Modal;
