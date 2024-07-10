import React, { useEffect, useState } from 'react';
import './HomeView.scss';
import { Header } from '../header/Header';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

import banner1 from '../../common/assets/images/home_1.png';
import banner2 from '../../common/assets/images/home_2.png';
import banner3 from '../../common/assets/images/home_3.png';
import banner1x2 from '../../common/assets/images/home1@2x.png';
import banner2x2 from '../../common/assets/images/home-2@2x.png';
import Card from '../../components/Card/Card';

const Home: React.FC = () => {
  const [transparent, setTransparent] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = document.querySelector('.container')?.scrollTop;

      if (scrollPosition && scrollPosition > 170) {
        setTransparent(false);
      } else {
        setTransparent(true);
      }
    };
    document.querySelector('.container')?.addEventListener('scroll', handleScroll);
    return () => {
      document.querySelector('.container')?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const banners = [
    { id: 1, imgSrc: banner1, imgUWSrc: banner1x2 },
    { id: 2, imgSrc: banner2, imgUWSrc: banner2x2 },
    { id: 3, imgSrc: banner3 },
  ];

  return (
    <div>
      <div className={`home-header ${transparent ? 'transparent' : 'nav-fade-in'}`}>
        <Header />
      </div>
      <div className="home-slide">
        <div className="home-text">
          <div className="home-title">
            <p>함께 하자,</p>
            <p>깨끗한 바다 부산으로!</p>
          </div>
          <p className="home-desc">깨바부는 부산지역 내 테트라포드와 습지 현황에 대한 정보를 제공하고 있습니다.</p>
        </div>
      </div>
      <div className="home-notice">
        <div className="notice-top">
          <h2>공지사항</h2>
          <div>
            <Icon component={ICONS.PLUS} size={IconSize.XXL} />
          </div>
        </div>
        <div className="notice-container">
          <Card title="abc" content="asdsdasd" date="11/223" />
          <Card title="abc" content="asdsdasd" date="11/223" />
          <Card title="abc" content="asdsdasd" date="11/223" />
          <Card title="abc" content="asdsdasd" date="11/223" />
        </div>
      </div>
    </div>
  );
};

export default Home;
