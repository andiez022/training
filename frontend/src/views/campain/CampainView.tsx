import React from 'react';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import './CampainView.scss';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';
import CampainImg from '../../common/assets/images/campain-img.png';
import CampainImgx2 from '../../common/assets/images/campain-img@2x.png';

const CampainView = () => {
  return (
    <>
      <div className="campain-header">
        <Header />
      </div>
      <div className="campain-container">
        <picture className="campain-container__img">
          <source media="(min-width: 1921px)" srcSet={CampainImgx2} />
          <img src={CampainImg} alt="home" />
        </picture>
        <div className="campain-container__body">
          <div className="campain-container__body-top">
            <p className="text">캠페인</p>
            <div className="campain-container__body-top-right">
              <div className="box1">
                <select className="box1-select" name="filter">
                  <option value="title">제목</option>
                  {/* <option value="writer">작성자</option> */}
                </select>
              </div>
              <div className="box2">
                <input type="text" className="box2-input" placeholder="리빙랩 검색" />
              </div>
              <div className="box3">
                <Icon className="icon-search-glass" component={ICONS.SEARCH_GLASS} size={IconSize.XL} />
                <p className="box3-text">검색</p>
              </div>
            </div>
          </div>
          <div className="campain-container__body-content">
            <div className="campain-container__body-content__item">
              <div className="campain-container__body-content__item-img">
                <img src="https://picsum.photos/200/300?random=1" alt="item-img" />
              </div>
              <div className="campain-container__body-content__item-title">캠페인 제목</div>
            </div>
          </div>
        </div>
      </div>
      <div className="campain-footer">
        <Footer />
      </div>
    </>
  );
};

export default CampainView;
