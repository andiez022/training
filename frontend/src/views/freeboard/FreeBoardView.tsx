import React from 'react';

import './FreeBoardView.scss';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';

import freeBoardImg from '../../common/assets/images/free-board.png';
import freeBoardImgx2 from '../../common/assets/images/free-board@2x.png';
import freeBoardIcon from '../../common/assets/images/icon-free-board (1).png';
import freeBoardIconx2 from '../../common/assets/images/icon-free-board (2).png';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';
import api from '../../services/apiServices';
import { DataItem } from '../../services/types/common';
import { reformatDate } from '../../components/FormatDate/FormatDate';

const FreeBoardView = () => {
  const searchBy = 'title';
  const searchValue = '';
  const page = 0;
  const pageSize = 10;

  const { data: boardResponse } = useQuery(['annDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('content', {
      searchBy,
      searchValue,
      page,
      pageSize,
    }),
  );
  return (
    <>
      <div className="free-board-header">
        <Header />
      </div>
      <div className="free-board-container">
        <picture className="free-board-container__img">
          <source media="(min-width: 1921px)" srcSet={freeBoardImgx2} />
          <img src={freeBoardImg} alt="free-board" />
          <div className="free-board-container__img__text-overlay">
            <picture className="free-board-container__img__text-overlay-icon" data-aos="fade-up">
              <source media="(min-width: 1921px)" srcSet={freeBoardIconx2} />
              <img src={freeBoardIcon} alt="free-board" />
            </picture>
            <p data-aos="fade-up">깨끗한 바다 부산을 위한 시민들의 다양한 의견과 정보를 공유합니다.</p>
          </div>
        </picture>
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
              <div className="box23">
                <div className="box2">
                  <input type="text" className="box2-input" placeholder="리빙랩 검색" />
                </div>
                <div className="box3">
                  <Icon className="icon-search-glass" component={ICONS.SEARCH_GLASS} size={IconSize.XL} />
                  <p className="box3-text">검색</p>
                </div>
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
                  <th>
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
              {boardResponse?.list.map((item: DataItem, index: number) => (
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
      <div className="free-board-footer">
        <Footer />
      </div>
    </>
  );
};

export default FreeBoardView;
