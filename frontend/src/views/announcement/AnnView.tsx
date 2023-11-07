import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';
import CustomTable from '../../components/Table/CustomTable';
import TableRowDetails from '../../components/Table/TableRowDetails';

import api from '../../services/apiServices';

import './AnnView.scss';

interface DataItem {
  author: string;
  content: string;
  created_at: string;
  id: string;
  title: string;
  updated_at: string;
  user_id: string;
}

const AnnView: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const [searchBy, setSearchBy] = useState('title');
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [dataItem, setDataItem] = useState(null);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const columns = [
    { dataId: 'selected', label: '' },
    { dataId: 'index', label: '번호' },
    { dataId: 'title', label: '제목' },
    { dataId: 'author', label: '작성자' },
    { dataId: 'created_at', label: '작성일' },
  ];

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

  const handleDelete = () => {};

  const handleEdit = (itemId: string) => {
    navigate(`edit/${itemId}`);
    setEditMode(true);
  };

  const navigate = useNavigate();
  const handleCreateAnnouncement = () => {
    navigate('create');
  };

  const handlePageChange = (page: number) => {
    setPage(page - 1);
  };

  const [hasIndexedData, setHasIndexedData] = useState(false);
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
          index: index + 1,
        }));

        setData(newData);

        setTotalPageCount(Math.ceil(responseData.total / pageSize));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, [searchBy, searchValue, page, pageSize]);

  const initialValues = {
    authorName: '',
    password: '',
    title: '',
    content: '',
  };

  const initialEditValues = {
    title: dataItem ? (dataItem as DataItem).id : '',
    content: dataItem ? (dataItem as DataItem).content : '',
  };

  const toolBarOptions = [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
    [{ list: 'bullet' }, { list: 'ordered' }, 'blockquote'],
    ['link', 'image'],
  ];

  const modules = {
    toolbar: toolBarOptions,
  };

  const handleCancel = () => {
    window.history.back();
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('제목을 입력하세요.'),
    content: Yup.string().required('제내용을 입력하세요.'),
  });

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  const { contentType } = useParams();

  const indexes = data.map((item) => (item as DataItem).id);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const inputElement = event.target as HTMLInputElement;
      setSearchValue(inputElement.value);
    }
  };

  if (!contentType) {
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
              data={data}
              currentPage={page + 1}
              itemsPerPage={10}
              totalPageCount={totalPageCount}
              onPageChange={handlePageChange}
              columns={columns}
              showAdminActions={isLoggedIn}
              onCreateButton={handleCreateAnnouncement}
              setData={() => {}}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              disableRowClick={isLoggedIn}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!editMode && dataItem) {
    return (
      <div className="ann-view">
        <div className="ann-view__top">
          <div className="ann-view__content">
            <div className="ann-view__table-head">
              <div className="ann-view__title">
                <h2 className="gradual-color-transition">공지사항</h2>
              </div>
            </div>
            <TableRowDetails
              id={(dataItem as DataItem).id}
              title={(dataItem as DataItem).title}
              numbering={1}
              author={(dataItem as DataItem).author}
              description={(dataItem as DataItem).content}
              date={(dataItem as DataItem).created_at}
              indexes={indexes}
            />
          </div>
        </div>
      </div>
    );
  }

  if (contentType === 'create') {
    return (
      <div className="ann-view">
        <div className="ann-view__top">
          <div className="ann-view__content">
            <div className="ann-view__table-head">
              <div className="ann-view__title">
                <h2 className="gradual-color-transition">공지사항 작성</h2>
              </div>
            </div>
            <div className="form-container">
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
                        <Field id="content" name="content">
                          {({ field }: { field: { value: string; onChange: (e: any) => void } }) => (
                            <ReactQuill
                              value={field.value}
                              onChange={(value) => field.onChange({ target: { name: 'content', value } })}
                              placeholder="내용을 입력하세요."
                              className="content-area"
                              modules={modules}
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                    <ErrorMessage name="content" component="div" className="error" />
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
      <div className="ann-view">
        <div className="ann-view__top">
          <div className="ann-view__content">
            <div className="ann-view__table-head">
              <div className="ann-view__title">
                <h2 className="gradual-color-transition">공지사항 작성</h2>
              </div>
            </div>
            <div className="form-container">
              <Formik initialValues={initialEditValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                  <Form className="form-create">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="title">제목</label>
                        <Field type="text" id="title" name="title" />
                      </div>
                    </div>
                    <ErrorMessage name="title" component="div" className="error" />
                    <div className="form-row">
                      <div className="form-group">
                        <Field id="content" name="content">
                          {({ field }: { field: { value: string; onChange: (e: any) => void } }) => (
                            <ReactQuill
                              value={field.value}
                              onChange={(value) => field.onChange({ target: { name: 'content', value } })}
                              className="content-area"
                              modules={modules}
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                    <ErrorMessage name="content" component="div" className="error" />
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
    <div className="ann-view">
      <div className="ann-view__top">
        <h2>NOT FOUND</h2>
      </div>
    </div>
  );
};

export default AnnView;
