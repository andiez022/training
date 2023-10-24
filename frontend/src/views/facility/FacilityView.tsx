import React, { useState } from 'react';
import { ReactComponent as MyMap } from '../../components/SVG/map.svg';

import './FacilityView.scss';

const FacilityView: React.FC<{ userRole: string }> = ({ userRole }) => {
  const [area, setSelectedArea] = useState('부산');

  const handleMapClick = () => {
    const animationElements = document.querySelectorAll('.animation-g');

    animationElements.forEach((element) => {
      element.addEventListener('click', () => {
        const pathElement = element.querySelector('path');

        if (pathElement) {
          const clickedId = pathElement.id;

          const koreanForm = clickedId.replace(/\\u([\dA-Fa-f]{4})/g, (match, grp) => {
            return String.fromCharCode(parseInt(grp, 16));
          });

          animationElements.forEach((el) => {
            el.classList.remove('selected');
          });

          element.classList.add('selected');

          setSelectedArea(koreanForm);
        }
      });
    });
  };

  const handleDefaultButton = () => {
    setSelectedArea('부산');

    const animationElements = document.querySelectorAll('.animation-g');
    animationElements.forEach((element) => {
      element.classList.remove('selected');
    });
  };

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
          <div className="facility-view__head">
            <div className="facility-view__head__title">
              <h2 className="gradual-color-transition">시설현황</h2>
            </div>
            <div className="facility-view__body">
              <div className="facility-view__map-area">
                <button className={`button ${area === '부산' ? 'selected' : ''}`} onClick={handleDefaultButton}>
                  부산 전체보기
                </button>
                <MyMap className="my-map" onClick={handleMapClick} />
              </div>
              <div className="facility-view__scroll">
                <p>
                  <span>{area}</span> 수거사각지대
                </p>
                <ul className="item-list">
                  <p>현재 사용 가능한 데이터가 없습니다.</p>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityView;
