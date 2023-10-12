import React from 'react';
import GuestHeader from '../header/GuestHeader';

import './CampaignView.scss';

const CampaignView: React.FC = () => {
  return (
    <div className="campaign-view">
      <GuestHeader />
      <div className="campaign-view__top">
        <div className="campaign-view__image">
          <div className="campaign-view__image__overlay" />
          <img src="/캠페인_bn.png" alt="campaignBG" />
          <div className="campaign-view__image__icon">
            <img src="icon-캠페인.svg" alt="campaignIcon" />
            <p>깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.</p>
          </div>
        </div>
        <div className="campaign-view__content">
          <div className="campaign-view__table__head">
            <p>공지사항</p>
            <div className="campaign-view__drop-down">
              <p>Dropdown</p>
              <div className="campaign-view_search-area">
                <p>Text Input</p>
                <p>Search Button</p>
              </div>
            </div>
          </div>
          <div className="campaign-view__table__nav">
            <p>Nav here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignView;
