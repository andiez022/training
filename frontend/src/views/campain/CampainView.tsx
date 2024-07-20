import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import './CampainView.scss';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';
import CampainImg from '../../common/assets/images/campain-img.png';
import CampainImgx2 from '../../common/assets/images/campain-img@2x.png';
import CampainIcon from '../../common/assets/images/icon-campain (1).png';
import CampainIconx2 from '../../common/assets/images/icon-campain (2).png';
import api from '../../services/apiServices';
import { DataItem } from '../../services/types/common';

const CampainView = () => {
  const searchBy = 'title';
  const searchValue = '';
  const page = 0;
  const pageSize = 12;

  const { data: campaignResponse } = useQuery(['annDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('campaign', {
      searchBy,
      searchValue,
      page,
      pageSize,
    }),
  );
  return (
    <>
      <div className="campain-header">
        <Header />
      </div>
      <div className="campain-container">
        <picture className="campain-container__img">
          <source media="(min-width: 1921px)" srcSet={CampainImgx2} />
          <img src={CampainImg} alt="home" />
          <div className="campain-container__img__text-overlay">
            <picture className="campain-container__img__text-overlay-icon">
              <source media="(min-width: 1921px)" srcSet={CampainIconx2} />
              <img src={CampainIcon} alt="campain" />
            </picture>
            <p>깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.</p>
          </div>
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
          <div className="campain-container__body-content grid-cols-4 grid-cols-3 grid-cols-2">
            {campaignResponse?.list.map((item: DataItem) => (
              <div className="campain-container__body-content__item" key={item.id}>
                <div className="campain-container__body-content__item-img">
                  <img src={item.image} alt="item-img" />
                </div>
                <div className="campain-container__body-content__item-title">{item.title}</div>
              </div>
            ))}
            {/* <div className="campain-container__body-content__item">
              <div className="campain-container__body-content__item-img">
                <img src="https://picsum.photos/200/300?random=2" alt="item-img" />
              </div>
              <div className="campain-container__body-content__item-title">캠페인 제목</div>
            </div>
            <div className="campain-container__body-content__item">
              <div className="campain-container__body-content__item-img">
                <img src="https://picsum.photos/200/300?random=3" alt="item-img" />
              </div>
              <div className="campain-container__body-content__item-title">캠페인 제목</div>
            </div>
            <div className="campain-container__body-content__item">
              <div className="campain-container__body-content__item-img">
                <img src="https://picsum.photos/200/300?random=4" alt="item-img" />
              </div>
              <div className="campain-container__body-content__item-title">캠페인 제목</div>
            </div>
            <div className="campain-container__body-content__item">
              <div className="campain-container__body-content__item-img">
                <img src="https://picsum.photos/200/300?random=5" alt="item-img" />
              </div>
              <div className="campain-container__body-content__item-title">캠페인 제목</div>
            </div>
            <div className="campain-container__body-content__item">
              <div className="campain-container__body-content__item-img">
                <img src="https://picsum.photos/200/300?random=6" alt="item-img" />
              </div>
              <div className="campain-container__body-content__item-title">캠페인 제목</div>
            </div> */}
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
