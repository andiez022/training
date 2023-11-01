import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Icon, { ICONS, IconSize } from '../SVG/Icon';

import './CustomTable.scss';

interface TableProps {
  data: any[];
  itemsPerPage: number;
  columns: { dataId: string; label: string }[];
  className?: string;
  showAdminActions: boolean;
  onCreateButton: () => void;
  setData: (newData: any[]) => void;
}

const CustomTable: React.FC<TableProps> = ({ data, setData, itemsPerPage, columns, className, showAdminActions, onCreateButton }) => {
  const navigate = useNavigate();
  const handleRowClick = (itemId: any) => {
    navigate(`${itemId}`);
  };

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

  const handleToggleSelect = (rowIndex: number) => {
    const newData = [...data];
    newData[rowIndex].selected = !newData[rowIndex].selected;
    setData(newData);
    console.log(data[rowIndex].selected);
  };

  const tableClasses = classNames('customized-table', { managerial: showAdminActions }, className);

  return (
    <div className={tableClasses}>
      <table>
        <thead>
          <tr>
            {columns.map((column, columnIndex) => {
              if (columnIndex === 0 && !showAdminActions) {
                return null;
              }
              return <th key={column.dataId}>{column.label}</th>;
            })}
          </tr>
        </thead>
        <tbody style={{ maxHeight: '600px' }}>
          {data.length !== 0 ? (
            <>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  {columns.map((column, columnIndex) => {
                    if (columnIndex === 0 && showAdminActions) {
                      return (
                        <td key={column.dataId}>
                          <input type="checkbox" checked={item.selected} onChange={() => handleToggleSelect(index + indexOfFirstItem)} />
                        </td>
                      );
                    }
                    if (!showAdminActions && columnIndex === 0) {
                      return null;
                    }
                    return (
                      <td key={column.dataId} onClick={() => handleRowClick(item.id)}>
                        {item[column.dataId]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </>
          ) : (
            <div className="empty-body">현재 사용 가능한 데이터가 없습니다.</div>
          )}
        </tbody>
      </table>
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
        {showAdminActions && (
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
