import React from 'react';

import './ItemDetail.scss';

interface ItemDetailProps {
  id: number;
  image: string;
  title: string;
  author: string;
  link: string;
  description: string;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ id, image, title, author, link, description }) => {
  return (
    <div className="campaign-view">
      <div className="item-wrapper">
      <img src={image} alt="item detail" />
      <div className="item-body">
        <div className="item-body__title">
          <p>{title}</p>
        </div>
        <div className="item-body__author">
          <p>작성자{author}</p>
        </div>
        <div className="item-body__link">
          <p>링크{link}</p>
        </div>
        <div className="item-body__description">
          <p>{description}</p>
        </div>
      </div>
    </div>
    <button>목록으로</button>
    </div>
  );
};

export default ItemDetail;
