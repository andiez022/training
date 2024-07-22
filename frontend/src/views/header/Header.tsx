import React, { useEffect, useState } from 'react';
import logoHeader from '../../common/assets/images/logo-header.svg';
import CardHeader from '../../components/Card/components/CardHeader';
import './Header.scss';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

export const Header: React.FC = () => {
  const [showNavRes, setShowNavRes] = useState(false);
  const handleOpenNav = () => {
    setShowNavRes(!showNavRes);
  };
  console.log(showNavRes);

  return (
    <div className="header">
      <div className="header-left">
        <a href="./" aria-label="home">
          <svg className="header-logo">
            <image xlinkHref={logoHeader} />
          </svg>
        </a>
      </div>
      <div className={`header-right ${showNavRes ? 'show' : ''}`}>
        <div className="close-icon card-header" onClick={handleOpenNav}>
          <a href="./" aria-label="home">
            <svg className="header-logo">
              <image xlinkHref={logoHeader} />
            </svg>
          </a>
          <Icon component={ICONS.CLOSE_ICON} size={IconSize.LG} style={{ fill: 'black' }} />
        </div>
        <a href="./" aria-label="home" className="home">
          <CardHeader title="홈" />
        </a>
        <a href="./introduction" aria-label="introduction" className="introduction">
          <CardHeader title="소개" />
        </a>
        <a href="./announcement" aria-label="announcement" className="announcement">
          <CardHeader title="공지사항" />
        </a>
        <a href="./facility" aria-label="facility" className="facility">
          <CardHeader title="시설현황" />
        </a>
        <a href="./content" aria-label="content" className="content">
          <CardHeader title="콘텐츠" />
        </a>
        <a href="./living-lab" aria-label="living-lab" className="living-lab">
          <CardHeader title="콘텐츠" />
        </a>
        <a href="./campain" aria-label="campain" className="campain">
          <CardHeader title="캠페인" />
        </a>
        <a href="./free-board" aria-label="free-board" className="free-board">
          <CardHeader title="자유게시판" />
        </a>
      </div>
      <div className={`icon-nav-bar ${showNavRes ? 'unshow' : ''}`} onClick={handleOpenNav}>
        <Icon component={ICONS.METRO_MENU} size={IconSize.LG} />
      </div>
    </div>
  );
};
