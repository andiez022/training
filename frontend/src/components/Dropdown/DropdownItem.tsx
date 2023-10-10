import classNames from 'classnames';
import { delay } from 'lodash';
import React from 'react';
import './Dropdown.scss';

export interface DropdownItemProps {
  children?: React.ReactNode;
  hasDivider?: boolean;
  className?: string;
  onClick?: () => void;
  toggleMenu?: (e: React.MouseEvent<any>) => void;
}

export const DropdownItem: React.FunctionComponent<DropdownItemProps> = ({ children, className, hasDivider, onClick, toggleMenu }) => {
  const classes = classNames('dropdown__item', className, { 'dropdown__item--has-divider': hasDivider });

  const handleClick = async (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (toggleMenu) toggleMenu(e);
    if (onClick) delay(onClick, 200);
  };

  return (
    <li className={classes} onClick={handleClick}>
      {children}
    </li>
  );
};

export default DropdownItem;
