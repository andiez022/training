import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import './LabView.scss';
import api from '../../services/apiServices';
import { reformatDate } from '../../components/FormatDate/FormatDate';

function LabItem() {
  const { id } = useParams();
  const { data: LabItem } = useQuery(['LabItem', id], () => api.data.fetchDataById('living-lab', id || ''));

  const navigate = useNavigate();
  return (
    <div>
      <div className="lab-header">
        <Header />
      </div>
      <div className="lab-item__container">
        <div className="lab-item__container__body">
          <div className="lab-item__container__body-top">
            <p className="text">공지사항</p>
          </div>
          <div className="lab-item__container__body__info">
            <p className="lab-item__container__body__info-title">{LabItem?.title}</p>
            <div className="lab-item__container__body__info-authordate">
              <div className="lab-item__container__body__info-authordate-author">
                <h3>작성자</h3>
                <p>{LabItem?.author}</p>
              </div>
              <div className="lab-item__container__body__info-authordate-date">
                <h3>작성일</h3>
                <p>{reformatDate(LabItem?.created_at)}</p>
              </div>
            </div>
            <p className="lab-item__container__body__info-content" dangerouslySetInnerHTML={{ __html: LabItem?.content }} />
          </div>
          <div className="lab-item__container__button">
            {LabItem?.previous && (
              <button className="lab-item__container__button-previous" onClick={() => navigate(`/living-lab/${LabItem?.previous}`)}>
                다음 글
              </button>
            )}
            <button className="lab-item__container__button-back" onClick={() => navigate('/living-lab')}>
              목록으로
            </button>
            {LabItem?.next && (
              <button className="lab-item__container__button-next" onClick={() => navigate(`/living-lab/${LabItem?.next}`)}>
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

export default LabItem;
