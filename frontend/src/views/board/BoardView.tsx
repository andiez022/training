import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';
import CustomTable from '../../components/Table/CustomTable';
import TableRowDetails from '../../components/Table/TableRowDetails';

import { BoardData } from '../../services/constants/constants';

import './BoardView.scss';

const BoardView: React.FC<{ userRole: string }> = ({ userRole }) => {
  const isManagerial = userRole === 'admin';
  const indexes = BoardData.map((item) => item.id);

  const columns = [
    { dataId: 'selected', label: '' },
    { dataId: 'numbering', label: '번호' },
    { dataId: 'title', label: '제목' },
    { dataId: 'author', label: '작성자' },
    { dataId: 'date', label: '작성일' },
  ];

  type TableSearchColumn = 'title' | 'author';

  const [filteredData, setFilteredData] = useState(BoardData);

  const updateFilteredData = () => {
    const newFilteredData = BoardData.filter((row) => {
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

  const handleDelete = () => {};

  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate('create');
  };

  const { contentType } = useParams();
  const currentItem = BoardData.find((item) => item.id === contentType);

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
    }
  };

  const initialValues = {
    authorName: '',
    password: '',
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
    const updatedData = BoardData.map((item) => ({ ...item, selected: false }));
    setFilteredData(updatedData);
    window.history.back();
  };

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  if (!contentType) {
    return (
      <div className="board-view">
        <div className="board-view__top">
          <div className="board-view__image">
            <img src="/board_bn.png" alt="boardBG" />
            {!isManagerial && (
              <>
                <div className="board-view__image__overlay" />
                <div className="board-view__image__icon">
                  <img src="icon_board.svg" alt="BoardIcon" />
                  <p>깨바부의 새로운 소식을 전합니다.</p>
                </div>
              </>
            )}
          </div>
          <div className="board-view__content">
            <div className="board-view__table-head">
              <div className="board-view__title">
                <h2 className="gradual-color-transition">자유게시판</h2>
              </div>
              <div className="board-view__search-container">
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
                <div className="board-view__search-area">
                  <TextInput
                    dataId="author"
                    placeholder="자유게시판 검색"
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
              showAdminActions={isManagerial}
              onCreateButton={handleCreatePost}
              setData={setFilteredData}
              handleDelete={handleDelete}
              handleEdit={() => {}}
            />
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
              <div className="board-view__title">
                <h2 className="gradual-color-transition">자유게시판</h2>
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
      <div className="board-view">
        <div className="board-view__top">
          <div className="board-view__content">
            <div className="board-view__table-head">
              <div className="board-view__title">
                <h2 className="gradual-color-transition">자유게시판 작성</h2>
              </div>
            </div>
            <div className="form-container">
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className="form-create">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="authorName">작성자 이름</label>
                      <Field type="text" id="authorName" name="authorName" placeholder="이름을 입력하세요." />
                      <label htmlFor="password">비밀번호</label>
                      <Field type="password" id="password" name="password" placeholder="비밀번호를 입력하세요." />
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
                    <button type="button" className="cancel-button" onClick={handleCancel}>
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
    <div className="board-view">
      <div className="board-view__top">
        <h2>NOT FOUND</h2>
      </div>
    </div>
  );
};

export default BoardView;
