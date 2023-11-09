import React, { useState, useEffect } from 'react';

import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';
import CustomTable from '../../components/Table/CustomTable';
import Modal, { ModalWidth } from '../../components/Modal/DialogModal';

import { UserInfo } from '../../services/types/common';
import api from '../../services/apiServices';

import './UserManagementView.scss';

const UserManagementView: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const columns = [
    { dataId: 'selected', label: '' },
    { dataId: 'index', label: '번호' },
    { dataId: 'full_name', label: '이름' },
    { dataId: 'username', label: '아이디' },
    { dataId: 'password', label: '비밀번호' },
    { dataId: 'email', label: '이메일' },
    { dataId: 'phone_number', label: '휴대폰 번호' },
    { dataId: 'actions', label: '' },
  ];

  const [searchBy, setSearchBy] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageData, setPageData] = useState([]);
  const [dataItem, setDataItem] = useState<UserInfo | null>(null);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const [selectedDropdownText, setSelectedDropdownText] = useState('이름');
  const [inputText, setInputText] = useState('');

  const handleDropdownItemClick = (itemText: string) => {
    if (itemText !== selectedDropdownText) {
      setSelectedDropdownText(itemText);
      if (itemText === '이름') {
        setSearchBy('name');
      } else {
        setSearchBy('email');
      }
      setSearchValue('');
    }
  };

  const handleFetchItem = async (itemId: string) => {
    try {
      const responseData = await api.data.fetchDataById('user', itemId);
      setDataItem(responseData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const openDeleteModal = async (itemId: string) => {
    try {
      await handleFetchItem(itemId);
      setDeleteModalOpen(true);
    } catch (error) {
      console.error('Error attempting to edit data: ', error);
    }
  };

  const handleDelete = async (itemId: string) => {
    try {
      await api.data.deleteDataById('user', itemId);
      window.location.reload();
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page - 1);
  };

  useEffect(() => {
    const dataService = api.data;
    dataService
      .fetchDataList('user', {
        searchBy,
        searchValue,
        page,
        pageSize,
      })
      .then((responseData) => {
        const newData = responseData.list.map((item: UserInfo, index: number) => ({
          ...item,
          index: page * pageSize + (index + 1),
        }));

        setPageData(newData);

        setTotalPageCount(Math.ceil(responseData.total / pageSize));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, [searchBy, searchValue, page, pageSize]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const inputElement = event.target as HTMLInputElement;
      setSearchValue(inputElement.value);
    }
  };

  return (
    <div className="user-management-view">
      <div className="user-management-view__top">
        <div className="user-management-view__content">
          <div className="user-management-view__table-head">
            <div className="user-management-view__title">
              <h2 className="gradual-color-transition">리빙랩 회원</h2>
            </div>
            <div className="user-management-view__search-container">
              <Dropdown
                elementAction={
                  <Button icon={ICONS.ARROW_DOWN} iconPlacement={ButtonIconPlacement.Right} className="button--text-icon">
                    {selectedDropdownText || '이름'}
                  </Button>
                }
              >
                <DropdownItem onClick={() => handleDropdownItemClick('이름')} isSelected={selectedDropdownText === '이름'}>
                  이름
                </DropdownItem>
                <DropdownItem onClick={() => handleDropdownItemClick('이메일')} isSelected={selectedDropdownText === '이메일'}>
                  이메일
                </DropdownItem>
              </Dropdown>
              <div className="user-management-view__search-area">
                <TextInput
                  dataId=""
                  placeholder="리빙랩 회원 검색"
                  value={inputText}
                  onKeyDown={handleKeyPress}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <Button
                  icon={ICONS.MAGNIFIER}
                  iconPlacement={ButtonIconPlacement.Left}
                  iconSize={IconSize.XL}
                  className="button--icon-text"
                  onClick={() => setSearchValue(inputText)}
                >
                  검색
                </Button>
              </div>
            </div>
          </div>
          <CustomTable
            data={pageData}
            currentPage={page + 1}
            totalPageCount={totalPageCount}
            onPageChange={handlePageChange}
            columns={columns}
            showAdminActions={false}
            onRowClick={() => {}}
            disableRowClick={isLoggedIn}
            onCheckboxChange={() => {}}
            checkboxState={{}}
            className="user-management-table"
            userDelete={openDeleteModal}
          />
          <Modal dataId="" isOpen={deleteModalOpen} onClose={closeDeleteModal} className="modal" width={ModalWidth.SM}>
            <div className="message">
              {dataItem && (
                <span>
                  {dataItem.full_name} ({dataItem.username}) 님을
                </span>
              )}
              <span>탈퇴시키겠습니까?</span>
            </div>
            <div className="modal__buttons">
              <button onClick={closeDeleteModal} className="cancel-button">
                취소
              </button>
              <button
                onClick={() => {
                  handleDelete(dataItem?.id ?? '');
                  setDeleteModalOpen(false);
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

export default UserManagementView;
