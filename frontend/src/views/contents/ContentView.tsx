import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import VideoCollection from '../../components/VideoCollection/VideoCollection';
import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';
import CustomTable from '../../components/Table/CustomTable';

import { VideoCollectionData } from '../../services/constants/constants';

import './ContentView.scss';

const ContentView: React.FC<{ userRole: string }> = ({ userRole }) => {
  const isManagerial = userRole === 'admin';

  const columns = [
    { dataId: 'selected', label: '' },
    { dataId: 'numbering', label: '번호' },
    { dataId: 'title', label: '제목' },
    { dataId: 'author', label: '작성자' },
    { dataId: 'date', label: '작성일' },
  ];

  type TableSearchColumn = 'title' | 'author';

  const [filteredData, setFilteredData] = useState(VideoCollectionData);
  const [editMode, setEditMode] = useState(false);

  const updateFilteredData = () => {
    const newFilteredData = VideoCollectionData.filter((row) => {
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

  const handleDelete = () => {
    const dataToKeep = VideoCollectionData.filter((item) => !item.selected);
    setFilteredData(dataToKeep);
  };

  const handleEdit = (itemId: string) => {
    navigate(`edit/${itemId}`);
    setEditMode(true);
  };

  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate('create');
  };

  const { contentType } = useParams();
  const currentItem = VideoCollectionData.find((item) => item.id === contentType);

  const [selectedDropdownText, setSelectedDropdownText] = useState('제목');
  const [searchText, setSearchText] = useState('');
  const [selectedSearchColumn, setSelectedSearchColumn] = useState<TableSearchColumn>('title');

  const handleDropdownItemClick = (itemText: string) => {
    if (itemText !== selectedDropdownText) {
      setSelectedDropdownText(itemText);
      if (itemText === '제목') {
        setSelectedSearchColumn('title');
      } else {
        setSelectedSearchColumn('author');
      }
      setSearchText('');
      setFilteredData(VideoCollectionData);
    }
  };

  const initialValues = {
    link: '',
    title: '',
    content: '',
  };

  const initialEditValues = {
    title: currentItem ? currentItem.title : '',
    link: currentItem ? currentItem.video_id : '',
    content: currentItem ? currentItem.description : '',
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
    const updatedData = VideoCollectionData.map((item) => ({ ...item, selected: false }));
    setFilteredData(updatedData);
    window.history.back();
  };

  const validationSchema = Yup.object().shape({
    link: Yup.string().required('링크를 입력하세요.'),
    title: Yup.string().required('제목을 입력하세요.'),
    content: Yup.string().required('제내용을 입력하세요.'),
  });

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
  };

  useEffect(() => {
    if (!contentType) {
      setEditMode(false);
      const updatedData = VideoCollectionData.map((item) => ({ ...item, selected: false }));
      setFilteredData(updatedData);
    }
  }, [contentType]);

  if (!contentType) {
    return (
      <div className="content-view">
        <div className="content-view__top">
          <div className="content-view__image">
            <img src="/content_bn.png" alt="contentBG" />
            {!isManagerial && (
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
              {userRole === 'admin' && (
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
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={handleEnterKeyPress}
                    />
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
              )}
            </div>
            {userRole === 'user' && <VideoCollection data={filteredData} />}
            {userRole === 'admin' && (
              <CustomTable
                data={filteredData}
                itemsPerPage={10}
                showAdminActions={isManagerial}
                columns={columns}
                onCreateButton={handleCreatePost}
                setData={setFilteredData}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                disableRowClick
              />
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
                        <label htmlFor="link">링크</label>
                        <Field type="text" id="link" name="link" placeholder="링크를 입력해주세요." />
                      </div>
                    </div>
                    <ErrorMessage name="link" component="div" className="error" />
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
                      <button className="cancel-button" onClick={handleCancel}>
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
              <Formik initialValues={initialEditValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                  <Form className="form-create">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="link">링크</label>
                        <Field type="text" id="link" name="link" placeholder="링크를 입력해주세요." />
                      </div>
                    </div>
                    <ErrorMessage name="link" component="div" className="error" />
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
    <div className="content-view">
      <div className="content-view__top">
        <h2>NOT FOUND</h2>
      </div>
    </div>
  );
};

export default ContentView;
