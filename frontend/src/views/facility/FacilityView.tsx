import React from 'react';
import GuestHeader from '../header/GuestHeader';

import './FacilityView.scss';

const FacilityView: React.FC = () => {
  return (
    <div className="facility-view">
      <GuestHeader />
      <div className="facility-view__top">
        <div className="facility-view__image">
          <div className="facility-view__image__overlay" />
          <img src="/시설현황_bn.png" alt="facilityBG" />
          <div className="facility-view__image__icon">
            <img src="icon-시설현황.svg" alt="facilityIcon" />
            <p>깨끗한 바다 산을 위해 각 지역별 쓰레기 수거현황을 전합니다.</p>
          </div>
        </div>
        <div className="facility-view__content">
          <div className="facility-view_content_title">
            <p>시설현황</p>
          </div>
          <div className="facility-view__display">
            <div className="facility-view__map-area">
              <p>Button here</p>
              <p>Map handling</p>
            </div>
            <div className="facility-view__status">
              <p>Area-text</p>
              <p>ScrollingView handling</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityView;
