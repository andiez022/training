import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Icon, { ICONS, IconSize } from '../SVG/Icon';

import Modal, { ModalWidth } from '../Modal/DialogModal';

import './CustomTable.scss';

interface TableProps {
  className?: string;
  data: any[];
  setData: (newData: any[]) => void;
  currentPage: number;
  itemsPerPage: number;
  totalPageCount: number;
  onPageChange: (page: number) => void;
  columns: { dataId: string; label: string }[];
  showAdminActions?: boolean;
  onCreateButton?: () => void;
  handleDelete?: () => void;
  handleEdit?: (itemId: string) => void;
  disableRowClick?: boolean;
}

const CustomTable: React.FC<TableProps> = ({
  className,
  data,
  setData,
  currentPage,
  itemsPerPage,
  totalPageCount,
  columns,
  onPageChange,
  showAdminActions,
  onCreateButton,
  handleDelete,
  handleEdit,
  disableRowClick,
}) => {
  const navigate = useNavigate();
  const handleRowClick = (itemId: string) => {
    navigate(`${itemId}`);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPageCount) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPageCount);
  };

  const handleToggleSelect = (rowIndex: number) => {
    const newData = [...data];
    newData[rowIndex].selected = !newData[rowIndex].selected;
    setData(newData);
  };

  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEditAction = () => {
    const selectedItems = data.filter((item) => item.selected);
    if (selectedItems.length >= 2) {
      setEditModalOpen(true);
    }
    if (selectedItems.length === 1) {
      if (handleEdit) {
        handleEdit(selectedItems[0].id);
      }
    }
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
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
              {data.map((item, index) => (
                <tr key={item.id}>
                  {columns.map((column, columnIndex) => {
                    if (columnIndex === 0 && showAdminActions) {
                      return (
                        <td key={column.dataId}>
                          <input type="checkbox" checked={item.selected} onChange={() => handleToggleSelect(index)} />
                        </td>
                      );
                    }
                    if (!showAdminActions && columnIndex === 0) {
                      return null;
                    }

                    if (column.dataId === 'img') {
                      return (
                        <td key={column.dataId}>
                          <img src={item[column.dataId]} alt="img" />
                        </td>
                      );
                    }

                    if (column.dataId === 'actions') {
                      return (
                        <td key={column.dataId}>
                          <button
                            onClick={() => {
                              handleToggleSelect(index);
                              if (handleDelete) handleDelete();
                            }}
                          >
                            탈퇴
                          </button>
                        </td>
                      );
                    }

                    return (
                      <td key={column.dataId} onClick={!disableRowClick ? () => handleRowClick(item.id) : undefined}>
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
                onPageChange(index + 1);
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
            <button className="admin-buttons__edit" onClick={handleEditAction}>
              수정
            </button>
            <Modal dataId="" isOpen={editModalOpen} onClose={closeEditModal} className="modal" width={ModalWidth.SM}>
              <div className="message">
                <span>한 번에 하나의 게시글만 수정가능합니다.</span>
                <span>하나의 게시글만 선택해주세요.</span>
              </div>
              <div className="modal__buttons">
                <button onClick={closeEditModal} className="cancel-button">
                  취소
                </button>
                <button
                  onClick={() => {
                    closeEditModal();
                  }}
                  className="confirm-button"
                >
                  확인
                </button>
              </div>
            </Modal>
            <button className="admin-buttons__delete" onClick={openDeleteModal}>
              삭제
            </button>
            <Modal dataId="" isOpen={deleteModalOpen} onClose={closeDeleteModal} className="modal" width={ModalWidth.SM}>
              <div className="message">
                <span>1건의 게시글을</span>
                <span>삭제 하시겠습니까?</span>
              </div>
              <div className="modal__buttons">
                <button onClick={closeDeleteModal} className="cancel-button">
                  취소
                </button>
                <button
                  onClick={() => {
                    if (handleDelete) {
                      handleDelete();
                    }
                    closeDeleteModal();
                  }}
                  className="confirm-button"
                >
                  확인
                </button>
              </div>
            </Modal>
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
