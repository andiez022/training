import classNames from 'classnames';
import React from 'react';

import './Card.scss';
import CardHeader from './components/CardHeader';

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  header?: React.ReactElement;
  footer?: React.ReactElement;
  title?: string;
  onClick?: () => void;
}

export type CardType = CardProps;

const Card = ({ children, className, header, footer, title, onClick }: CardType): React.ReactElement => {
  const classes = classNames('card', className);

  return (
    <div onClick={onClick} className={classes}>
      {title ? <CardHeader title={title} /> : header}
      {children}
      {footer}
    </div>
  );
};

export default Card;
