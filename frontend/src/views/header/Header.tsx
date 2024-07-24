import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoHeader from '../../common/assets/images/logo-header.svg';
import CardHeader from '../../components/Card/components/CardHeader';
import './Header.scss';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

export const Header: React.FC = () => {
  const [showNavRes, setShowNavRes] = useState(false);
  const handleOpenNav = () => {
    setShowNavRes(!showNavRes);
  };

  return (
    <div className={`header ${showNavRes ? 'show' : ''}`}>
      <div className="header-left">
        <Link to="/">
          <svg className="header-logo">
            <image xlinkHref={logoHeader} />
          </svg>
        </Link>
      </div>
      <div className="header-right">
        <div className="close-icon icon-nav-bar" onClick={handleOpenNav}>
          {showNavRes ? (
            <Icon component={ICONS.CLOSE_ICON} size={IconSize.LG} style={{ fill: 'black' }} />
          ) : (
            <Icon component={ICONS.METRO_MENU} size={IconSize.LG} />
          )}
        </div>
        <div className={`header-right__card ${showNavRes ? 'show' : ''}`}>
          <NavLink to="/" className="home">
            <CardHeader title="홈" />
          </NavLink>

          <NavLink to="/introduction" className="introduction">
            <CardHeader title="소개" />
          </NavLink>

          <NavLink to="/announcement" className="announcement">
            <CardHeader title="공지사항" />
          </NavLink>

          <NavLink to="/facility" className="facility">
            <CardHeader title="시설현황" />
          </NavLink>

          <NavLink to="/content" className="content">
            <CardHeader title="콘텐츠" />
          </NavLink>

          <NavLink to="/living-lab" className="living-lab">
            <CardHeader title="콘텐츠" />
          </NavLink>

          <NavLink to="/campain" className="campain">
            <CardHeader title="캠페인" />
          </NavLink>

          <NavLink to="/free-board" className="free-board">
            <CardHeader title="자유게시판" />
          </NavLink>
        </div>
      </div>
      {/* <div className={`icon-nav-bar ${showNavRes ? '' : 'unshow'}`} onClick={handleOpenNav}>
        <Icon component={ICONS.METRO_MENU} size={IconSize.LG} />
      </div> */}
    </div>
  );
};
