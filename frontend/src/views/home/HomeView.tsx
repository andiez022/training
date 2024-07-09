import React from 'react';
import { Header } from '../header/Header';
import './HomeView.scss';
// import imgSlider1 from '../../common/assets/images/AdobeStock_93456281@2x.png';
// import imgSlider2 from '../../common/assets/images/AdobeStock_93456281.png';

const Home: React.FC = () => {
  return (
    <div>
      <div className="home-header">
        <Header />
      </div>
      <div className="home-slide">
        {/* <img src={imgSlider1} alt="" className="imgSlide fade" /> */}
        {/* <img src={imgSlider2} alt="" className="imgSlide fade" /> */}
        <div className="home-title">
          <p>함께 하자,</p>
          <p>깨끗한 바다 부산으로!</p>
        </div>
        <p className="home-desc">깨바부는 부산지역 내 테트라포드와 습지 현황에 대한 정보를 제공하고 있습니다.</p>
      </div>
    </div>
  );
};

export default Home;
