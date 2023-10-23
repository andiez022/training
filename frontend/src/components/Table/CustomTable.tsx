import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Icon, { ICONS, IconSize } from '../SVG/Icon';

import './CustomTable.scss';

interface TableProps {
  data: any[];
  itemsPerPage: number;
  columns: { dataId: string; label: string }[];
  className?: string;
  userRole: string;
  onCreateButton?: () => void;
}

const CustomTable: React.FC<TableProps> = ({ data, itemsPerPage, columns, className, userRole, onCreateButton }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPageCount = Math.ceil(data.length / itemsPerPage);

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

  const navigate = useNavigate();

  const handleRowClick = (itemId: any) => {
    navigate(`${itemId}`);
  };

  const tableClasses = classNames('customized-table', className);

  return (
    <div className={tableClasses}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.dataId}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody style={{ maxHeight: '600px' }}>
          {currentItems.map((item) => (
            <tr key={item}>
              {columns.map((column) => (
                <td key={column.dataId} onClick={() => handleRowClick(item.id)}>
                  {item[column.dataId]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {currentPage > 1 && (
          <div className="icon-nav">
            <button onClick={handleFirstPage} className="button-nav">
              <Icon component={ICONS.FIRST} size={IconSize.XL} />
            </button>
            <button onClick={handlePrevPage} className="button-nav">
              <Icon component={ICONS.BACKWARD} size={IconSize.XL} />
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
              <Icon component={ICONS.FORWARD} size={IconSize.XL} />
            </button>
            <button onClick={handleLastPage} className="button-nav">
              <Icon component={ICONS.LAST} size={IconSize.XL} />
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

export default CustomTable;
