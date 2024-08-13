import React, { useEffect, useState } from 'react';
import './FacilityView.scss';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';

import facilityImg from '../../common/assets/images/facility-img.png';
import facilityImgx2 from '../../common/assets/images/facility-img@2x.png';
import facilityIcon from '../../common/assets/images/icon-facility.png';
import facilityIconx2 from '../../common/assets/images/icon-facility@2x.png';
import { ReactComponent as FacilityMap } from '../../components/SVG/map/map.svg';

const Facility = () => {
  const [selectArea, setSelectArea] = useState<string | null>(null);
  console.log(selectArea);

  const handleSelectArea = () => {
    const selectElements = document.querySelectorAll('.map-animation');

    selectElements.forEach((element) => {
      element.addEventListener('click', () => {
        const pathElement = element.querySelector('path');

        if (pathElement) {
          const selectId = pathElement.id;
          const koreanForm = selectId.replace(/\\u([\dA-Fa-f]{4})/g, (_, grp) => {
            return String.fromCharCode(parseInt(grp, 16));
          });
          selectElements.forEach((element) => {
            element.classList.remove('selected');
          });

          element.classList.add('selected');
          setSelectArea(koreanForm);
        }
      });
    });
  };
  const handleRemoveArea = () => {
    const selectElements = document.querySelectorAll('.map-animation');
    selectElements.forEach((element) => {
      element.classList.remove('selected');
    });
    setSelectArea(null);
  };
  return (
    <>
      <div className="facility-header">
        <Header />
      </div>
      <div className="facility-container">
        <div className="facility-container__img">
          <picture>
            <source media="(min-width: 1921px)" srcSet={facilityImgx2} />
            <img src={facilityImg} alt="home1" />
            <div className="facility-container__img__text-overlay">
              <picture className="facility-container__img__text-overlay-icon" data-aos="fade-up">
                <source media="(min-width: 1921px)" srcSet={facilityIconx2} />
                <img src={facilityIcon} alt="facility" />
              </picture>
              <p data-aos="fade-up">깨끗한 바다 부산을 위해 시민들이 직접 참여 중인 프로젝트를 소개합니다.</p>
            </div>
          </picture>
        </div>
        <div className="facility-container__body">
          <p className="facility-container__body-title">시설현황</p>
          <div className="facility-container__body-content">
            <div className="facility-container__body-content-left">
              <p className={`view-text ${selectArea ? 'area-chosen' : ''} `} onClick={handleRemoveArea}>
                부산 전체보기
              </p>
              <div className="map-svg">
                <FacilityMap onClick={handleSelectArea} />
              </div>
            </div>
            <div className="facility-container__body-content-right">
              <p className="colection-spot-text">
                <span>{selectArea || '부산'}</span>수거사각지대
              </p>
              <div className="colection-spot-items">
                {/* <div className="colection-spot-item">
                  <div className="colection-spot-item__title">
                    <p>부산국립해양대학교 진입로 방파재</p>
                    <div className="colection-spot-item__content">
                      <div className="colection-spot-item__content-img"> </div>
                      <div className="colection-spot-item__content-infos">
                        <div className="info">
                          <div className="dot"> </div>
                          <p>위치 : 영도구 해양로 435</p>
                        </div>
                        <div className="info">
                          <div className="dot"> </div>
                          <p>길이 590m</p>
                        </div>
                      </div>
                    </div>
                    <div className="line"> </div>
                  </div>
                </div>
                <div className="colection-spot-item">
                  <div className="colection-spot-item__title">
                    <p>부산국립해양대학교 진입로 방파재</p>
                    <div className="colection-spot-item__content">
                      <div className="colection-spot-item__content-img"> </div>
                      <div className="colection-spot-item__content-infos">
                        <div className="info">
                          <div className="dot"> </div>
                          <p>위치 : 영도구 해양로 435</p>
                        </div>
                        <div className="info">
                          <div className="dot"> </div>
                          <p>길이 590m</p>
                        </div>
                      </div>
                    </div>
                    <div className="line"> </div>
                  </div>
                </div>
                <div className="colection-spot-item">
                  <div className="colection-spot-item__title">
                    <p>부산국립해양대학교 진입로 방파재</p>
                    <div className="colection-spot-item__content">
                      <div className="colection-spot-item__content-img"> </div>
                      <div className="colection-spot-item__content-infos">
                        <div className="info">
                          <div className="dot"> </div>
                          <p>위치 : 영도구 해양로 435</p>
                        </div>
                        <div className="info">
                          <div className="dot"> </div>
                          <p>길이 590m</p>
                        </div>
                      </div>
                    </div>
                    <div className="line"> </div>
                  </div>
                </div> */}
                <p className="text-no-data">현재 사용 가능한 데이터가 없습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="falicity-footer">
        <Footer />
      </div>
    </>
  );
};

export default Facility;
