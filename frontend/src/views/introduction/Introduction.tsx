import React from 'react';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import './Introduction.scss';

import introOcean from '../../common/assets/images/intro-ocean .png';
import introOceanx2 from '../../common/assets/images/intro-ocean@2x.png';
import logo from '../../common/assets/images/logo-header.svg';
import introContentImg1 from '../../common/assets/images/intro-img-1.png';
import introContentImg1x2 from '../../common/assets/images/intro-img-1@2x.png';
import introContentImg2 from '../../common/assets/images/intro-img-2.png';
import introContentImg2x2 from '../../common/assets/images/intro-img-2@2x.png';

const Introduction: React.FC = () => {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="intro-content">
        <picture>
          <source media="(min-width: 1921px)" srcSet={introOceanx2} />
          <img src={introOcean} alt="intro ocean" />
        </picture>
        <svg className="logo">
          <image xlinkHref={logo} />
        </svg>
        <p className="intro-content__title">안녕하십니까. 깨끗한 바다 부산 홈페이지 방문을 환영합니다.</p>
        <p className="intro-content__paragraph-1">
          제2 수도로 불리는 부산은 동남권에는 바다가, 북서로는 낙동강이 흐르고 있는 <span>친수도시로</span> 지리적 이점과 풍부한 해양자원을
          바탕으로 항만물류, <span>해양수산, 관광·MICE산업</span> 등 고부가가치 산업기반의 <span>글로벌 해양도시</span>로 나아가고 있습니다.
        </p>
        <div className="intro-content__img-1">
          <picture>
            <source media="(min-width: 1921px)" srcSet={introContentImg1x2} />
            <img src={introContentImg1} alt="intro ocean" />
          </picture>
        </div>
        <p className="intro-content__paragraph-2">
          그러나 <span>낙동강 하류와 근해에 밀려오는 막대한 양의 해양쓰레기</span>로 인해 환경오염, 생태계 파괴, 미세플라스틱 문제 등{' '}
          <span>해양자원과 시민의 안전이 위협받고 있습</span>부산의 니다.
          <br />
          이에 부산광역시는 시민단체와 다양한 환경 정화 활동을 통해 해마다50만 톤에 달하는 해양쓰레기를 수거하고 있지만 <br />
          <span>안전한 접근이 보장되지 않는 테트라포드와 습지의 경우 여전히 수거 사각지대</span>로 남아 있습니다.
        </p>
        <p className="intro-content__paragraph-3">
          ‘<span>깨바부</span> (<span>깨</span>끗한 <span>바</span>다 <span>부</span>산)’는 이러한 지역현안 문제 해결을 위해{' '}
          <span>부산지역 내 수거 사각지대인 테트라포트(72개소)와 습지(1개소) 현황 정보를 제공</span>하고 <br />{' '}
          <span>해양쓰레기 문제의 심각성을 인지할 수 있는 콘텐츠를 게시</span>함으로써 깨끗한 바다·강 만들기 문화를 홍보하고 확산하고자
          합니다.
          <br /> 또한, 수거 사각지대의 쓰레기 문제의 해결방안에 대해 주민들과 자유롭게 논의하고 공감하기 위하여 <br />
          <span>시민의 의견을 상시 수집할 수 있는 자유게시판을 운영</span>하여 시민의 소리에 귀 기울이겠습니다.
        </p>
        <div className="intro-content__img-1">
          <picture>
            <source media="(min-width: 1921px)" srcSet={introContentImg2x2} />
            <img src={introContentImg2} alt="intro ocean" />
          </picture>
        </div>
        <p className="intro-content__paragraph-4">
          아름다운 미래 해양도시 부산을 위하여 시민 여러분들의 많은 관심과 참여를 부탁드립니다. 감사합니다.
        </p>
        <p className="intro-content__paragraph-5">
          본 사이트는 과학기술정보통신부에서 시행하는 원천기술개발사업-국민공감·국민참여 R&SD 선도사업-주민공감현장문제해결사업과
          부산광역시의 지원을 받아 제작되었습니다.
        </p>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Introduction;
