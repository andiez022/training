import React from 'react';
import { CardType } from '../Card/Card';

interface TimeProps {
  time: string;
}
const FormatDate: React.FC<TimeProps> = ({ time }) => {
  const date = new Date(time);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return (
    <div>
      `${day}-${month}-${year}`;
    </div>
  );
};

export default FormatDate;

export function reformatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
