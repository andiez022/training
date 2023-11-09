import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
  const [dataItem, setDataItem] = useState<DataItem | null>(null);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const [editMode, setEditMode] = useState(false);
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
      const responseData = await api.data.fetchDataById('content', itemId);
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

  const initialValues = {
    video: '',
    title: '',
    description: '',
  };

  const initialEditValues = {
    id: dataItem?.id,
    title: dataItem?.title,
    video: dataItem?.video,
    description: dataItem?.description,
  };

  const handleCancel = () => {
    window.history.back();
  };

  const validationSchema = Yup.object().shape({
    video: Yup.string().required('링크를 입력하세요.'),
    title: Yup.string().required('제목을 입력하세요.'),
    description: Yup.string().required('제내용을 입력하세요.'),
  });

  const handleSubmit = async (values: any) => {
    try {
      await api.data.postData('content', values);

      window.location.pathname = 'content';
    } catch (error) {
      console.error('Error posting data: ', error);
    }
  };

  const handleModify = async (values: any) => {
    try {
      await api.data.editData('content', values);

      window.location.pathname = 'content';
    } catch (error) {
      console.error('Error posting data: ', error);
    }
  };

  const { contentType } = useParams();

  if (!contentType) {
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
  }

  if (contentType === 'create') {
    return (
      <div className="content-view">
        <div className="content-view__top">
          <div className="content-view__content">
            <div className="content-view__table-head">
              <div className="content-view__title">
                <h2 className="gradual-color-transition">콘텐츠 작성</h2>
              </div>
            </div>
            <div className="form-container">
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                  <Form className="form-create">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="title">제목</label>
                        <Field type="text" id="title" name="title" placeholder="제목을 입력하세요. (공백포함 50자이내)" />
                      </div>
                    </div>
                    <ErrorMessage name="title" component="div" className="error" />
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="video">링크</label>
                        <Field type="text" id="video" name="video" placeholder="링크를 입력해주세요." />
                      </div>
                    </div>
                    <ErrorMessage name="video" component="div" className="error" />
                    <div className="form-row">
                      <div className="form-group">
                        <Field
                          as="textarea"
                          id="description"
                          name="description"
                          className="content-area"
                          placeholder="내용을 입력하세요."
                        />
                      </div>
                    </div>
                    <ErrorMessage name="description" component="div" className="error" />
                    <div className="form-button">
                      <button type="submit" className="submit-button" disabled={isSubmitting}>
                        등록
                      </button>
                      <button type="button" className="cancel-button" onClick={handleCancel}>
                        취소
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (editMode) {
    return (
      <div className="content-view">
        <div className="content-view__top">
          <div className="content-view__content">
            <div className="content-view__table-head">
              <div className="content-view__title">
                <h2 className="gradual-color-transition">공지사항 작성</h2>
              </div>
            </div>
            <div className="form-container">
              <Formik initialValues={initialEditValues} validationSchema={validationSchema} onSubmit={handleModify}>
                {({ isSubmitting }) => (
                  <Form className="form-create">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="title">제목</label>
                        <Field type="text" id="title" name="title" placeholder="제목을 입력해주세요." />
                      </div>
                    </div>
                    <ErrorMessage name="title" component="div" className="error" />
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="video">링크</label>
                        <Field type="text" id="video" name="video" placeholder="링크를 입력해주세요." />
                      </div>
                    </div>
                    <ErrorMessage name="video" component="div" className="error" />
                    <div className="form-row">
                      <div className="form-group">
                        <Field as="textarea" id="description" name="description" className="content-area" />
                      </div>
                    </div>
                    <ErrorMessage name="description" component="div" className="error" />
                    <div className="form-button">
                      <button type="submit" className="submit-button" disabled={isSubmitting}>
                        등록
                      </button>
                      <button type="button" className="cancel-button" onClick={handleCancel}>
                        취소
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-view">
      <div className="content-view__top">
        <h2>NOT FOUND</h2>
      </div>
    </div>
  );
};

export default ContentView;
