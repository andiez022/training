import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';
import CustomTable from '../../components/Table/CustomTable';

import { DataItem, columns, CheckboxState } from '../../services/types/common';
import api from '../../services/apiServices';

import './AnnView.scss';

const AnnView: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const [searchBy, setSearchBy] = useState('title');
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageData, setPageData] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(0);

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

  const handleDelete = async () => {
    const itemsToDelete = Object.keys(checkboxState).filter((key) => checkboxState[key] === true);
    try {
      await api.data.deleteData('notice', itemsToDelete);
      window.location.reload();
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

  useEffect(() => {
    const dataService = api.data;
    dataService
      .fetchDataList('notice', {
        searchBy,
        searchValue,
        page,
        pageSize,
      })
      .then((responseData) => {
        const newData = responseData.list.map((item: DataItem, index: number) => ({
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
    <div className="ann-view">
      <div className="ann-view__top">
        <div className="ann-view__image">
          <img src="/announcement_bn.png" alt="AnnBG" />
          {!isLoggedIn && (
            <>
              <div className="ann-view__image__overlay" />
              <div className="ann-view__image__icon">
                <img src="icon_announcement.svg" alt="AnnIcon" />
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
