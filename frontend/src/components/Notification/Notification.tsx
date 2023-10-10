import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Icon, { ICONS, IconSize } from '../SVG/Icon';
import { NotificationStatus } from '../../common/utils/notify';

import './Notification.scss';

interface NotificationProps {
  title?: string;
  message: string | React.ReactNode;
  status: NotificationStatus;
  onClose: (() => void) | undefined;
  className?: string;
}

const Notification: React.FC<NotificationProps> = ({ title, message, status, className, onClose }): React.ReactElement => {
  const { t } = useTranslation();
  const [isExpand, setIsExpand] = useState(true);

  const notificationStatus = {
    [NotificationStatus.SUCCESS]: {
      className: 'notification--success',
      icon: <Icon component={ICONS.SUCCESS_CIRCLE} size={IconSize.LG} />,
      closeIcon: <Icon component={ICONS.CLOSE} size={IconSize.XS} className="notification__icon" />,
    },
    [NotificationStatus.INFO]: {
      className: 'notification--info',
      icon: <Icon component={ICONS.INFO_CIRCLE} size={IconSize.LG} />,
      closeIcon: <Icon component={ICONS.CLOSE} size={IconSize.XS} className="notification__icon" />,
    },
    [NotificationStatus.WARNING]: {
      className: 'notification--warning',
      icon: <Icon component={ICONS.WARNING_CIRCLE} size={IconSize.LG} />,
      closeIcon: <Icon component={ICONS.CLOSE} size={IconSize.XS} className="notification__icon" />,
    },
    [NotificationStatus.ERROR]: {
      className: 'notification--error',
      icon: <Icon component={ICONS.ERROR_CIRCLE} size={IconSize.LG} />,
      closeIcon: <Icon component={ICONS.CLOSE} size={IconSize.XS} className="notification__icon" />,
    },
    [NotificationStatus.CUSTOM]: {
      className: 'notification--custom',
      icon: <Icon component={ICONS.ERROR_CIRCLE} size={IconSize.LG} />,
      closeIcon: <Icon component={ICONS.CLOSE} size={IconSize.SM} className="notification--custom-icon" />,
    },
  };

  return (
    <div className={`notification ${className} ${notificationStatus[status].className}`}>
      {status === NotificationStatus.CUSTOM && (
        <div className="notification--custom-header">
          <div className="notification--custom-title">{title}</div>
          <div className="notification--custom-close">
            <div
              className="notification--custom-expand"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpand(!isExpand);
              }}
            >
              <Icon component={isExpand ? ICONS.EXPAND_MORE : ICONS.EXPAND_LESS} size={IconSize.MD} />
            </div>
            {onClose && notificationStatus[status].closeIcon}
          </div>
        </div>
      )}
      {status === NotificationStatus.CUSTOM && <div className={`notification--custom-body--${isExpand ? 'show' : 'hide'}`}>{message}</div>}
      {status !== NotificationStatus.CUSTOM && (
        <div className="notification__icon notification__icon-type">{notificationStatus[status].icon}</div>
      )}
      {status !== NotificationStatus.CUSTOM && (
        <div className="notification__body">
          <div className="notification__wrapper">
            {title && <span className="notification__title">{t(title)}</span>}
            <span className="notification__content">
              {typeof message === 'string' ? <Trans i18nKey={message} components={{ bold: <b /> }} /> : message}
            </span>
          </div>
          {onClose && notificationStatus[status].closeIcon}
        </div>
      )}
    </div>
  );
};

export default Notification;
