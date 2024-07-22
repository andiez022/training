import React from 'react';
import './LabView.scss';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

import labImg from '../../common/assets/images/lab-img.png';
import labImgx2 from '../../common/assets/images/lab-img@2x.png';
import labIcon from '../../common/assets/images/icon-living-lab (1).png';
import labIconx2 from '../../common/assets/images/icon-living-lab (2).png';
import api from '../../services/apiServices';
import { DataItem } from '../../services/types/common';
import { reformatDate } from '../../components/FormatDate/FormatDate';

const Lab = () => {
  const searchBy = 'title';
  const searchValue = '';
  const page = 0;
  const pageSize = 10;

  const { data: labResponse } = useQuery(['annDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('content', {
      searchBy,
      searchValue,
      page,
      pageSize,
    }),
  );
  return (
    <>
      <div className="lab-header">
        <Header />
      </div>
      <div className="lab-container">
        <picture className="lab-container__img">
          <source media="(min-width: 1921px)" srcSet={labImgx2} />
          <img src={labImg} alt="home" />
          <div className="lab-container__img__text-overlay">
            <picture className="lab-container__img__text-overlay-icon" data-aos="fade-up">
              <source media="(min-width: 1921px)" srcSet={labIconx2} />
              <img src={labIcon} alt="lab" />
            </picture>
            <p data-aos="fade-up">깨끗한 바다 부산을 위해 시민들이 직접 참여 중인 프로젝트를 소개합니다.</p>
          </div>
        </picture>
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
              {labResponse?.list.map((item: DataItem, index: number) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="title-data">{item.title}</td>
                  <td>{item.author}</td>
                  <td>{reformatDate(item.created_at)}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
      <div className="lab-footer">
        <Footer />
      </div>
    </>
  );
};

export default Lab;
