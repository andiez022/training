import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as MyMap } from '../../components/SVG/map.svg';
import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import ItemModal, { FacilityItem } from './ItemModal';
import CustomTable from '../../components/Table/CustomTable';
import { FacilityData } from '../../services/constants/constants';

import { CheckboxState } from '../../services/types/common';
import api from '../../services/apiServices';

import './FacilityView.scss';

const FacilityView: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const [searchBy, setSearchBy] = useState('title');
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageData, setPageData] = useState([]);
  const [dataItem, setDataItem] = useState<FacilityItem | null>(null);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const [editMode, setEditMode] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const inputElement = event.target as HTMLInputElement;
      setSearchValue(inputElement.value);
    }
  };

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
      await api.data.deleteData('facility', itemsToDelete);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting data: ', error);
    }
  };

  const handleEdit = async (itemId: string) => {
    try {
      await handleFetchItem(itemId);
      setEditMode(true);
      navigate(`edit/${itemId}`);
    } catch (error) {
      console.error('Error attempting to edit data: ', error);
    }
  };

  const handleCreatePost = () => {
    navigate('create');
  };

  const handleFetchItem = async (itemId: string) => {
    try {
      const responseData = await api.data.fetchDataById('facility', itemId);
      setDataItem(responseData);
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
      .fetchDataList('facility', {
        searchBy,
        searchValue,
        page,
        pageSize,
      })
      .then((responseData) => {
        const newData = responseData.list.map((item: FacilityItem, index: number) => ({
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

  const columns = [
    { dataId: 'placeholder', label: '' },
    { dataId: 'numbering', label: '번호' },
    { dataId: 'district', label: '행정구역' },
    { dataId: 'location', label: '지대종류' },
    { dataId: 'title', label: '시설명' },
    { dataId: 'dimension', label: '시설규모' },
    { dataId: 'img', label: '이미지' },
  ];

  const [area, setSelectedArea] = useState('부산');

  const handleMapClick = () => {
    const animationElements = document.querySelectorAll('.animation-g');

    animationElements.forEach((element) => {
      element.addEventListener('click', () => {
        const pathElement = element.querySelector('path');

        if (pathElement) {
          const clickedId = pathElement.id;

          const koreanForm = clickedId.replace(/\\u([\dA-Fa-f]{4})/g, (match, grp) => {
            return String.fromCharCode(parseInt(grp, 16));
          });

          animationElements.forEach((el) => {
            el.classList.remove('selected');
          });

          element.classList.add('selected');

          setSelectedArea(koreanForm);
        }
      });
    });
  };

  const handleDefaultButton = () => {
    setSelectedArea('부산');

    const animationElements = document.querySelectorAll('.animation-g');
    animationElements.forEach((element) => {
      element.classList.remove('selected');
    });
  };

  const [selectedItem, setSelectedItem] = useState<FacilityItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFacilityClick = (item: FacilityItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  if (isLoggedIn) {
    return (
      <div className="facility-view">
        <div className="facility-view__top">
          <div className="facility-view__image">
            <img src="/facility_bn.png" alt="facilityBG" />
          </div>
          <div className="facility-view__content">
            <div className="facility-view__table-head">
              <div className="facility-view_title">
                <h2 className="gradual-color-transition">시설현황</h2>
              </div>
              <div className="facility-view__search-container">
                <div className="facility-view__search-area">
                  <TextInput dataId="" placeholder="시설명 검색" />
                  <Button
                    icon={ICONS.MAGNIFIER}
                    iconPlacement={ButtonIconPlacement.Left}
                    iconSize={IconSize.XL}
                    className="button--icon-text"
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
              onCreateButton={handleCreatePost}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              onRowClick={() => {}}
              disableRowClick={isLoggedIn}
              checkboxState={checkboxState}
              onCheckboxChange={handleCheckboxChange}
              className="facility-table"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="facility-view">
      <div className="facility-view__top">
        <div className="facility-view__image">
          <div className="facility-view__image__overlay" />
          <img src="/facility_bn.png" alt="facilityBG" />
          <div className="facility-view__image__icon">
            <img src="icon_facility.svg" alt="facilityIcon" />
            <p>깨끗한 바다 산을 위해 각 지역별 쓰레기 수거현황을 전합니다.</p>
          </div>
        </div>
        <div className="facility-view__content">
          <div className="facility-view__head">
            <div className="facility-view__title">
              <h2 className="gradual-color-transition">시설현황</h2>
            </div>
          </div>
          <div className="facility-view__body">
            <div className="facility-view__map-area">
              <button className={`button ${area === '부산' ? 'selected' : ''}`} onClick={handleDefaultButton}>
                부산 전체보기
              </button>
              <MyMap className="my-map" onClick={handleMapClick} />
            </div>
            <div className="facility-view__scroll">
              <div className="facility-view__scroll__title">
                <span>{area}</span> 수거사각지대
              </div>
              <ul className="item-list">
                {FacilityData.filter((entry) => entry.district === area).length !== 0 ? (
                  FacilityData.filter((entry) => entry.district === area).map((item, index) => (
                    <li key={item.title} className="item" onClick={() => handleFacilityClick(item)}>
                      <div className="item-title">{item.title}</div>
                      <div className="item-content">
                        <img src={item.img} alt={item.title} />
                        <ul className="item-data">
                          <li>
                            <span className="icon-span" />
                            위치 : {item.location}
                          </li>
                          <li>
                            <span className="icon-span" />
                            규모 : {item.dimension}
                          </li>
                          <li>
                            <span className="icon-span" />
                            쓰레기현황등급 : {item.status}
                          </li>
                        </ul>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>현재 사용 가능한 데이터가 없습니다.</p>
                )}
              </ul>
            </div>
            {selectedItem && <ItemModal facilityItem={selectedItem} isOpen={modalOpen} onClose={handleClose} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityView;
