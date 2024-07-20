import React from 'react';
import logoHeader from '../../common/assets/images/logo-header.svg';
import CardHeader from '../../components/Card/components/CardHeader';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header-left">
        <a href="./" aria-label="home">
          <svg className="header-logo">
            <image xlinkHref={logoHeader} />
          </svg>
        </a>
      </div>
      <div className="header-right">
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
    </div>
  );
};
