import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

import './Header.scss';

interface NavLinkProps {
  to: string;
  text: string;
}

const Header: React.FC<{ userRole: string }> = ({ userRole }) => {
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= 200) {
        setIsTransparent(true);
      } else {
        setIsTransparent(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const CustomNavLink: React.FC<NavLinkProps> = ({ to, text }) => {
    return (
      <NavLink to={to} className={(navData) => (navData.isActive ? 'active-link' : 'default-link')} onClick={() => setIsMenuOpen(false)}>
        {text}
      </NavLink>
    );
  };

  const location = useLocation();
  const currentPath = location.pathname;

  const showLinks = currentPath !== '/login' && currentPath !== '/register';
  const isHomePage = currentPath === '/';

  const headerClasses = `app-header ${isMenuOpen ? 'show-menu' : ''} ${!showLinks ? 'hide-links' : ''} ${
    isHomePage && isTransparent ? 'transparent' : ''
  }`;

  const isSmallerScreen = window.innerWidth <= 768;

  return (
    <header className={headerClasses}>
      <div className="header-left">
        <NavLink to="/" className={`header-img ${isSmallerScreen ? 'small-screen' : ''}`} />
        {!showLinks && (
          <div className="header-img-text">
            <p>[ 관리자 ]</p>
          </div>
        )}
      </div>
      {showLinks && (
        <div className="header-right">
          <div className="menu-container" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Icon className="menu-icon" component={isMenuOpen ? ICONS.CLOSE : ICONS.MENU} size={isMenuOpen ? IconSize.LG : IconSize.XL} />
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
        </div>
      )}
    </header>
  );
};

export default Header;
