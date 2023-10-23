import React, { useState } from 'react';
import path from 'path';
import { NavLink, useLocation } from 'react-router-dom';
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

const Header: React.FC<{ userRole: string }> = ({ userRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  const showLinks = currentPath !== '/login' && currentPath !== '/register';

  const headerClasses = `app-header ${isMenuOpen ? 'show-menu' : ''} ${!showLinks ? 'hide-links' : ''}`;

  return (
    <header className={headerClasses}>
      <div className="logo">
        <NavLink to="/">
          <img src="/header.svg" alt="Header logo" />
        </NavLink>
        {!showLinks && <p>[ 관리자 ]</p>}
      </div>
      {showLinks && (
        <>
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
        </>
      )}
    </header>
  );
};

export default Header;
