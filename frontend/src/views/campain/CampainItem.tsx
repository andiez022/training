import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import './CampainView.scss';
import api from '../../services/apiServices';

function Campain() {
  const { id } = useParams();
  const { data: CampainItem } = useQuery(['CampainItem', id], () => api.data.fetchDataById('campaign', id || ''));

  console.log(CampainItem);

  const navigate = useNavigate();
  return (
    <div>
      <div className="campain-header">
        <Header />
      </div>
      <div className="campain-item__container">
        <div className="campain-item__container-content">
          <div className="campain-item__container-content__img">
            <img src={CampainItem?.image} alt="img" />
          </div>
          <div className="campain-item__container-content__info">
            <h3 className="campain-item__container-content__info-title">{CampainItem?.title}</h3>
            <div className="campain-item__container-content__info-author">
              <h4>작성자</h4>
              <p>{CampainItem?.author}</p>
            </div>
            <div className="campain-item__container-content__info-link">
              <h4>링크</h4>
              <a href="url">{CampainItem?.link}</a>
            </div>
            <h1 className="campain-item__container-content__info-content" dangerouslySetInnerHTML={{ __html: CampainItem?.content }} />
          </div>
        </div>
        <div className="campain-item__container-button">
          <button onClick={() => navigate('/campain')}>목록으로</button>
        </div>
      </div>
      <div className="announcement-footer">
        <Footer />
      </div>
    </div>
  );
}

export default Campain;
