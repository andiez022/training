import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal/Modal';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import './CampainView.scss';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';
import CampainImg from '../../common/assets/images/campain-img.png';
import CampainImgx2 from '../../common/assets/images/campain-img@2x.png';
import CampainIcon from '../../common/assets/images/icon-campain (1).png';
import CampainIconx2 from '../../common/assets/images/icon-campain (2).png';
import api from '../../services/apiServices';
import { CheckedItem, DataItem } from '../../services/types/common';
import Pagination from '../../components/Pagination/Pagination';
import { selectToken } from '../../services/controllers/common/UserSelector';
import { reformatDate } from '../../components/FormatDate/FormatDate';

const CampainView = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(12);
  const [searchByData, setSearchByData] = useState('title');
  const [searchValueData, setSearchValueData] = useState('');

  const searchBy = searchByData;
  const searchValue = searchValueData;
  const page = currentPage;
  const pageSize = postsPerPage;

  const { data: campaignResponse } = useQuery(['campaignDataShort', searchBy, searchValue, page, pageSize], () =>
    api.data.fetchDataList('campaign', {
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
  const deleteDataMutation = useMutation((itemsToDelete: string[]) => api.data.deleteData('campaign', itemsToDelete), {
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
  const editId = Object.keys(checkedItem).find((key) => checkedItem[key] === true);

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
    <>
      <div className="campain-header">
        <Header />
      </div>
      <div className="campain-container">
        <picture className="campain-container__img">
          <source media="(min-width: 1921px)" srcSet={CampainImgx2} />
          <img src={CampainImg} alt="home" />
          <div className="campain-container__img__text-overlay">
            <picture className="campain-container__img__text-overlay-icon" data-aos="fade-up">
              <source media="(min-width: 1921px)" srcSet={CampainIconx2} />
              <img src={CampainIcon} alt="campain" />
            </picture>
            <p data-aos="fade-up">깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.</p>
          </div>
        </picture>
        <div className="campain-container__body">
          <div className="campain-container__body-top">
            <p className="text">캠페인</p>
            <div className="campain-container__body-top-right">
              <div className="box1">
                <select className="box1-select" name="filter" onChange={handleChange}>
                  <option value="title">제목</option>
                </select>
              </div>
              <div className="box23">
                <div className="box2">
                  <input type="text" className="box2-input" placeholder="리빙랩 검색" onChange={handleChangeInput} />
                </div>
                <div className="box3" onClick={handleSearch}>
                  <Icon className="icon-search-glass" component={ICONS.SEARCH_GLASS} size={IconSize.XL} />
                  <p className="box3-text">검색</p>
                </div>
              </div>
            </div>
          </div>
          {isLoggedIn ? (
            <div className="campain-container__body-data admin">
              <table>
                <thead>
                  <tr>
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
                  </tr>
                </thead>
                {campaignResponse?.total !== 0 ? (
                  campaignResponse?.list.map((item: DataItem, index: number) => (
                    <tr key={item.id}>
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
                      <td className="title-data" onClick={() => goToItem('campain', item.id)}>
                        {item.title}
                      </td>
                      <td onClick={() => goToItem('campain', item.id)}>{item.author}</td>
                      <td onClick={() => goToItem('campain', item.id)}>{reformatDate(item.created_at)}</td>
                    </tr>
                  ))
                ) : (
                  <div style={{ width: '70vw', textAlign: 'center', marginTop: '50px' }}>현재 사용 가능한 데이터가 없습니다.</div>
                )}
              </table>
            </div>
          ) : (
            <div className="campain-container__body-content grid-cols-4 grid-cols-3 grid-cols-2">
              {campaignResponse?.total !== 0 ? (
                campaignResponse?.list.map((item: DataItem) => (
                  <div className="campain-container__body-content__item" key={item.id} onClick={() => goToItem('campain', item.id)}>
                    <div className="campain-container__body-content__item-img">
                      <img src={item.image} alt="item-img" />
                    </div>
                    <div className="campain-container__body-content__item-title">{item.title}</div>
                  </div>
                ))
              ) : (
                <div style={{ width: '70vw', textAlign: 'center', marginTop: '50px' }}>현재 캠페인이 없습니다.</div>
              )}
            </div>
          )}
          <div className="pagination-button">
            <Pagination
              totalPosts={campaignResponse?.total ?? 0}
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
            {isLoggedIn ? (
              <div className="add-new-button" onClick={() => navigate('./create')}>
                <Icon component={ICONS.PEN_ICON} size={IconSize.LG} />
                <p>글쓰기</p>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className="campain-footer">
        <Footer />
      </div>
    </>
  );
};

export default CampainView;
