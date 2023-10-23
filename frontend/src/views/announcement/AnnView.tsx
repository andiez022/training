import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';
import CustomTable from '../../components/Table/CustomTable';

import './AnnView.scss';
import TableRowDetails from '../../components/Table/TableRowDetails';

const AnnView: React.FC<{ userRole: string }> = ({ userRole }) => {
  const navigate = useNavigate();

  const handleCreateAnnouncement = () => {
    navigate('/announcement/create');
  };

  const [selectedItemText, setSelectedItemText] = useState('');

  const handleDropdownItemClick = (itemText: string) => {
    setSelectedItemText(itemText);
  };

  const columns = [
    { dataId: 'id', label: '번호' },
    { dataId: 'title', label: '제목' },
    { dataId: 'author', label: '작성자' },
    { dataId: 'date', label: '작성일' },
  ];

  const data = [
    {
      id: '1',
      title:
        '공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사',
      author: '관리자 1',
      date: '2023-05-05',
      body: '글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기글쓰기.',
    },
    { id: '2', title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '3', title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '4', title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '5', title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '6', title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '7', title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '8', title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '9', title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '10', title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '11', title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
    { id: '12', title: 'Short', author: '관리자 1', date: '2023-05-05', body: '' },
  ];

  const { contentType } = useParams();
  const currentItem = data.find((item) => item.id === contentType);

  if (!contentType) {
    return (
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
            <h2 className="gradual-color-transition">공지사항</h2>
            <div className="ann-view__drop-down">
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
              <div className="ann-view__search-area">
                <TextInput dataId="" placeholder="공지사항 검색" />
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
          <CustomTable data={data} itemsPerPage={10} columns={columns} userRole={userRole} onCreateButton={handleCreateAnnouncement} />
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
              <h2 className="gradual-color-transition">공지사항</h2>
            </div>
            <TableRowDetails
              id={currentItem.id}
              title={currentItem.title}
              author={currentItem.author}
              description={currentItem.body}
              date={currentItem.date}
            />
          </div>
        </div>
      </div>
    );
  }

  if (contentType === 'create') {
    return (
      <div className="ann-view__top">
        <h1>Create New Item</h1>
        <h1>Create New Item</h1>
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
