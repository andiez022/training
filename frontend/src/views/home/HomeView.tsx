import React, { useState, useEffect } from 'react';

import RevealOnScroll from '../../components/RevealOnScroll/RevealOnScroll';
import Card from '../../components/Card/Card';

import './HomeView.scss';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

const Home: React.FC = () => {
  const banners = [
    { id: 1, imgSrc: '/home_bn1.png' },
    { id: 2, imgSrc: '/home_bn2.png' },
    { id: 3, imgSrc: '/home_bn3.png' },
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((currentBanner + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentBanner]);

  const items = [
    { id: 1, title: '콘텐츠 제목' },
    { id: 2, title: '콘텐츠 제목 콘텐츠 제목 콘텐츠 제목 콘...' },
    { id: 3, title: '콘텐츠 제목' },
    { id: 4, title: '콘텐츠 제목' },
  ];

  const card1Info = {
    title: '공지사항 입니다. 공지사항 입니다. 공지사항 입니...',
    content: 'This is the content of Card 1.',
    date: '2023-05-05',
  };

  const card2Info = {
    title: '공지사항 입니다.',
    content:
      '튼튼하며, 천지는 곳이 광야에서 천하를 말이다. 불러 청춘의 바이며, 있는 못할 석가는 끓는 생의 찾아다녀도, 사막이다. 크고 두손을 원대하고, 인간의 봄바람이 ...',
    date: '2023-05-05',
  };

  const card3Info = {
    title: '공지사항 입니다.',
    content: 'This is the content of Card 3.',
    date: '2023-05-05',
  };

  const card4Info = {
    title: '공지사항 입니다.',
    content: 'This is the content of Card 4.',
    date: '2023-05-05',
  };

  return (
    <div className="home-container">
      <div className="banner-container">
        {banners.map((banner, index) => (
          <div key={banner.id} className={`banner-item ${index === currentBanner ? 'active' : ''}`}>
            <img src={banner.imgSrc} alt={`Home banner ${banner.id}`} />
          </div>
        ))}
        <div className="text-overlay">
          <h2>함께 하자,</h2>
          <h2>깨끗한 바다 부산으로!</h2>
          <p>깨바부는 부산지역 내 테트라포드와 습지 현황에 대한 정보를 제공하고 있습니다.</p>
        </div>
      </div>
      <div className="context-container">
        <RevealOnScroll>
          <div className="announcement-container">
            <div className="announcement-title">
              <h2 className="gradual-color-transition">공지사항</h2>
              <button>
                <Icon component={ICONS.PLUS} size={IconSize.XXL} />
              </button>
            </div>
            <div className="announcement-card">
              <Card title={card1Info.title} content={card1Info.content} date={card1Info.date} />
              <Card title={card2Info.title} content={card2Info.content} date={card2Info.date} />
              <Card title={card3Info.title} content={card3Info.content} date={card3Info.date} />
              <Card title={card4Info.title} content={card4Info.content} date={card4Info.date} />
            </div>
          </div>
        </RevealOnScroll>
        <div className="highlights-container">
          <RevealOnScroll className="list-container">
            <div className="list-header">
              <h2 className="gradual-color-transition">콘텐츠</h2>
              <button>
                <Icon component={ICONS.PLUS} size={IconSize.XXL} />
              </button>
            </div>
            <ul className="list-body">
              {items.map((item) => (
                <li key={item.id} className="list-item">
                  <div className="item-title">
                    <span className="icon-span" />
                    <span className="title-span">{item.title}</span>
                  </div>
                  <Icon component={ICONS.ARROW_RIGHT} />
                </li>
              ))}
            </ul>
          </RevealOnScroll>
          <RevealOnScroll className="list-container" style={{ transitionDelay: '0.25s' }}>
            <div className="list-header">
              <h2 className="gradual-color-transition">리빙랩</h2>
              <button>
                <Icon component={ICONS.PLUS} size={IconSize.XXL} />
              </button>
            </div>
            <ul className="list-body">
              {items.map((item) => (
                <li key={item.id} className="list-item">
                  <div className="item-title">
                    <span className="icon-span" />
                    <span className="title-span">{item.title}</span>
                  </div>
                  <Icon component={ICONS.ARROW_RIGHT} />
                </li>
              ))}
            </ul>
          </RevealOnScroll>
          <RevealOnScroll className="list-container" style={{ transitionDelay: '0.5s' }}>
            <div className="list-header">
              <h2 className="gradual-color-transition">캠페인</h2>
              <button>
                <Icon component={ICONS.PLUS} size={IconSize.XXL} />
              </button>
            </div>
            <ul className="list-body">
              {items.map((item) => (
                <li key={item.id} className="list-item">
                  <div className="item-title">
                    <span className="icon-span" />
                    <span className="title-span">{item.title}</span>
                  </div>
                  <Icon component={ICONS.ARROW_RIGHT} />
                </li>
              ))}
            </ul>
          </RevealOnScroll>
          <RevealOnScroll className="list-container" style={{ transitionDelay: '0.75s' }}>
            <div className="list-header">
              <h2 className="gradual-color-transition">자유게시판</h2>
              <button>
                <Icon component={ICONS.PLUS} size={IconSize.XXL} />
              </button>
            </div>
            <ul className="list-body">
              {items.map((item) => (
                <li key={item.id} className="list-item">
                  <div className="item-title">
                    <span className="icon-span" />
                    <span className="title-span">{item.title}</span>
                  </div>
                  <Icon component={ICONS.ARROW_RIGHT} />
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
};

export default Home;
