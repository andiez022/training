import classNames from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Button, { ButtonType } from '../Button/Button';

import Modal, { ModalWidth } from './DialogModal';
import './ModalConfirm.scss';

interface ModalConfirmProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string[];
  actions: {
    confirmText: string;
    onSubmit: () => void;
    buttonType?: ButtonType;
  }[];
  className?: string;
}

const ModalConfirm: React.FC<React.PropsWithChildren<ModalConfirmProps>> = ({
  open,
  className,
  description,
  onClose,
  title,
  children,
  actions,
}) => {
  const { t } = useTranslation();
  const modalClasses = classNames('modal-confirm', className);

  return (
    <Modal isOpen={open} width={ModalWidth.MD} onClose={onClose} className={modalClasses} disableCloseButton dataId="modalConfirm">
      <div className="modal-confirm__header">{t(title)}</div>
      <div className="modal-confirm__content">
        <div className="modal-confirm__content--container">
          {description?.length
            ? description.map((text) => (
                <p key={text} className="modal-confirm__description">
                  {t(text)}
                </p>
              ))
            : null}
          {children}
        </div>

        <div className="modal-confirm__action">
          <Button className="modal-confirm__action-button" onClick={onClose} buttonType={ButtonType.Secondary} outline>
            {t('common.text.cancel')}
          </Button>
          {actions.map((action) => (
            <Button
              buttonType={action.buttonType || ButtonType.Primary}
              key={action.confirmText}
              onClick={(e) => {
                e.stopPropagation();
                action.onSubmit();
              }}
              className="modal-confirm__action-button"
            >
              {t(action.confirmText)}
            </Button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
