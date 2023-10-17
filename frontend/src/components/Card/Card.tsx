import classNames from 'classnames';
import React from 'react';

import './Card.scss';

export interface CardProps {
  className?: string;
  children?: React.ReactNode;
  header?: React.ReactElement;
  footer?: React.ReactElement;
  title?: string;
  content?: string;
  date?: string;
  onClick?: () => void;
}

export type CardType = CardProps;

const Card = ({ children, className, header, footer, title, content, date, onClick }: CardType): React.ReactElement => {
  const classes = classNames('card', className);

  return (
    <div onClick={onClick} className={classes}>
      <span className="card-title">{title}</span>
      <span className="card-content">{content}</span>
      <span className="card-date">{date}</span>
      {children}
      {footer}
    </div>
  );
};

export default Card;
