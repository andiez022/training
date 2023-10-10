import TFunctionResult from 'i18next';
import React from 'react';
import { Id, toast, ToastOptions } from 'react-toastify';

import Notification from '../../components/Notification/Notification';

export enum NotificationStatus {
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CUSTOM = 'CUSTOM',
}

interface Notify {
  success: NotifyFunction;
  info: NotifyFunction;
  warning: NotifyFunction;
  error: NotifyFunction;
  dismiss: (toastId?: any) => void;
  custom: NotifyFunction;
}

type NotifyFunction = (message: React.ReactNode | typeof TFunctionResult | string, title?: string, config?: ToastOptions) => Id;

const toastOptions: ToastOptions = {
  autoClose: 3000,
  closeButton: false,
};

const showToast = (message: any, options: ToastOptions, status: NotificationStatus, title?: string) =>
  toast(({ closeToast }) => <Notification title={title} message={message} status={status} onClose={closeToast} />, {
    ...toastOptions,
    ...options,
  });

export const notify: Notify = {
  // Success
  success: (message = 'Success!', title, options = { className: 'Toastify__toast--success' }) =>
    showToast(message, options, NotificationStatus.SUCCESS, title),
  // Info
  info: (message, title, options = { className: 'Toastify__toast--info' }) => showToast(message, options, NotificationStatus.INFO, title),
  //
  warning: (message, title, options = { className: 'Toastify__toast--warning' }) =>
    showToast(message, options, NotificationStatus.WARNING, title),
  //
  error: (message = 'An error occurred. Please try again!', title, options = { className: 'Toastify__toast--error' }) =>
    showToast(message, options, NotificationStatus.ERROR, title),
  //
  dismiss: (toastId?: any) => toast.dismiss(toastId),
  //
  custom: (
    message,
    title,
    options = {
      className: 'Toastify__toast--custom',
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: false,
    },
  ) => showToast(message, options, NotificationStatus.CUSTOM, title),
};
