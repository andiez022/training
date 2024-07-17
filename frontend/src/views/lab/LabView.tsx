import React from 'react';
import './LabView.scss';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

import labImg from '../../common/assets/images/lab-img.png';
import labImgx2 from '../../common/assets/images/lab-img@2x.png';

const Lab = () => {
  return (
    <>
      <div className="lab-header">
        <Header />
      </div>
      <div className="lab-container">
        <picture className="lab-container__img">
          <source media="(min-width: 1921px)" srcSet={labImgx2} />
          <img src={labImg} alt="home" />
        </picture>
      </div>
      <div className="lab-container__body">
        <div className="lab-container__body-top">
          <p className="text">리빙랩</p>
          <div className="lab-container__body-top-right">
            <div className="box1">
              <select className="box1-select" name="filter">
                <option value="title">제목</option>
                <option value="writer">작성자</option>
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
        <div className="lab-container__body-data">
          <table>
            <thead>
              <tr>
                <th>
                  <div className="number">번호</div>
                </th>
                <th style={{ width: '60%' }}>
                  <div className="title">제목</div>
                </th>
                <th>
                  <div className="writer">작성자</div>
                </th>
                <th>
                  <div className="date">작성일</div>
                </th>
              </tr>
            </thead>
            <tr>
              <td>1</td>
              <td>리빙랩 입니다.</td>
              <td>관리자 1</td>
              <td>2023-05-05</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="lab-footer">
        <Footer />
      </div>
    </>
  );
};

export default Lab;
