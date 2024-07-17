import React from 'react';
import './ContentView.scss';

import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import contentImg from '../../common/assets/images/content-img.png';
import contentImgx2 from '../../common/assets/images/content-img@2x.png';

const Content = () => {
  return (
    <>
      <div className="content-header">
        <Header />
      </div>
      <div className="content-container">
        <picture className="content-container__img">
          <source media="(min-width: 1921px)" srcSet={contentImgx2} />
          <img src={contentImg} alt="home1" />
        </picture>
        <div className="content-container__body">
          <h1 className="content-container__body-title">콘텐츠</h1>
          <div className="content-container__body-items">
            <div className="content-container__body-items__item">
              <div className="content-container__body-items__item-video"> </div>
              <div className="content-container__body-items__item-info">
                <div className="content-container__body-items__item-info__top">
                  <p>콘텐츠 제목</p>
                  <p>2023-05-05</p>
                </div>
                <div className="content-container__body-items__item-info__body">
                  튼튼하며, 천지는 곳이 광야에서 천하를 말이다. 불러 청춘의 바이며, 있는 못할 석가는 끓는 생의 찾아다녀도, 사막이다. 크고
                  두손을 원대하고, 인간의 봄바람이다. 이성은 넣는 만천하의 불어 구하지 우는 끓는 것이다. 끓는 천지는 안고, 그들은 위하여
                  인생을 들어 무엇이 희망의 있는가? 투명하되 가는 따뜻한 않는 생명을 아니다. 우리의 영원히 자신과 그러므로 무엇이 피가
                  희망의 교향악이다. 품에 구하기 피에 역사를 그러므로 바로 것이다. 그와 목숨을 눈이 것이다.튼튼하며, 천지는 곳이 광야에서
                  천하를 말이다. 불러 청춘의 바이며, 있는 못할 석...
                </div>
              </div>
            </div>
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
