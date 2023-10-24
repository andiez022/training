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
import './BoardView.scss';

const BoardView: React.FC<{ userRole: string }> = ({ userRole }) => {
  const { contentType } = useParams();

  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/board/create');
  };

  const [selectedItemText, setSelectedItemText] = useState('');

  const handleDropdownItemClick = (itemText: string) => {
    setSelectedItemText(itemText);
  };

  const columns = [
    { dataId: 'numbering', label: '번호' },
    { dataId: 'title', label: '제목' },
    { dataId: 'author', label: '작성자' },
    { dataId: 'date', label: '작성일' },
  ];

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
    { id: '2', numbering: 2, title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
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

  const currentItem = data.find((item) => item.id === contentType);

  const indexes = data.map((item) => item.id);

  const initialValues = {
    authorName: '',
    password: '',
    title: '',
    content: '',
  };

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
  };

  if (!contentType) {
    return (
      <div className="board-view__top">
        <div className="board-view__image">
          <div className="board-view__image__overlay" />
          <img src="/board_bn.png" alt="boardBG" />
          <div className="board-view__image__icon">
            <img src="icon_board.svg" alt="boardIcon" />
            <p>깨끗한 바다 부산을 위한 시민들의 다양한 의견과 정보를 공유합니다.</p>
          </div>
        </div>
        <div className="board-view__content">
          <div className="lab-view__table-head">
            <h2 className="gradual-color-transition">자유게시판</h2>
            <div className="lab-view__drop-down">
              <Dropdown
                elementAction={
                  <Button
                    icon={ICONS.ARROW_DOWN}
                    iconPlacement={ButtonIconPlacement.Right}
                    iconSize={IconSize.LG}
                    className="button--text-icon"
                  >
                    {selectedItemText || '제목'}
                  </Button>
                }
              >
                <DropdownItem onClick={() => handleDropdownItemClick('제목')}>제목</DropdownItem>
                <DropdownItem onClick={() => handleDropdownItemClick('작성자')}>작성자</DropdownItem>
              </Dropdown>
              <div className="lab-view__search-area">
                <TextInput dataId="" placeholder="공지사항 검색" />
                <Button
                  icon={ICONS.MAGNIFIER}
                  iconPlacement={ButtonIconPlacement.Left}
                  iconSize={IconSize.XL}
                  onClick={() => {
                    console.log('Clicked!');
                  }}
                  className="button--icon-text"
                >
                  제목
                </Button>
              </div>
            </div>
          </div>
          <div className="lab-view__table-body">
            <CustomTable columns={columns} data={data} itemsPerPage={10} userRole={userRole} onCreateButton={handleCreatePost} />
          </div>
        </div>
      </div>
    );
  }

  if (currentItem) {
    return (
      <div className="board-view">
        <div className="board-view__top">
          <div className="board-view__content">
            <div className="board-view__table-head">
              <h2 className="gradual-color-transition">공지사항</h2>
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
      <div className="board-view__top">
        <div className="board-view__create-form">
          <h2 className="gradual-color-transition">자유게시판 작성</h2>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="authorName">작성자 이름</label>
                  <Field type="text" id="authorName" name="authorName" placeholder="이름을 입력하세요." />
                </div>
                <div className="form-group">
                  <label htmlFor="password">비밀번호</label>
                  <Field type="password" id="password" name="password" placeholder="비밀번호를 입력하세요." />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">제목</label>
                  <Field type="text" id="title" name="title" placeholder="제목을 입력해주세요." className="input-title" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <Field as="textarea" id="content" name="content" placeholder="내용을 입력하세요." />
                </div>
              </div>
              <div className="form-button">
                <button type="reset">등록</button>
                <button type="submit">취소</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    );
  }

  return (
    <div className="board-view">
      <div className="board-view__top">
        <h2>NOT FOUND</h2>
      </div>
    </div>
  );
};

export default BoardView;
