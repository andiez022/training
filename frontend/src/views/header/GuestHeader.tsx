import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const GuestHeader = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">
          <img src="logo.svg" alt="Logo" />
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/" className="common-link-style">
          홈
        </Link>
        <Link to="/intro" className="common-link-style">
          소개
        </Link>
        <Link to="/announcement" className="common-link-style">
          공지사항
        </Link>
        <Link to="/contact" className="common-link-style">
          시설현황
        </Link>
        <Link to="/contact" className="common-link-style">
          콘텐츠
        </Link>
        <Link to="/contact" className="common-link-style">
          리빙랩
        </Link>
        <Link to="/contact" className="common-link-style">
          캠페인
        </Link>
        <Link to="/contact" className="common-link-style">
          자유게시판
        </Link>
      </nav>
    </header>
  );
};

export default GuestHeader;
