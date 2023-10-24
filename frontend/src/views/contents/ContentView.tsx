import React from 'react';
import Header from '../header/Header';
import VideoCollection from '../../components/VideoCollection/VideoCollection';

import './ContentView.scss';

const ContentView: React.FC<{ userRole: string }> = ({ userRole }) => {
  return (
    <div className="content-view">
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
          <div className="content-view__heading">
            <h2 className="gradual-color-transition">콘텐츠</h2>
          </div>
          <VideoCollection />
        </div>
      </div>
    </div>
  );
};

export default ContentView;
