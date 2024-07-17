import React from 'react';

import './FreeBoardView.scss';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';

import freeBoardImg from '../../common/assets/images/free-board.png';
import freeBoardImgx2 from '../../common/assets/images/free-board@2x.png';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

const FreeBoardView = () => {
  return (
    <>
      <div className="free-board-header">
        <Header />
      </div>
      <div className="free-board-container">
        <picture className="free-board-container__img">
          <source media="(min-width: 1921px)" srcSet={freeBoardImgx2} />
          <img src={freeBoardImg} alt="home" />
          <div className="free-board-container__body">
            <div className="free-board-container__body-top">
              <p className="text">자유게시판</p>
              <div className="free-board-container__body-top-right">
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
            <div className="free-board-container__body-data">
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
        </picture>
      </div>
      <div className="free-board-footer">
        <Footer />
      </div>
    </>
  );
};

export default FreeBoardView;
