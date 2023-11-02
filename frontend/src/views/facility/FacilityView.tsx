import React, { useState } from 'react';
import { ReactComponent as MyMap } from '../../components/SVG/map.svg';

import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import ItemModal, { FacilityItem } from './ItemModal';

import { FacilityData } from '../../services/constants/constants';

import './FacilityView.scss';

const FacilityView: React.FC<{ userRole: string }> = ({ userRole }) => {
  const isManagerial = userRole === 'admin';

  const columns = [
    { dataId: 'numbering', label: '번호' },
    { dataId: 'district', label: '행정구역' },
    { dataId: 'zone', label: '지대종류' },
    { dataId: 'name', label: '시설명' },
    { dataId: 'size', label: '시설규모' },
    { dataId: 'img', label: '이미지' },
  ];

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

  if (userRole === 'admin') {
    return (
      <div className="facility-view">
        <div className="facility-view__top">
          <div className="facility-view__image">
            <img src="/facility_bn.png" alt="facilityBG" />
          </div>
          <div className="facility-view__content">
            <div className="facility-view__table-head">
              <div className="facility-view__head__title">
                <h2 className="gradual-color-transition">시설현황</h2>
              </div>
              <div className="facility-view__search-container">
                <div className="facility-view__search-area">
                  <TextInput dataId="" placeholder="시설명 검색" />
                  <Button
                    icon={ICONS.MAGNIFIER}
                    iconPlacement={ButtonIconPlacement.Left}
                    iconSize={IconSize.XL}
                    className="button--icon-text"
                  >
                    검색
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                  {FacilityData[area] ? (
                    FacilityData[area].map((item, index) => (
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
