import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';
import CustomTable from '../../components/Table/CustomTable';

import { DataItem, columns, CheckboxState } from '../../services/types/common';
import { selectToken } from '../../services/controllers/common/UserSelector';
import api from '../../services/apiServices';

import annBanner from '../../common/assets/images/announcement_bn.png';
import annBannerIcon from '../../common/assets/images/icon_announcement.svg';

import './AnnView.scss';

const AnnView: React.FC = () => {
  const isLoggedIn = useSelector(selectToken) !== null;

  const pageSize = 10;

  const [searchBy, setSearchBy] = useState('title');
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);

  const [selectedDropdownText, setSelectedDropdownText] = useState('제목');
  const [inputText, setInputText] = useState('');

  const handleDropdownItemClick = (itemText: string) => {
    if (itemText !== selectedDropdownText) {
      setSelectedDropdownText(itemText);
      if (itemText === '제목') {
        setSearchBy('title');
      } else {
        setSearchBy('author');
      }
      setSearchValue('');
    }
  };

  const navigate = useNavigate();

  const [checkboxState, setCheckboxState] = useState<CheckboxState>({});

  const handleCheckboxChange = (itemId: string) => {
    setCheckboxState((prevCheckboxState) => ({
      ...prevCheckboxState,
      [itemId]: !prevCheckboxState[itemId],
    }));
  };

  const deleteDataMutation = useMutation((itemsToDelete: string[]) => api.data.deleteData('notice', itemsToDelete), {
    onSuccess: () => {
      toast.success('성공적으로 삭제되었습니다.', {
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      window.location.reload();
    },
  });

  const handleDelete = () => {
    const itemsToDelete = Object.keys(checkboxState).filter((key) => checkboxState[key] === true);

    try {
      deleteDataMutation.mutate(itemsToDelete);
    } catch (error) {
      console.error('Error deleting data: ', error);
    }
  };

  const handleEdit = (itemId: string) => {
    navigate(`edit/${itemId}`);
  };

  const handleCreateAnnouncement = () => {
    navigate('create');
  };

  const handleDisplayItem = (itemId: string) => {
    navigate(`${itemId}`);
  };

  const handlePageChange = (page: number) => {
    setPage(page - 1);
  };

  const { data: responseData, error } = useQuery(
    ['annDataList', searchBy, searchValue, page, pageSize],
    () =>
      api.data.fetchDataList('notice', {
        searchBy,
        searchValue,
        page,
        pageSize,
      }),
    {
      enabled: searchBy !== undefined && searchValue !== undefined,
    },
  );

  if (error) {
    console.log(error);
  }

  const pageData =
    responseData?.list?.map((item: DataItem, index: number) => ({
      ...item,
      index: page * pageSize + (index + 1),
    })) || [];

  const totalPageCount = responseData ? Math.ceil(responseData.total / pageSize) : 0;

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const inputElement = event.target as HTMLInputElement;
      setSearchValue(inputElement.value);
    }
  };

  return (
    <div className="ann-view">
      <div className="ann-view__top">
        <div className="ann-view__image">
          <img src={annBanner} alt="AnnBanner" />
          {!isLoggedIn && (
            <>
              <div className="ann-view__image__overlay" />
              <div className="ann-view__image__icon">
                <img src={annBannerIcon} alt="AnnBannerIcon" />
                <p>깨바부의 새로운 소식을 전합니다.</p>
              </div>
            </>
          )}
        </div>
        <div className="ann-view__content">
          <div className="ann-view__table-head">
            <div className="ann-view__title">
              <h2 className="gradual-color-transition">공지사항</h2>
            </div>
            <div className="ann-view__search-container">
              <Dropdown
                elementAction={
                  <Button icon={ICONS.ARROW_DOWN} iconPlacement={ButtonIconPlacement.Right} className="button--text-icon">
                    {selectedDropdownText || '제목'}
                  </Button>
                }
              >
                <DropdownItem onClick={() => handleDropdownItemClick('제목')} isSelected={selectedDropdownText === '제목'}>
                  제목
                </DropdownItem>
                <DropdownItem onClick={() => handleDropdownItemClick('작성자')} isSelected={selectedDropdownText === '작성자'}>
                  작성자
                </DropdownItem>
              </Dropdown>
              <div className="ann-view__search-area">
                <TextInput
                  dataId=""
                  placeholder="공지사항 검색"
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
            showAdminActions={isLoggedIn}
            onCreateButton={handleCreateAnnouncement}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            onRowClick={handleDisplayItem}
            disableRowClick={isLoggedIn}
            checkboxState={checkboxState}
            onCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AnnView;
