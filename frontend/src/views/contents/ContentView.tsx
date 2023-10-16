import React from 'react';
import GuestHeader from '../header/GuestHeader';
import VideoCollection from '../../components/VideoCollection/VideoCollection';

import './ContentView.scss';

const ContentView: React.FC = () => {
  return (
    <div className="content-view">
      <GuestHeader />
      <div className="content-view__top">
        <div className="content-view__image">
          <div className="content-view__image__overlay" />
          <img src="/content_bn.png" alt="contentBG" />
          <div className="content-view__image__icon">
            <img src="/icon_content.svg" alt="contentIcon" />
            <p>깨바부의 다양한 콘텐츠를 확인해보세요.</p>
          </div>
        </div>
        <div className="content-view__content">
          <div className="content-view__content__title">
            <h2 className="gradual-color-transition">콘텐츠</h2>
          </div>
          <div className="content-view__display">
            <VideoCollection />
            {/* <div className="content-view__table" />
            <div className="content-view__nav">
              <button className="prev-page">Previous</button>
              <button className="first-page">First</button>
              <button className="page-number">1</button>
              <button className="last-page">Last</button>
              <button className="next-page">Next</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentView;
