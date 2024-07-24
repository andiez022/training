import React from 'react';
import './Pagination.scss';
import Icon, { ICONS, IconSize } from '../SVG/Icon';

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  const pages: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pages.push(i - 1);
  }
  console.log(currentPage);

  return (
    <div className={`pagination ${totalPosts === 0 ? 'unmount' : ''}`}>
      <button onClick={() => setCurrentPage(0)} className={`${currentPage === 0 ? 'unmount' : ''}`}>
        <Icon component={ICONS.ARROW_LEFT_DOUBLE} size={IconSize.LG} />
      </button>
      <button onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)} className={`${currentPage === 0 ? 'unmount' : ''}`}>
        <Icon component={ICONS.ARROW_LEFT} size={IconSize.LG} />
      </button>
      {pages.map((page) => (
        <button key={page} className={page === currentPage ? 'current-page' : ''} onClick={() => setCurrentPage(page)}>
          {page + 1}
        </button>
      ))}
      <button
        className={`${currentPage === Math.ceil(totalPosts / postsPerPage) - 1 ? 'unmount' : ''}`}
        onClick={() => currentPage < Math.ceil(totalPosts / postsPerPage) - 1 && setCurrentPage(currentPage + 1)}
      >
        <Icon component={ICONS.ARROW_RIGHT} size={IconSize.LG} />
      </button>
      <button
        onClick={() => setCurrentPage(Math.ceil(totalPosts / postsPerPage) - 1)}
        className={`${currentPage === Math.ceil(totalPosts / postsPerPage) - 1 ? 'unmount' : ''}`}
      >
        <Icon component={ICONS.ARROW_RIGHT_DOUBLE} size={IconSize.LG} />
      </button>
    </div>
  );
};

export default Pagination;
