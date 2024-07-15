import React from 'react';
import './Facility.scss';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';

import facilityImg from '../../common/assets/images/facility-img.png';
import facilityImgx2 from '../../common/assets/images/facility-img@2x.png';
import facilityMap from '../../common/assets/images/facility-map.png';
import facilityMapx2 from '../../common/assets/images/facility-map@2x.png';

const Facility = () => {
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
          </picture>
        </div>
        <div className="facility-container__body">
          <p className="facility-container__body-title">시설현황</p>
          <div className="facility-container__body-content">
            <div className="facility-container__body-content-left">
              <p className="view-text">부산 전체보기</p>
              <picture>
                <source media="(min-width: 1921px)" srcSet={facilityMapx2} />
                <img src={facilityMap} alt="home1" />
              </picture>
            </div>
            <div className="facility-container__body-content-right">
              <p className="colection-spot-text">
                <span>영도구</span> 수거사각지대
              </p>
              <div className="colection-spot-items">
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
