import React, { useState } from 'react';

import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';
import CustomTable from '../../components/Table/CustomTable';
import Modal, { ModalWidth } from '../../components/Modal/DialogModal';

import { UserManagementData } from '../../services/constants/constants';

import './UserManagementView.scss';

const UserManagementView: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const columns = [
    { dataId: 'selected', label: '' },
    { dataId: 'numbering', label: '번호' },
    { dataId: 'name', label: '이름' },
    { dataId: 'username', label: '아이디' },
    { dataId: 'password', label: '비밀번호' },
    { dataId: 'email', label: '이메일' },
    { dataId: 'phone', label: '휴대폰 번호' },
    { dataId: 'actions', label: '' },
  ];

  type TableSearchColumn = 'name' | 'email';

  const [filteredData, setFilteredData] = useState(UserManagementData);

  const updateFilteredData = () => {
    const newFilteredData = UserManagementData.filter((row) => {
      const cellValue = row[selectedSearchColumn];
      return cellValue.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredData(newFilteredData);
  };

  const handleEnterKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      updateFilteredData();
    }
  };

  const currentlySelectedItem = filteredData.filter((item) => item.selected)[0];

  const [selectedDropdownText, setSelectedDropdownText] = useState('이름');
  const [searchText, setSearchText] = useState('');
  const [selectedSearchColumn, setSelectedSearchColumn] = useState<TableSearchColumn>('name');

  const handleDropdownItemClick = (itemText: string) => {
    if (itemText !== selectedDropdownText) {
      setSelectedDropdownText(itemText);
      if (itemText === '이름') {
        setSelectedSearchColumn('name');
      } else {
        setSelectedSearchColumn('email');
      }
      setSearchText('');
    }
  };

  const handleDelete = () => {
    const dataToKeep = filteredData.filter((item) => !item.selected);
    setFilteredData(dataToKeep);
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    const unselectedData = filteredData.map((item) => ({
      ...item,
      selected: false,
    }));
    setFilteredData(unselectedData);
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
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleEnterKeyPress}
                />
                <Button
                  icon={ICONS.MAGNIFIER}
                  iconPlacement={ButtonIconPlacement.Left}
                  iconSize={IconSize.XL}
                  className="button--icon-text"
                  onClick={updateFilteredData}
                >
                  검색
                </Button>
              </div>
            </div>
          </div>
          {/* <CustomTable
            data={filteredData}
            setData={setFilteredData}
            itemsPerPage={10}
            columns={columns}
            showAdminActions={false}
            className="user-management-table"
            handleDelete={openDeleteModal}
            disableRowClick
          /> */}
          <Modal dataId="" isOpen={deleteModalOpen} onClose={closeDeleteModal} className="modal" width={ModalWidth.SM}>
            <div className="message">
              {currentlySelectedItem && (
                <span>
                  {currentlySelectedItem.name} ({currentlySelectedItem.username}) 님을
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
                  handleDelete();
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
