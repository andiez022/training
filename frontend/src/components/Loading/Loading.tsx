import classNames from 'classnames';
import React from 'react';
import './Loading.scss';

export interface LoadingProps {
  className?: string;
  spinnerClassName?: string;
  size?: LoadingType;
}

export type LoadingType = 'xs' | 'sm' | 'md' | 'lg';

const Loading: React.FunctionComponent<LoadingProps> = ({ className, spinnerClassName, size = 'sm' }) => {
  const classes = classNames('loading-spinner', className);
  const spinnerClasses = classNames(
    'loading-spinner__content__spinner',
    {
      'loading-spinner__content__spinner--xs': size === 'xs',
      'loading-spinner__content__spinner--sm': size === 'sm',
      'loading-spinner__content__spinner--md': size === 'md',
      'loading-spinner__content__spinner--lg': size === 'lg',
    },
    spinnerClassName,
  );

  return (
    <div className={classes}>
      <div className="loading-spinner__content">
        <div className={spinnerClasses} />
      </div>
    </div>
  );
};

export default Loading;
