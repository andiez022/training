import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
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
import Pagination from '../../components/Pagination/Pagination';

const CampainView = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(12);
  const [searchByData, setSearchByData] = useState('title');
  const [searchValueData, setSearchValueData] = useState('');

  const searchBy = searchByData;
  const searchValue = searchValueData;
  const page = currentPage;
  const pageSize = postsPerPage;

  const { data: campaignResponse } = useQuery(['campaignDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('campaign', {
      searchBy,
      searchValue,
      page,
      pageSize,
    }),
  );

  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchByData(e.target.value);
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSearch = () => {
    setSearchValueData(inputValue);
  };
  const navigate = useNavigate();
  const goToItem = (pageType: string, itemId: string) => {
    navigate(`/${pageType}/${itemId}`);
  };
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
            <picture className="campain-container__img__text-overlay-icon" data-aos="fade-up">
              <source media="(min-width: 1921px)" srcSet={CampainIconx2} />
              <img src={CampainIcon} alt="campain" />
            </picture>
            <p data-aos="fade-up">깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.</p>
          </div>
        </picture>
        <div className="campain-container__body">
          <div className="campain-container__body-top">
            <p className="text">캠페인</p>
            <div className="campain-container__body-top-right">
              <div className="box1">
                <select className="box1-select" name="filter" onChange={handleChange}>
                  <option value="title">제목</option>
                </select>
              </div>
              <div className="box23">
                <div className="box2">
                  <input type="text" className="box2-input" placeholder="리빙랩 검색" onChange={handleChangeInput} />
                </div>
                <div className="box3" onClick={handleSearch}>
                  <Icon className="icon-search-glass" component={ICONS.SEARCH_GLASS} size={IconSize.XL} />
                  <p className="box3-text">검색</p>
                </div>
              </div>
            </div>
          </div>
          <div className="campain-container__body-content grid-cols-4 grid-cols-3 grid-cols-2">
            {campaignResponse?.total !== 0 ? (
              campaignResponse?.list.map((item: DataItem) => (
                <div className="campain-container__body-content__item" key={item.id} onClick={() => goToItem('campain', item.id)}>
                  <div className="campain-container__body-content__item-img">
                    <img src={item.image} alt="item-img" />
                  </div>
                  <div className="campain-container__body-content__item-title">{item.title}</div>
                </div>
              ))
            ) : (
              <div style={{ width: '70vw', textAlign: 'center', marginTop: '50px' }}>현재 캠페인이 없습니다.</div>
            )}
          </div>
          <Pagination
            totalPosts={campaignResponse?.total ?? 0}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
      <div className="campain-footer">
        <Footer />
      </div>
    </>
  );
};

export default CampainView;
