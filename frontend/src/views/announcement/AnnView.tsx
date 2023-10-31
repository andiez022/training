import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';
import CustomTable from '../../components/Table/CustomTable';

import TableRowDetails from '../../components/Table/TableRowDetails';
import './AnnView.scss';

const AnnView: React.FC<{ userRole: string }> = ({ userRole }) => {
  const data = [
    {
      id: '1',
      numbering: 1,
      title:
        '공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사',
      author: '관리자 1',
      date: '2023-05-05',
      body: '글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기.',
    },
    { id: '2', numbering: 2, title: 'Short', author: '관리자 2', date: '2023-05-05', body: '' },
    { id: '3', numbering: 3, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '4', numbering: 4, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '5', numbering: 5, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '6', numbering: 6, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '7', numbering: 7, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '8', numbering: 8, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '9', numbering: 9, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '10', numbering: 10, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '11', numbering: 11, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '12', numbering: 12, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
  ];
  const indexes = data.map((item) => item.id);

  const columns = [
    { dataId: 'numbering', label: '번호' },
    { dataId: 'title', label: '제목' },
    { dataId: 'author', label: '작성자' },
    { dataId: 'date', label: '작성일' },
  ];

  type TableSearchColumn = 'title' | 'author';

  const [filteredData, setFilteredData] = useState(data);

  const updateFilteredData = () => {
    const newFilteredData = data.filter((row) => {
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

  const navigate = useNavigate();
  const handleCreateAnnouncement = () => {
    navigate('create');
  };

  const { contentType } = useParams();
  const currentItem = data.find((item) => item.id === contentType);

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
      setFilteredData(data);
    }
  };

  const initialValues = {
    title: '',
    content: '',
  };

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
  };

  if (!contentType) {
    return (
      <div className="ann-view">
        <div className="ann-view__top">
          <div className="ann-view__image">
            <div className="ann-view__image__overlay" />
            <img src="/announcement_bn.png" alt="AnnBG" />
            <div className="ann-view__image__icon">
              <img src="icon_announcement.svg" alt="AnnIcon" />
              <p>깨바부의 새로운 소식을 전합니다.</p>
            </div>
          </div>
          <div className="ann-view__content">
            <div className="ann-view__table-head">
              <div className="ann-view__title">
                <h2 className="gradual-color-transition">공지사항</h2>
              </div>
              <div className="ann-view__drop-down">
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
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleEnterKeyPress}
                  />
                  <Button
                    icon={ICONS.MAGNIFIER}
                    iconPlacement={ButtonIconPlacement.Left}
                    iconSize={IconSize.XL}
                    className="button--icon-text"
                    onClick={updateFilteredData}
                  >
                    검색
                  </Button>
                </div>
              </div>
            </div>
            <CustomTable
              data={filteredData}
              itemsPerPage={10}
              columns={columns}
              userRole={userRole}
              onCreateButton={handleCreateAnnouncement}
            />
          </div>
        </div>
      </div>
    );
  }

  if (currentItem) {
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
              id={currentItem.id}
              title={currentItem.title}
              numbering={currentItem.numbering}
              author={currentItem.author}
              description={currentItem.body}
              date={currentItem.date}
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
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className="form-create">
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
                  <div className="form-button">
                    <button type="submit" className="submit-button">
                      등록
                    </button>
                    <button className="cancel-button" onClick={() => window.history.back()}>
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
    <div className="ann-view">
      <div className="ann-view__top">
        <h2>NOT FOUND</h2>
      </div>
    </div>
  );
};

export default AnnView;
