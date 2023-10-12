import React from 'react';
import GuestHeader from '../header/GuestHeader';

import './ContentView.scss';

const ContentView: React.FC = () => {
  return (
    <div className="content-view">
      <GuestHeader />
      <div className="content-view__top">
        <div className="content-view__image">
          <div className="content-view__image__overlay" />
          <img src="/콘텐츠_bn.png" alt="contentBG" />
          <div className="content-view__image__icon">
            <img src="icon-콘텐츠.svg" alt="contentIcon" />
            <p>깨바부의 다양한 콘텐츠를 확인해보세요.</p>
          </div>
        </div>
        <div className="content-view__content">
          <div className="content-view__content__title">
            <p>콘텐츠</p>
          </div>
          <div className="content-view__display">
            <div className="content-view__table">
              <p>Table here</p>
            </div>
            <div className="facility-view__nav">
              <p>Nav here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentView;
