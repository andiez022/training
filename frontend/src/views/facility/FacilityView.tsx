import React, { useState } from 'react';
import Header from '../header/Header';

import './FacilityView.scss';

const FacilityView: React.FC = () => {
  const [area, setSelectedArea] = useState('부산');

  return (
    <div className="facility-view">
      <div className="facility-view__top">
        <div className="facility-view__image">
          <div className="facility-view__image__overlay" />
          <img src="/facility_bn.png" alt="facilityBG" />
          <div className="facility-view__image__icon">
            <img src="icon_facility.svg" alt="facilityIcon" />
            <p>깨끗한 바다 산을 위해 각 지역별 쓰레기 수거현황을 전합니다.</p>
          </div>
        </div>
        <div className="facility-view__content">
          <h2 className="gradual-color-transition">시설현황</h2>
          <div className="facility-view__display">
            <div className="facility-view__map-area">
              <button>부산 전체보기</button>
              <img src="/map.svg" alt="map" />
            </div>
            <div className="facility-view__scroll">
              <span>{area} 수거사각지대</span>
              <ul className="item-list">
                <span>현재 사용 가능한 데이터가 없습니다.</span>
                {/* <li className="item">
                  <h2>Title 1</h2>
                  <img src="image1.jpg" alt="1" />
                  <p>Description 1</p>
                </li>
                <li className="item">
                  <h2>Title 2</h2>
                  <img src="image2.jpg" alt="2" />
                  <p>Description 2</p>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityView;
