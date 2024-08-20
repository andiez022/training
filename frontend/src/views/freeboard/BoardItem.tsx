import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import './FreeBoardView.scss';
import api from '../../services/apiServices';
import { reformatDate } from '../../components/FormatDate/FormatDate';

function BoardItem() {
  const { id } = useParams();
  const { data: BoardItem } = useQuery(['BoardItem', id], () => api.data.fetchDataById('free-board', id || ''));

  const navigate = useNavigate();
  return (
    <div>
      <div className="board-header">
        <Header />
      </div>
      <div className="board-item__container">
        <div className="board-item__container__body">
          <div className="board-item__container__body-top">
            <p className="text">공지사항</p>
          </div>
          <div className="board-item__container__body__info">
            <p className="board-item__container__body__info-title">{BoardItem?.title}</p>
            <div className="board-item__container__body__info-authordate">
              <div className="board-item__container__body__info-authordate-author">
                <h3>작성자</h3>
                <p>{BoardItem?.author}</p>
              </div>
              <div className="board-item__container__body__info-authordate-date">
                <h3>작성일</h3>
                <p>{reformatDate(BoardItem?.created_at)}</p>
              </div>
            </div>
            <p className="board-item__container__body__info-content" dangerouslySetInnerHTML={{ __html: BoardItem?.content }} />
          </div>
          <div className="board-item__container__button">
            {BoardItem?.previous && (
              <button className="board-item__container__button-previous" onClick={() => navigate(`/free-board/${BoardItem?.previous}`)}>
                다음 글
              </button>
            )}
            <button className="board-item__container__button-back" onClick={() => navigate('/free-board')}>
              목록으로
            </button>
            {BoardItem?.next && (
              <button className="board-item__container__button-next" onClick={() => navigate(`/free-board/${BoardItem?.next}`)}>
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

export default BoardItem;
