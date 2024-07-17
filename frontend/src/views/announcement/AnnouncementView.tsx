import React from 'react';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import './AnnouncementView.scss';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

import ancmImg from '../../common/assets/images/annouc-img.png';
import ancmImgx2 from '../../common/assets/images/annouc-img@2x.png';
import ancmIcon from '../../common/assets/images/icon-announcement.png';
import ancmIconx2 from '../../common/assets/images/icon-announcement@2x.png';

const Announcement = () => {
  return (
    <div>
      <div className="announcement-header">
        <Header />
      </div>
      <div className="announcement-content">
        <picture className="announcement-content__img">
          <source media="(min-width: 1921px)" srcSet={ancmImgx2} />
          <img src={ancmImg} alt="announcement1" />
          <div className="announcement-content__img__text-overlay">
            <picture className="announcement-content__img__text-overlay-icon">
              <source media="(min-width: 1921px)" srcSet={ancmIconx2} />
              <img src={ancmIcon} alt="announcement" />
            </picture>
            <p>깨끗한 바다 부산을 위해 시민들이 직접 참여 중인 프로젝트를 소개합니다.</p>
          </div>
        </picture>
        <div className="announcement-content__body">
          <div className="announcement-content__body-top">
            <p className="text">공지사항</p>
            <div className="announcement-content__body-top-right">
              <div className="box1">
                <select className="box1-select" name="filter">
                  <option value="title">제목</option>
                  <option value="writer">작성자</option>
                </select>
              </div>
              <div className="box2">
                <input type="text" className="box2-input" placeholder="공지사항 검색" />
              </div>
              <div className="box3">
                <Icon className="icon-search-glass" component={ICONS.SEARCH_GLASS} size={IconSize.XL} />
                <p className="box3-text">검색</p>
              </div>
            </div>
          </div>
          <div className="announcement-content__body-data">
            <table>
              <thead>
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
              </thead>

              <tr className="table-data">
                <td>1</td>
                <td>
                  공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다.
                  공지사
                </td>
                <td>관리자 1</td>
                <td>2023-05-05</td>
              </tr>
              <tr className="table-data">
                <td>1</td>
                <td>
                  공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다.
                  공지사
                </td>
                <td>관리자 1</td>
                <td>2023-05-05</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div className="announcement-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Announcement;
