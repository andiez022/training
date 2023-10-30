import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

import VideoCollection, { exampleVideoData } from '../../components/VideoCollection/VideoCollection';
import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';
import CustomTable from '../../components/Table/CustomTable';

import './ContentView.scss';

const ContentView: React.FC<{ userRole: string }> = ({ userRole }) => {
  const navigate = useNavigate();
  const { contentType } = useParams();

  const handleCreatePost = () => {
    navigate('create');
  };

  const initialValues = {
    title: '',
    content: '',
  };

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
  };

  const [selectedItemText, setSelectedItemText] = useState('제목');
  const handleDropdownItemClick = (itemText: string) => {
    setSelectedItemText(itemText);
  };

  const columns = [
    { dataId: 'numbering', label: '번호' },
    { dataId: 'title', label: '제목' },
    { dataId: 'author', label: '작성자' },
    { dataId: 'date', label: '작성일' },
  ];

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
                      <Field as="textarea" id="content" name="content" placeholder="내용을 입력하세요." className="content-area" />
                    </div>
                  </div>
                </Form>
              </Formik>
              <div className="form-button">
                <button type="submit" className="submit-button">
                  등록
                </button>
                <button className="cancel-button" onClick={() => window.history.back()}>
                  취소
                </button>
              </div>
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
                      {selectedItemText || '제목'}
                    </Button>
                  }
                >
                  <DropdownItem onClick={() => handleDropdownItemClick('제목')} isSelected={selectedItemText === '제목'}>
                    제목
                  </DropdownItem>
                  <DropdownItem onClick={() => handleDropdownItemClick('작성자')} isSelected={selectedItemText === '작성자'}>
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
              userRole={userRole}
              columns={columns}
              onCreateButton={handleCreatePost}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentView;
