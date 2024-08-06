import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectToken } from '../../services/controllers/common/UserSelector';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import './AnnouncementView.scss';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

import ancmImg from '../../common/assets/images/annouc-img.png';
import ancmImgx2 from '../../common/assets/images/annouc-img@2x.png';
import ancmIcon from '../../common/assets/images/icon-announcement.png';
import ancmIconx2 from '../../common/assets/images/icon-announcement@2x.png';
import { CheckedItem, DataItem } from '../../services/types/common';
import api from '../../services/apiServices';
import { reformatDate } from '../../components/FormatDate/FormatDate';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';

const Announcement = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchByData, setSearchByData] = useState('title');
  const [searchValueData, setSearchValueData] = useState('');

  const searchBy = searchByData;
  const searchValue = searchValueData;
  const page = currentPage;
  const pageSize = postsPerPage;

  const { data: annResponse } = useQuery(['annDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('notice', {
      searchBy,
      searchValue,
      page,
      pageSize,
    }),
  );
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchByData(e.target.value);
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSearch = () => {
    setSearchValueData(inputValue);
  };

  const navigate = useNavigate();
  const goToItem = (pageType: string, itemId: string) => {
    navigate(`/${pageType}/${itemId}`);
  };

  const isLoggedIn = useSelector(selectToken) !== null;

  const [checkedItem, setCheckedItem] = useState<CheckedItem>({});
  const handleCheckedItemChange = (itemID: string) => {
    setCheckedItem((preCheckedItem) => ({
      ...preCheckedItem,
      [itemID]: !preCheckedItem[itemID],
    }));
  };

  // ? delete data
  const deleteDataMutation = useMutation((itemsToDelete: string[]) => api.data.deleteData('notice', itemsToDelete), {
    onSuccess: () => {
      navigate(0);
      toast.success('성공적으로 삭제되었습니다.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    },
  });
  const itemsToDelete = Object.keys(checkedItem).filter((key) => checkedItem[key] === true);
  console.log(itemsToDelete);
  const editId = Object.keys(checkedItem).find((key) => checkedItem[key] === true);
  console.log(editId);

  const handleDelete = () => {
    try {
      deleteDataMutation.mutate(itemsToDelete);
    } catch (error) {
      console.error('Error delete data:', error);
    }
  };

  const [showModal, setShowModal] = useState(false);

  // ? Edit
  const [editModal, setEditModal] = useState(false);
  const checkedItemEdit = Object.values(checkedItem).filter((value) => value === true).length;
  const handleEdit = (itemId: string | undefined) => {
    navigate(`edit/${itemId}`);
  };

  const handleEditAction = () => {
    if (checkedItemEdit >= 2) {
      setEditModal(true);
    }

    const editId = Object.keys(checkedItem).find((key) => checkedItem[key] === true);
    if (checkedItemEdit === 1 && editId) {
      if (handleEdit) {
        handleEdit(editId);
      }
    }
  };

  return (
    <div>
      <div className="announcement-header">
        <Header />
      </div>
      <div className="announcement-content">
        <picture className="announcement-content__img">
          <source media="(min-width: 1921px)" srcSet={ancmImgx2} />
          <img src={ancmImg} alt="announcement1" />
          <div className="announcement-content__img__text-overlay">
            <picture className="announcement-content__img__text-overlay-icon" data-aos="fade-up">
              <source media="(min-width: 1921px)" srcSet={ancmIconx2} />
              <img src={ancmIcon} alt="announcement" />
            </picture>
            <p data-aos="fade-up">깨끗한 바다 부산을 위해 시민들이 직접 참여 중인 프로젝트를 소개합니다.</p>
          </div>
        </picture>
        <div className="announcement-content__body">
          <div className="announcement-content__body-top">
            <p className="text">공지사항</p>
            <div className="announcement-content__body-top-right">
              <div className="box1">
                <select className="box1-select" name="filter" onChange={handleChange}>
                  <option value="title">제목</option>
                  <option value="author">작성자</option>
                </select>
              </div>
              <div className="box23">
                <div className="box2">
                  <input type="text" className="box2-input" placeholder="공지사항 검색" onChange={handleChangeInput} />
                </div>
                <div className="box3" onClick={handleSearch}>
                  <Icon className="icon-search-glass" component={ICONS.SEARCH_GLASS} size={IconSize.XL} />
                  <p className="box3-text">검색</p>
                </div>
              </div>
            </div>
          </div>
          <div className="announcement-content__body-data">
            <table>
              <thead>
                <th>
                  <div className="number">번호</div>
                </th>
                <th>
                  <div className="title">제목</div>
                </th>
                <th>
                  <div className="writer">작성자</div>
                </th>
                <th>
                  <div className="date">작성일</div>
                </th>
              </thead>
              {annResponse?.total !== 0 ? (
                annResponse?.list.map((item: DataItem, index: number) => (
                  <tr className="table-data" key={item.id}>
                    <td>
                      {isLoggedIn ? (
                        <input
                          style={{ width: '20px', height: '20px', marginRight: '30px' }}
                          type="checkbox"
                          checked={checkedItem[item.id]}
                          onChange={() => {
                            handleCheckedItemChange(item.id);
                          }}
                        />
                      ) : (
                        ''
                      )}
                      {page * pageSize + index + 1}
                    </td>
                    <td onClick={() => goToItem('announcement', item.id)}>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{reformatDate(item.created_at)}</td>
                  </tr>
                ))
              ) : (
                <div style={{ width: '70vw', textAlign: 'center', marginTop: '50px' }}>현재 사용 가능한 데이터가 없습니다.</div>
              )}
            </table>
            <div className="pagination-button">
              <Pagination
                totalPosts={annResponse?.total ?? 0}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
              {isLoggedIn && (
                <div className="edit-button" onClick={() => handleEditAction()}>
                  <p>수정</p>
                </div>
              )}
              <Modal isShowing={editModal}>
                <div className="modal">
                  <div className="modal__close" onClick={() => setEditModal(false)}>
                    <Icon className="icon-close" component={ICONS.CLOSE} size={IconSize.SM} />
                  </div>
                  <p style={{ padding: '10px', textAlign: 'center' }} className="modal__confirm">
                    한 번에 하나의 게시글만 수정가능합니다. 하나의 게시글만 선택해주세요.
                  </p>
                  <div className="modal__button">
                    <button
                      className="modal__button-cancel"
                      style={{
                        width: '100%',
                        color: '#fff',
                        background: 'transparent linear-gradient(90deg, #0066c1 0%, #009fe5 100%) 0% 0% no-repeat padding-box',
                      }}
                      onClick={() => setEditModal(false)}
                    >
                      취소
                    </button>
                  </div>
                </div>
              </Modal>

              {isLoggedIn && (
                <button
                  className="delete-button"
                  onClick={() => {
                    if (itemsToDelete) {
                      if (itemsToDelete.length > 0) setShowModal(true);
                    }
                  }}
                >
                  <p>삭제</p>
                </button>
              )}
              <Modal isShowing={showModal}>
                <div className="modal">
                  <div className="modal__close" onClick={() => setShowModal(false)}>
                    <Icon className="icon-close" component={ICONS.CLOSE} size={IconSize.SM} />
                  </div>
                  <p className="modal__confirm">1건의 게시글을 삭제 하시겠습니까?</p>
                  <div className="modal__button">
                    <button className="modal__button-cancel" onClick={() => setShowModal(false)}>
                      취소
                    </button>
                    <button
                      className="modal__button-delete"
                      onClick={() => {
                        handleDelete();
                      }}
                    >
                      확인
                    </button>
                  </div>
                </div>
              </Modal>

              {isLoggedIn && (
                <Link to="./create">
                  <div className="add-new-button">
                    <Icon component={ICONS.PEN_ICON} size={IconSize.LG} />
                    <p>글쓰기</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="announcement-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Announcement;
