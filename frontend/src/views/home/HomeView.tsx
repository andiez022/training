import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectToken, selectUserRole } from '../../services/controllers/common/UserSelector';
import banner1 from '../../common/assets/images/home-1.png';
import banner1x2 from '../../common/assets/images/home-1@2x.png';
import banner2 from '../../common/assets/images/home-2.png';
import banner2x2 from '../../common/assets/images/home-2@2x.png';
import banner3 from '../../common/assets/images/home-3.png';
import banner3x2 from '../../common/assets/images/home-3@2x.png';
import Card from '../../components/Card/Card';
import { reformatDate } from '../../components/FormatDate/FormatDate';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';
import api from '../../services/apiServices';
import { DataItem } from '../../services/types/common';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import './HomeView.scss';

const Home: React.FC = () => {
  const searchBy = 'title';
  const searchValue = '';
  const page = 0;
  const pageSize = 4;

  const { data: annResponse } = useQuery(['annDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('notice', {
      searchBy,
      searchValue,
      page,
      pageSize,
    }),
  );
  const { data: contentResponse } = useQuery(['contentDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('content', {
      searchBy,
      searchValue,
      page,
      pageSize,
    }),
  );
  const { data: labResponse } = useQuery(['labDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('living-lab', {
      searchBy,
      searchValue,
      page,
      pageSize,
    }),
  );
  const { data: campaignResponse } = useQuery(['campainDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('campaign', {
      searchBy,
      searchValue,
      page,
      pageSize,
    }),
  );
  const { data: boardResponse } = useQuery(['boardDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('free-board', {
      searchBy,
      searchValue,
      page,
      pageSize,
    }),
  );

  const [transparent, setTransparent] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;

      if (scrollPosition && scrollPosition > 170) {
        setTransparent(false);
      } else {
        setTransparent(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [transparent]);

  const banners = [
    { id: 1, imgSrc: banner1, imgUWSrc: banner1x2 },
    { id: 2, imgSrc: banner2, imgUWSrc: banner2x2 },
    { id: 3, imgSrc: banner3, imgUWSrc: banner3x2 },
  ];
  const [activeBanner, setActiveBanner] = useState(0);
  useEffect(() => {
    const time = setInterval(() => {
      setActiveBanner((activeBanner + 1) % banners.length);
    }, 5000);
    return () => clearInterval(time);
  }, [activeBanner]);

  const navigate = useNavigate();
  const goToItem = (pageType: string, itemId: string) => {
    navigate(`${pageType}/${itemId}`);
  };

  const isLoggedIn = useSelector(selectToken) !== null;
  const isAdmin = useSelector(selectUserRole) === 'Admin';
  return (
    <div className="home-container">
      <div className={`home-header ${transparent ? 'transparent' : 'nav-fade-in'} ${isLoggedIn ? (isAdmin ? 'admin' : 'user') : ''}`}>
        <Header />
      </div>
      <div className="home-slide">
        {banners.map((banner, index) => (
          <div key={banner.id} className={`slide-item ${index === activeBanner ? 'active' : ''}`}>
            <picture>
              <source media="(min-width: 1921px)" srcSet={banner.imgUWSrc} />
              <img src={banner.imgSrc} alt="home" />
            </picture>
          </div>
        ))}
        <div className="home-text">
          <div className="home-title" data-aos="fade-up">
            <h4>함께 하자,</h4>
            <h4>깨끗한 바다 부산으로!</h4>
          </div>
          <p className="home-desc" data-aos="fade-up">
            깨바부는 부산지역 내 테트라포드와 습지 현황에 대한 정보를 제공하고 있습니다.
          </p>
        </div>
      </div>
      <div className="home-notice">
        <div data-aos="fade-up">
          <div className="notice-top">
            <h2>공지사항</h2>
            <Link to="/announcement">
              <div className="home-icon-plus announcement">
                <Icon component={ICONS.PLUS} size={IconSize.LG} />
              </div>
            </Link>
          </div>
          <div className="notice-container">
            {annResponse?.list.map((item: DataItem) => (
              <Card
                key={item.id}
                title={item.title}
                content={item.content}
                date={reformatDate(item.created_at)}
                onClick={() => goToItem('announcement', item.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="home-highlight">
        <div className="home-highlight__content content" data-aos="fade-up">
          <div className="content-header">
            <h2>콘텐츠</h2>
            <Link to="/content">
              <div className="home-icon-plus">
                <Icon component={ICONS.PLUS} size={IconSize.LG} />
              </div>
            </Link>
          </div>
          <div className="content-list">
            <ul>
              {contentResponse?.list.map((item: DataItem) => (
                <li key={item.id} onClick={() => navigate('content')}>
                  <div>
                    <div className="dot-list" />
                    <p>{item.title}</p>
                  </div>
                  <Icon className="icon-plus" component={ICONS.ARROW_RIGHT2} size={IconSize.SM} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="home-highlight__content lab" data-aos="fade-up">
          <div className="content-header">
            <h2>리빙랩</h2>
            <Link to="/living-lab">
              <div className="home-icon-plus">
                <Icon component={ICONS.PLUS} size={IconSize.LG} />
              </div>
            </Link>
          </div>
          <div className="content-list">
            <ul>
              {labResponse?.list.map((item: DataItem) => (
                <li key={item.id} onClick={() => goToItem('living-lab', item.id)}>
                  <div>
                    <div className="dot-list" />
                    <p>{item.title}</p>
                  </div>
                  <Icon className="icon-plus" component={ICONS.ARROW_RIGHT2} size={IconSize.SM} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="home-highlight__content campaign" data-aos="fade-up">
          <div className="content-header">
            <h2>캠페인</h2>
            <Link to="campain">
              <div className="home-icon-plus">
                <Icon component={ICONS.PLUS} size={IconSize.LG} />
              </div>
            </Link>
          </div>
          <div className="content-list">
            <ul>
              {campaignResponse?.list.map((item: DataItem) => (
                <li key={item.id} onClick={() => goToItem('campain', item.id)}>
                  <div>
                    <div className="dot-list" />
                    <p>{item.title}</p>
                  </div>
                  <Icon className="icon-plus" component={ICONS.ARROW_RIGHT2} size={IconSize.SM} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="home-highlight__content free-board" data-aos="fade-up">
          <div className="content-header">
            <h2>자유게시판</h2>
            <Link to="free-board">
              <div className="home-icon-plus">
                <Icon component={ICONS.PLUS} size={IconSize.LG} />
              </div>
            </Link>
          </div>
          <div className="content-list">
            <ul>
              {boardResponse?.list.map((item: DataItem) => (
                <li key={item.id} onClick={() => goToItem('free-board', item.id)}>
                  <div>
                    <div className="dot-list" />
                    <p>{item.title}</p>
                  </div>
                  <Icon className="icon-plus" component={ICONS.ARROW_RIGHT2} size={IconSize.SM} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="home-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
