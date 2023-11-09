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

import { DataItem, columns, CheckboxState } from '../../services/types/common';
import api from '../../services/apiServices';
import './BoardView.scss';

const BoardView: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
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
      await api.data.deleteData('free-board', itemsToDelete);
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
      const responseData = await api.data.fetchDataById('free-board', itemId);
      setDataItem(responseData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleDisplayItem = (itemId: string) => {
    handleFetchItem(itemId);
    navigate(`/board/${itemId}`);
  };

  const handlePageChange = (page: number) => {
    setPage(page - 1);
  };

  useEffect(() => {
    const dataService = api.data;
    dataService
      .fetchDataList('free-board', {
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
    title: '',
    content: '',
  };

  const initialEditValues = {
    title: dataItem?.title,
    content: dataItem?.content,
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

  const handleSubmit = async (values: any) => {
    try {
      await api.data.postData('free-board/admin', values);

      window.location.pathname = 'board';
    } catch (error) {
      console.error('Error posting data: ', error);
    }
  };

  const handleModify = async (values: any) => {
    try {
      await api.data.editAdminData('free-board/admin', dataItem?.id ?? '', values);

      window.location.pathname = 'board';
    } catch (error) {
      console.error('Error posting data: ', error);
    }
  };

  const { contentType } = useParams();

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const inputElement = event.target as HTMLInputElement;
      setSearchValue(inputElement.value);
    }
  };

  if (!contentType) {
    return (
      <div className="board-view">
        <div className="board-view__top">
          <div className="board-view__image">
            <img src="/board_bn.png" alt="boardBG" />
            {!isLoggedIn && (
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
              disableRowClick={isLoggedIn}
              checkboxState={checkboxState}
              onCheckboxChange={handleCheckboxChange}
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
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                  <Form className="form-create">
                    {!isLoggedIn && (
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="authorName">작성자 이름</label>
                          <Field type="text" id="authorName" name="authorName" placeholder="이름을 입력하세요." />
                          <label htmlFor="password">비밀번호</label>
                          <Field type="password" id="password" name="password" placeholder="비밀번호를 입력하세요." />
                        </div>
                      </div>
                    )}
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

  if (!editMode && contentType) {
    return (
      <div className="board-view">
        <div className="board-view__top">
          <div className="board-view__content">
            <div className="board-view__table-head">
              <div className="board-view__title">
                <h2 className="gradual-color-transition">자유게시판</h2>
              </div>
            </div>
            {dataItem && (
              <TableRowDetails
                author={dataItem.author}
                content={dataItem.content}
                createdAt={dataItem.created_at}
                id={dataItem.id}
                title={dataItem.title}
                updatedAt={dataItem.updated_at}
                userId={dataItem.user_id}
                onNextItem={() => handleDisplayItem(dataItem.next ?? '')}
                onPrevItem={() => handleDisplayItem(dataItem.previous ?? '')}
                hasNext={!!dataItem.next}
                hasPrev={!!dataItem.previous}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (editMode) {
    return (
      <div className="board-view">
        <div className="board-view__top">
          <div className="board-view__content">
            <div className="board-view__table-head">
              <div className="board-view__title">
                <h2 className="gradual-color-transition">공지사항 수정</h2>
              </div>
            </div>
            <div className="form-container">
              <Formik initialValues={initialEditValues} validationSchema={validationSchema} onSubmit={handleModify}>
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
    <div className="board-view">
      <div className="board-view__top">
        <h2>NOT FOUND</h2>
      </div>
    </div>
  );
};

export default BoardView;
