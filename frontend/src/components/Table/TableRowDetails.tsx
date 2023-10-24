import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './TableRowDetails.scss';

export interface TableRowProps {
  id: string;
  numbering: number;
  title: string;
  author: string;
  date: string;
  description: string;
  indexes: string[];
}

const TableRowDetails: React.FC<TableRowProps> = ({ id, numbering, title, author, date, description, indexes }) => {
  const navigate = useNavigate();
  const location = useLocation().pathname.split('/');
  const currentLocation = location[1];
  const currentIndex = indexes.indexOf(id);

  const handleNextItem = () => {
    const nextIndex = indexes[currentIndex + 1];
    navigate(`../${currentLocation}/${nextIndex}`);
  };

  const handlePrevItem = () => {
    const prevIndex = indexes[currentIndex - 1];
    navigate(`../${currentLocation}/${prevIndex}`);
  };

  const handleGoBack = () => {
    navigate(`../${currentLocation}`);
  };

  return (
    <div className="talbe-detail">
      <div className="table-detail__title">
        <p>{title}</p>
      </div>
      <div className="table-detail__pre-body">
        <div className="table-detail__author">
          <div className="label">
            <p>작성자</p>
          </div>
          <p>{author}</p>
        </div>
        <div className="table-detail__date">
          <div className="label">
            <p>작성일</p>
          </div>
          <p>{date}</p>
        </div>
      </div>
      <div className="table-detail__description">
        <p>{description}</p>
      </div>
      <div className="buttons-container">
        {currentIndex !== 0 && (
          <button onClick={handlePrevItem} className="backward-button">
            이전 글
          </button>
        )}
        <button onClick={handleGoBack} className="return-button">
          목록으로
        </button>
        {currentIndex !== indexes.length - 1 && (
          <button onClick={handleNextItem} className="forward-button">
            다음 글
          </button>
        )}
      </div>
    </div>
  );
};

export default TableRowDetails;
