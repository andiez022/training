import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import './AnnouncementView.scss';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

import ancmImg from '../../common/assets/images/annouc-img.png';
import ancmImgx2 from '../../common/assets/images/annouc-img@2x.png';
import ancmIcon from '../../common/assets/images/icon-announcement.png';
import ancmIconx2 from '../../common/assets/images/icon-announcement@2x.png';
import { DataItem } from '../../services/types/common';
import api from '../../services/apiServices';
import { reformatDate } from '../../components/FormatDate/FormatDate';

const Announcement = () => {
  const searchBy = 'title';
  const searchValue = '';
  const page = 0;
  const pageSize = 10;

  const { data: annResponse } = useQuery(['annDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('notice', {
      searchBy,
      searchValue,
      page,
      pageSize,
    }),
  );
  // function reformatDate(inputDate: string): string {
  //   const date = new Date(inputDate);
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  //   const year = date.getFullYear();

  //   return `${day}-${month}-${year}`;
  // }
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
            <picture className="announcement-content__img__text-overlay-icon" data-aos="fade-up">
              <source media="(min-width: 1921px)" srcSet={ancmIconx2} />
              <img src={ancmIcon} alt="announcement" />
            </picture>
            <p data-aos="fade-up">깨끗한 바다 부산을 위해 시민들이 직접 참여 중인 프로젝트를 소개합니다.</p>
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
              <div className="box23">
                <div className="box2">
                  <input type="text" className="box2-input" placeholder="공지사항 검색" />
                </div>
                <div className="box3">
                  <Icon className="icon-search-glass" component={ICONS.SEARCH_GLASS} size={IconSize.XL} />
                  <p className="box3-text">검색</p>
                </div>
              </div>
            </div>
          </div>
          <div className="announcement-content__body-data">
            <table>
              <thead>
                <th>
                  <div className="number">번호</div>
                </th>
                <th>
                  <div className="title">제목</div>
                </th>
                <th>
                  <div className="writer">작성자</div>
                </th>
                <th>
                  <div className="date">작성일</div>
                </th>
              </thead>

              {annResponse?.list.map((item: DataItem, index: number) => (
                <tr className="table-data" key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{reformatDate(item.created_at)}</td>
                </tr>
              ))}
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
