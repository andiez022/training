import React from 'react';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import './Announcement.scss';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

import ancmImg from '../../common/assets/images/annouc-img.png';
import ancmImgx2 from '../../common/assets/images/annouc-img@2x.png';

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
        </picture>
        <div className="announcement-content__body">
          <div className="announcement-content__body-top">
            <p className="text">공지사항</p>
            <div className="announcement-content__body-top-right">
              <div className="box1">
                {/* <p className="box1-text">제목</p> */}
                <select className="box1-select" name="filter">
                  <option value="title">제목</option>
                  <option value="writer">작성자</option>
                </select>
              </div>
              <div className="box2">
                {/* <p className="box2-text">공지사항 검색</p> */}
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
              <tr className="table-header">
                <th className="number" style={{ width: '10%' }}>
                  번호
                </th>
                <th className="title" style={{ width: '65%' }}>
                  제목
                </th>
                <th className="writer">작성자</th>
                <th className="date">작성일</th>
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
