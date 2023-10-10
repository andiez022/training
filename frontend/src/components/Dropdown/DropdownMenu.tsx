import React from 'react';
import { DropdownItemProps } from './DropdownItem';
import './Dropdown.scss';

export interface DropdownMenuProps {
  children: React.ReactElement<DropdownItemProps, any> | React.ReactElement<DropdownItemProps, any>[];
  toggleMenu: (e: React.MouseEvent<any>) => void;
}

export const Menu: React.FunctionComponent<DropdownMenuProps> = ({ children, toggleMenu }) => {
  return (
    <div className="menu-wrapper">
      <ul className="dropdown-menu">
        {React.Children.map(children, (e: React.ReactElement<DropdownItemProps, any>) => {
          if (React.isValidElement(e)) {
            return React.cloneElement(e, {
              toggleMenu,
            });
          }
          return null;
        })}
      </ul>
    </div>
  );
};
export default Menu;
