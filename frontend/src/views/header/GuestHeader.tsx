import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

import './Header.scss';

interface NavLinkProps {
  to: string;
  text: string;
}

const CustomNavLink: React.FC<NavLinkProps> = ({ to, text }) => {
  return (
    <NavLink to={to} className={(navData) => (navData.isActive ? 'active-link' : 'default-link')}>
      {text}
    </NavLink>
  );
};

const GuestHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`app-header ${isMenuOpen ? 'show-menu' : ''}`}>
      <div className="logo">
        <NavLink to="/">
          <img src="header.svg" alt="Header logo" />
        </NavLink>
      </div>
      <nav className={`nav-links ${isMenuOpen ? 'show-menu' : ''}`}>
        <CustomNavLink to="/" text="홈" />
        <CustomNavLink to="/intro" text="소개" />
        <CustomNavLink to="/announcement" text="공지사항" />
        <CustomNavLink to="/facility" text="시설현황" />
        <CustomNavLink to="/content" text="콘텐츠" />
        <CustomNavLink to="/lab" text="리빙랩" />
        <CustomNavLink to="/campaign" text="캠페인" />
        <CustomNavLink to="/board" text="자유게시판" />
      </nav>
      <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Icon className="icon" component={isMenuOpen ? ICONS.CLOSE : ICONS.EXPAND_MORE} size={IconSize.XL} />
      </div>
    </header>
  );
};

export default GuestHeader;
