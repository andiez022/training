import React, { useEffect, useState } from 'react';
import logoHeader from '../../common/assets/images/logo-header.svg';
import CardHeader from '../../components/Card/components/CardHeader';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header-left">
        <svg className="header-logo">
          <image xlinkHref={logoHeader} />
        </svg>
      </div>
      <div className="header-right">
        <a href="./" aria-label="home">
          <CardHeader title="홈" />
        </a>
        <a href="./introduction" aria-label="introduction">
          <CardHeader title="소개" />
        </a>
        <a href="./announcement" aria-label="announcement">
          <CardHeader title="공지사항" />
        </a>
        <a href="./" aria-label="facility">
          <CardHeader title="시설현황" />
        </a>
        <a href="./" aria-label="content">
          <CardHeader title="콘텐츠" />
        </a>
        <a href="./" aria-label="living-lab ">
          <CardHeader title="콘텐츠" />
        </a>
        <a href="./" aria-label="campain">
          <CardHeader title="캠페인" />
        </a>
        <a href="./" aria-label="free-board">
          <CardHeader title="자유게시판" />
        </a>
      </div>
    </div>
  );
};
