import React, { useEffect, useState } from 'react';
import logoHeader from '../../common/assets/images/logo-header.svg';
import CardHeader from '../../components/Card/components/CardHeader';
import './Header.scss';

export const Header = () => {
  // const [transparent, setTransparent] = useState(false);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = document.querySelector('.container')?.scrollTop;

  //     if (scrollPosition)
  //       if (scrollPosition < 200) {
  //         setTransparent(true);
  //       } else {
  //         setTransparent(false);
  //       }
  //   };
  //   document.querySelector('.container')?.addEventListener('scroll', handleScroll);
  //   return () => {
  //     document.querySelector('.container')?.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

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
        <a href="./" aria-label="introduction">
          <CardHeader title="소개" />
        </a>
        <a href="./" aria-label="announcement">
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
