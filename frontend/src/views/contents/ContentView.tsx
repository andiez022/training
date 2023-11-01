import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import VideoCollection, { exampleVideoData } from '../../components/VideoCollection/VideoCollection';
import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';
import CustomTable from '../../components/Table/CustomTable';

import './ContentView.scss';

const ContentView: React.FC<{ userRole: string }> = ({ userRole }) => {
  const columns = [
    { dataId: 'selected', label: '' },
    { dataId: 'numbering', label: '번호' },
    { dataId: 'title', label: '제목' },
    { dataId: 'author', label: '작성자' },
    { dataId: 'date', label: '작성일' },
  ];

  const [filteredData, setFilteredData] = useState(exampleVideoData);

  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate('create');
  };

  const { contentType } = useParams();

  const [selectedDropdownText, setSelectedDropdownText] = useState('제목');

  const handleDropdownItemClick = (itemText: string) => {
    setSelectedDropdownText(itemText);
  };

  const initialValues = {
    title: '',
    content: '',
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
    const updatedData = exampleVideoData.map((item) => ({ ...item, selected: false }));
    setFilteredData(updatedData);
    window.history.back();
  };

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
  };

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
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className="form-create">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="link">링크</label>
                      <Field type="text" id="link" name="link" placeholder="링크를 입력해주세요." />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="title">제목</label>
                      <Field type="text" id="title" name="title" placeholder="제목을 입력해주세요." />
                    </div>
                  </div>
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
                  <div className="form-button">
                    <button type="submit" className="submit-button">
                      등록
                    </button>
                    <button className="cancel-button" onClick={handleCancel}>
                      취소
                    </button>
                  </div>
                </Form>
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
        <div className="content-view__image">
          <div className="content-view__image__overlay" />
          <img src="/content_bn.png" alt="contentBG" />
          <div className="content-view__image__icon">
            <img src="/icon_content.svg" alt="contentIcon" />
            <p>깨바부의 다양한 콘텐츠를 확인해보세요.</p>
          </div>
        </div>
        <div className="content-view__content">
          <div className="content-view__table-head">
            <div className="content-view__title">
              <h2 className="gradual-color-transition">콘텐츠</h2>
            </div>
            {userRole === 'admin' && (
              <div className="content-view__drop-down">
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
                  <TextInput dataId="author" placeholder="공지사항 검색" />
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
          {userRole === 'user' && <VideoCollection />}
          {userRole === 'admin' && (
            <CustomTable
              data={exampleVideoData}
              itemsPerPage={10}
              showAdminActions={userRole === 'admin'}
              columns={columns}
              onCreateButton={handleCreatePost}
              setData={setFilteredData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentView;
