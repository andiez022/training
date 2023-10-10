import React from 'react';

import './CardHeader.scss';

export interface CardHeaderProps {
  title: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ title }) => {
  return <div className="card-header">{title}</div>;
};

export default CardHeader;
