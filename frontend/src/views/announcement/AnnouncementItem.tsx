import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import './AnnouncementView.scss';
import api from '../../services/apiServices';
import { reformatDate } from '../../components/FormatDate/FormatDate';

function Announcement() {
  const { id } = useParams();
  const { data: AnnItem } = useQuery(['AnnoucementItem', id], () => api.data.fetchDataById('notice', id || ''));

  const navigate = useNavigate();

  return (
    <div>
      <div className="announcement-header">
        <Header />
      </div>
      <div className="ann-item__container">
        <div className="ann-item__container__body">
          <div className="ann-item__container__body-top">
            <p className="text">공지사항</p>
          </div>
          <div className="ann-item__container__body__info">
            <p className="ann-item__container__body__info-title">{AnnItem?.title}</p>
            <div className="ann-item__container__body__info-authordate">
              <div className="ann-item__container__body__info-authordate-author">
                <h3>작성자</h3>
                <p>{AnnItem?.author}</p>
              </div>
              <div className="ann-item__container__body__info-authordate-date">
                <h3>작성일</h3>
                <p>{reformatDate(AnnItem?.created_at)}</p>
              </div>
            </div>
            <p className="ann-item__container__body__info-content" dangerouslySetInnerHTML={{ __html: AnnItem?.content }} />
          </div>
          <div className="ann-item__container__button">
            {AnnItem?.previous && (
              <button className="ann-item__container__button-previous" onClick={() => navigate(`/announcement/${AnnItem?.previous}`)}>
                다음 글
              </button>
            )}
            <button className="ann-item__container__button-back" onClick={() => navigate('/announcement')}>
              목록으로
            </button>
            {AnnItem?.next && (
              <button className="ann-item__container__button-next" onClick={() => navigate(`/announcement/${AnnItem?.next}`)}>
                다음 글
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="announcement-footer">
        <Footer />
      </div>
    </div>
  );
}

export default Announcement;
