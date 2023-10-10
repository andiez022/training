import classNames from 'classnames';
import * as React from 'react';
import ReactModal from 'react-modal';

import Button, { ButtonType } from '../Button/Button';
import { IconSize, ICONS } from '../SVG/Icon';

import './DialogModal.scss';

export interface ModalProps {
  children?: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  width?: ModalWidth;
  type?: ModalType;
  className?: string;
  overlayClassName?: string;
  dataId: string;
  disableCloseButton?: boolean;
}

export enum ModalType {
  DEFAULT = 'DEFAULT',
  FIXED_RIGHT = 'FIXED-RIGHT',
}

export enum ModalWidth {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
  XXL = 'XXL',
}

const Modal: React.FunctionComponent<ModalProps> = ({ width = ModalWidth.MD, type = ModalType.DEFAULT, ...props }: ModalProps) => {
  const classes = classNames('dialog', `dialog--${width.toLowerCase()}`, `dialog--${type.toLowerCase()}`, props.className);
  const overlayClassName = classNames('dialog-overlay', `dialog-overlay--${type.toLowerCase()}`, props.overlayClassName);
  return (
    <ReactModal
      ariaHideApp={false}
      closeTimeoutMS={200}
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      className={classes}
      overlayClassName={overlayClassName}
      testId={props.dataId}
    >
      {props.children}
      {!props.disableCloseButton && (
        <Button
          className="dialog__close"
          iconSize={IconSize.MD}
          buttonType={ButtonType.Icon}
          icon={ICONS.CLOSE}
          onClick={props.onClose}
          dataId="dialog.closeButton"
        />
      )}
    </ReactModal>
  );
};

ReactModal.setAppElement(document.getElementById('root') as HTMLElement);

export default Modal;
