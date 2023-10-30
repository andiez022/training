import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon, { ICONS, IconSize } from '../SVG/Icon';
import { GalleryImageProps } from './GalleryImageDetails';

import './ImageGallery.scss';

interface ImageGalleryProps {
  data: GalleryImageProps[];
  userRole: string;
  onCreateButton: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ data, userRole, onCreateButton }) => {
  const itemsPerPage = 12;
  const totalPageCount = Math.ceil(data.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPageCount);
  };

  return (
    <div className="gallery-container">
      {Array.from({ length: itemsPerPage }, (_, itemIndex) => (
        <div key={itemIndex} className="grid-row">
          {currentItems.slice(itemIndex * itemsPerPage, (itemIndex + 1) * itemsPerPage).map((item) => (
            <Link to={`/campaign/${item.id}`} key={item.id}>
              <figure>
                <img src={item.image} alt={item.description} />
                <figcaption>{item.title}</figcaption>
              </figure>
            </Link>
          ))}
        </div>
      ))}
      <div className="pagination">
        {currentPage > 1 && (
          <div className="icon-nav">
            <button onClick={handleFirstPage} className="button-nav">
              <Icon component={ICONS.FIRST} size={IconSize.XXL} />
            </button>
            <button onClick={handlePrevPage} className="button-nav">
              <Icon component={ICONS.BACKWARD} size={IconSize.XXL} />
            </button>
          </div>
        )}
        <div className="page-number">
          {Array.from({ length: totalPageCount }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(index + 1);
              }}
              className={`button ${currentPage === index + 1 ? 'clicked' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {currentPage < totalPageCount && (
          <div className="icon-nav">
            <button onClick={handleNextPage} className="button-nav">
              <Icon component={ICONS.FORWARD} size={IconSize.XXL} />
            </button>
            <button onClick={handleLastPage} className="button-nav">
              <Icon component={ICONS.LAST} size={IconSize.XXL} />
            </button>
          </div>
        )}
        {userRole === 'admin' && (
          <div className="admin-buttons">
            <button className="admin-buttons__edit">수정</button>
            <button className="admin-buttons__remove">삭제</button>
            <button className="admin-buttons__create" onClick={onCreateButton}>
              글쓰기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
