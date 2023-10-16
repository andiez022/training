import React from 'react';
import GuestHeader from '../header/GuestHeader';
import CardList from '../../components/Card/CardList';
import Card from '../../components/Card/Card';

import './HomeView.scss';

const Home: React.FC = () => {
  const card1Info = {
    title: 'Card title',
    content: 'This is the content of Card 1.',
  };

  const card2Info = {
    title: 'Card title',
    content: 'This is the content of Card 2.',
  };

  const card3Info = {
    title: 'Card title',
    content: 'This is the content of Card 3.',
  };

  const card4Info = {
    title: 'Card title',
    content: 'This is the content of Card 4.',
  };

  return (
    <div className="home-container">
      <GuestHeader />
      <div className="image-container">
        <img src="home_bn1.png" alt="Background" />
        <div className="text-overlay">
          <h2>함께 하자,</h2>
          <h2>깨끗한 바다 부산으로!</h2>
          <p>깨바부는 부산지역 내 테트라포드와 습지 현황에 대한 정보를 제공하고 있습니다.</p>
        </div>
      </div>
      <div className="context-container">
        <div className="announcement-container">
          <div className="announcement-title">
            <h2 className="gradual-color-transition">공지사항</h2>
            <div className="more-icon">
              <h2>icon here</h2>
            </div>
          </div>
          <div className="announcement-card">
            <Card title={card1Info.title}>
              <CardList>{card1Info.content}</CardList>
            </Card>
            <Card title={card2Info.title}>
              <CardList>{card2Info.content}</CardList>
            </Card>
            <Card title={card3Info.title}>
              <CardList>{card3Info.content}</CardList>
            </Card>
            <Card title={card4Info.title}>
              <CardList>{card4Info.content}</CardList>
            </Card>
          </div>
        </div>
        <div className="highlights-container">
          <CardList>Child</CardList>
        </div>
      </div>
    </div>
  );
};

export default Home;
