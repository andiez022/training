import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './TableRowDetails.scss';

export interface TableRowProps {
  id: string;
  title: string;
  author: string;
  date: string;
  description: string;
}

const TableRowDetails: React.FC<TableRowProps> = ({ id, title, author, date, description }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const previousRoute = location.state?.from;

  const handleGoBack = () => {
    navigate(previousRoute);
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
        <button onClick={handleGoBack}> 목록으로 </button>
        <button onClick={handleGoBack}> 다음 글 </button>
      </div>
    </div>
  );
};

export default TableRowDetails;
