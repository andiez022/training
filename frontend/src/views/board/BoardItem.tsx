import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import TableRowDetails from '../../components/Table/TableRowDetails';

import Modal, { ModalWidth } from '../../components/Modal/DialogModal';
import api from '../../services/apiServices';

import './BoardView.scss';

const BoardItem: React.FunctionComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: dataItem, error } = useQuery(['boardItem', id], () => api.data.fetchDataById('free-board', id || ''));

  if (error) {
    console.log(error);
  }

  const handleDisplayItem = (itemId: string) => {
    navigate(`/board/${itemId}`);
  };

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const openPasswordModal = () => {
    setPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setPasswordModalOpen(false);
  };

  const [editModalOpen, setEditModalOpen] = useState(false);

  const openEditModal = () => {
    setEditModalOpen(true);
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

  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <div className="board-view">
      <div className="board-view__top">
        <div className="board-view__content">
          <div className="board-view__table-head">
            <div className="board-view__title">
              <h2 className="gradual-color-transition">자유게시판</h2>
            </div>
          </div>
          {dataItem && (
            <TableRowDetails
              author={dataItem.author}
              content={dataItem.content}
              createdAt={dataItem.created_at}
              id={dataItem.id}
              title={dataItem.title}
              updatedAt={dataItem.updated_at}
              userId={dataItem.user_id}
              onNextItem={() => handleDisplayItem(dataItem.next ?? '')}
              onPrevItem={() => handleDisplayItem(dataItem.previous ?? '')}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              hasNext={!!dataItem.next}
              hasPrev={!!dataItem.previous}
              onFreeBoard
            />
          )}
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
          <Modal dataId="" isOpen={deleteModalOpen} onClose={closeDeleteModal} className="modal" width={ModalWidth.SM}>
            <div className="message">
              <span>건의 게시글을</span>
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
        </div>
      </div>
    </div>
  );
};

export default BoardItem;
