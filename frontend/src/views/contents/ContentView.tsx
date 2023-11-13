import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import VideoCollection from '../../components/VideoCollection/VideoCollection';
import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';
import CustomTable from '../../components/Table/CustomTable';

import { DataItem, CheckboxState, columns } from '../../services/types/common';
import api from '../../services/apiServices';

import './ContentView.scss';

const ContentView: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
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

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const inputElement = event.target as HTMLInputElement;
      setSearchValue(inputElement.value);
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
      await api.data.deleteData('content', itemsToDelete);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting data: ', error);
    }
  };

  const handleEdit = async (itemId: string) => {
    navigate(`edit/${itemId}`);
  };

  const handleCreatePost = () => {
    navigate('create');
  };

  const handlePageChange = (page: number) => {
    setPage(page - 1);
  };

  useEffect(() => {
    const dataService = api.data;
    dataService
      .fetchDataList('content', {
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

  return (
    <div className="content-view">
      <div className="content-view__top">
        <div className="content-view__image">
          <img src="/content_bn.png" alt="contentBG" />
          {!isLoggedIn && (
            <>
              <div className="content-view__image__overlay" />
              <div className="content-view__image__icon">
                <img src="/icon_content.svg" alt="contentIcon" />
                <p>깨바부의 다양한 콘텐츠를 확인해보세요.</p>
              </div>
            </>
          )}
        </div>
        <div className="content-view__content">
          <div className="content-view__table-head">
            <div className="content-view__title">
              <h2 className="gradual-color-transition">콘텐츠</h2>
            </div>
            {isLoggedIn && (
              <div className="content-view__search-container">
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
                <div className="content-view__search-area">
                  <TextInput
                    dataId="author"
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
            )}
          </div>
          {isLoggedIn ? (
            <CustomTable
              data={pageData}
              currentPage={page + 1}
              totalPageCount={totalPageCount}
              onPageChange={handlePageChange}
              columns={columns}
              showAdminActions={isLoggedIn}
              onCreateButton={handleCreatePost}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              onRowClick={() => {}}
              disableRowClick={isLoggedIn}
              checkboxState={checkboxState}
              onCheckboxChange={handleCheckboxChange}
            />
          ) : (
            <VideoCollection data={pageData} currentPage={page + 1} totalPageCount={totalPageCount} onPageChange={handlePageChange} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentView;
