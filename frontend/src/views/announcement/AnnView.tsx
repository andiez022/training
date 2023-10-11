import React from 'react';
import GuestHeader from '../header/GuestHeader';

import Table from '../../components/Table/Table';

import './AnnView.scss';

const AnnView: React.FC = () => {
  return (
    <div className="ann-view">
      <GuestHeader />
      <div className="ann-view__top">
        <div className="ann-view__image">
          <div className="ann-view__image__overlay" />
          <img src="/공지사항_bn.png" alt="AnnBG" />
          <div className="ann-view__image__icon">
            <img src="icon-공지사항.svg" alt="AnnIcon" />
            <p>깨바부의 새로운 소식을 전합니다.</p>
          </div>
        </div>
        <div className="ann-view__content">
          <div className="ann-view__table__head">
            <p>공지사항</p>
            <p>Search bar here</p>
          </div>
          <div className="ann-view__table__nav">
            <p>Nav here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnView;
