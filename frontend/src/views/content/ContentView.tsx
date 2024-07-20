import React from 'react';
import './ContentView.scss';
import { useQuery } from '@tanstack/react-query';

import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import contentImg from '../../common/assets/images/content-img.png';
import contentImgx2 from '../../common/assets/images/content-img@2x.png';
import contentIcon from '../../common/assets/images/icon-content (1).png';
import contentIconx2 from '../../common/assets/images/icon-content (2).png';
import api from '../../services/apiServices';
import { DataItem } from '../../services/types/common';
import { reformatDate } from '../../components/FormatDate/FormatDate';
import { formatVideoUrl } from './utils';

const Content = () => {
  const searchBy = 'title';
  const searchValue = '';
  const page = 0;
  const pageSize = 10;

  const { data: contentResponse } = useQuery(['annDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('content', {
      searchBy,
      searchValue,
      page,
      pageSize,
    }),
  );

  return (
    <>
      <div className="content-header">
        <Header />
      </div>
      <div className="content-container">
        <picture className="content-container__img">
          <source media="(min-width: 1921px)" srcSet={contentImgx2} />
          <img src={contentImg} alt="home1" />
          <div className="content-container__img__text-overlay">
            <picture className="content-container__img__text-overlay-icon">
              <source media="(min-width: 1921px)" srcSet={contentIconx2} />
              <img src={contentIcon} alt="content" />
            </picture>
            <p>깨끗한 바다 부산을 위해 시민들이 직접 참여 중인 프로젝트를 소개합니다.</p>
          </div>
        </picture>
        <div className="content-container__body">
          <h1 className="content-container__body-title">콘텐츠</h1>
          <div className="content-container__body-items">
            {contentResponse?.list.map((item: DataItem) => (
              <div className="content-container__body-items__item">
                <iframe src={formatVideoUrl(item.video)} className="content-container__body-items__item-video" title="video" />
                <div className="content-container__body-items__item-info">
                  <div className="content-container__body-items__item-info__top">
                    <p>{item.title}</p>
                    <p>{reformatDate(item.created_at)}</p>
                  </div>
                  <div className="content-container__body-items__item-info__body" dangerouslySetInnerHTML={{ __html: item.description }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="content-footer">
        <Footer />
      </div>
    </>
  );
};

export default Content;
