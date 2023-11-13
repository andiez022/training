import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';
import CustomTable from '../../components/Table/CustomTable';
import ImageGallery from '../../components/ImageGallery/ImageGallery';

import { DataItem, columns, CheckboxState } from '../../services/types/common';
import api from '../../services/apiServices';

import './CampaignView.scss';

const CampaignView: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const [searchBy, setSearchBy] = useState('title');
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(isLoggedIn ? 10 : 12);
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
      await api.data.deleteData('campaign', itemsToDelete);
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

  const handleDisplayItem = (itemId: string) => {
    navigate(`/campaign/${itemId}`);
  };

  const handlePageChange = (page: number) => {
    setPage(page - 1);
  };

  useEffect(() => {
    const dataService = api.data;
    dataService
      .fetchDataList('campaign', {
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
    <div className="campaign-view">
      <div className="campaign-view__top">
        <div className="campaign-view__image">
          <img src="/campaign_bn.png" alt="campaignBG" />
          {!isLoggedIn && (
            <>
              <div className="campaign-view__image__overlay" />
              <div className="campaign-view__image__icon">
                <img src="/icon_campaign.svg" alt="campaignIcon" />
                <p>깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.</p>
              </div>
            </>
          )}
        </div>
        <div className="campaign-view__content">
          <div className="campaign-view__grid-head">
            <div className="campaign-view__title">
              <h2 className="gradual-color-transition">캠페인</h2>
            </div>
            <div className="campaign-view__search-container">
              <Dropdown
                elementAction={
                  <Button icon={ICONS.ARROW_DOWN} iconPlacement={ButtonIconPlacement.Right} className="button--text-icon">
                    {selectedDropdownText || '제목'}
                  </Button>
                }
              >
                {isLoggedIn ? (
                  <>
                    <DropdownItem onClick={() => handleDropdownItemClick('제목')} isSelected={selectedDropdownText === '제목'}>
                      제목
                    </DropdownItem>
                    <DropdownItem onClick={() => handleDropdownItemClick('작성자')} isSelected={selectedDropdownText === '작성자'}>
                      작성자
                    </DropdownItem>
                  </>
                ) : (
                  <DropdownItem onClick={() => handleDropdownItemClick('제목')} isSelected={selectedDropdownText === '제목'}>
                    제목
                  </DropdownItem>
                )}
              </Dropdown>
              <div className="campaign-view__search-area">
                <TextInput
                  dataId="author"
                  placeholder="캠페인 검색"
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
          {!isLoggedIn && (
            <ImageGallery
              data={pageData}
              onImageClick={handleDisplayItem}
              currentPage={page + 1}
              totalPageCount={totalPageCount}
              onPageChange={handlePageChange}
            />
          )}
          {isLoggedIn && (
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
              onRowClick={handleDisplayItem}
              checkboxState={checkboxState}
              onCheckboxChange={handleCheckboxChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignView;
