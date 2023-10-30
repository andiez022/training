import React, { useState } from 'react';
import { ReactComponent as MyMap } from '../../components/SVG/map.svg';

import ItemModal, { FacilityItem } from './ItemModal';

import './FacilityView.scss';

interface AreaData {
  [area: string]: FacilityItem[];
}

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

  const [selectedItem, setSelectedItem] = useState<FacilityItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleFacilityClick = (item: FacilityItem) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const data: AreaData = {
    부산: [
      {
        title: '부산국립해양대학교 진입로 방파재',
        img: '/logo192.png',
        location: '영도구 해양로 435',
        dimension: '길이 590m / 폭 9m',
        status: 'E',
        details: [
          { date: '2022.03.22', hour: 4, amount: 3, effort: 12 },
          { date: '2022.05.20', hour: 3, amount: 2, effort: 15 },
          { date: '2022.03.22', hour: 5, amount: 5, effort: 10 },
          { date: '2022.03.22', hour: 5, amount: 5, effort: 10 },
        ],
      },
      {
        title: '부산국립해양대학교 진입로 방파재',
        img: '/ctest.jpg',
        location: '영도구 해양로 435',
        dimension: '길이 590m / 폭 9m',
        status: 'E',
      },
      {
        title: '부산국립해양대학교 진입로 방파재',
        img: '/logo192.png',
        location: '영도구 해양로 435',
        dimension: '길이 590m / 폭 9m',
        status: 'E',
      },
      {
        title: '부산국립해양대학교 진입로 방파재',
        img: '/logo192.png',
        location: '영도구 해양로 435',
        dimension: '길이 590m / 폭 9m',
        status: 'E',
      },
      {
        title: '부산국립해양대학교 진입로 방파재',
        img: '/logo192.png',
        location: '영도구 해양로 435',
        dimension: '길이 590m / 폭 9m',
        status: 'E',
      },
      {
        title: '부산국립해양대학교 진입로 방파재',
        img: 'item1.jpg',
        location: '영도구 해양로 435',
        dimension: '길이 590m / 폭 9m',
        status: 'E',
      },
    ],
    기장군: [
      {
        title: '부산국립해양대학교 진입로 방파재',
        img: '/logo192.png',
        location: '영도구 해양로 435',
        dimension: '길이 590m / 폭 9m',
        status: 'E',
      },
      {
        title: '부산국립해양대학교 진입로 방파재',
        img: 'item1.jpg',
        location: '영도구 해양로 435',
        dimension: '길이 590m / 폭 9m',
        status: 'E',
      },
    ],
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
                <div className="facility-view__scroll__title">
                  <span>{area}</span> 수거사각지대
                </div>
                <ul className="item-list">
                  {data[area] ? (
                    data[area].map((item, index) => (
                      <li key={item.title} className="item" onClick={() => handleFacilityClick(item)}>
                        <div className="item-title">{item.title}</div>
                        <div className="item-content">
                          <img src={item.img} alt={item.img} />
                          <ul className="item-data">
                            <li>
                              <span className="icon-span" />
                              위치 : {item.location}
                            </li>
                            <li>
                              <span className="icon-span" />
                              규모 : {item.dimension}
                            </li>
                            <li>
                              <span className="icon-span" />
                              쓰레기현황등급 : {item.status}
                            </li>
                          </ul>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p>현재 사용 가능한 데이터가 없습니다.</p>
                  )}
                </ul>
              </div>
              {selectedItem && <ItemModal facilityItem={selectedItem} isOpen={isOpen} onClose={handleClose} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityView;
