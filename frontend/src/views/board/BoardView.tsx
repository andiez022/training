import React, { useState } from 'react';
import GuestHeader from '../header/GuestHeader';

import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';

import Table, { ColumnState } from '../../components/Table/Table';

import './BoardView.scss';

const BoardView: React.FC = () => {
  const [selectedItemText, setSelectedItemText] = useState('');

  const handleDropdownItemClick = (itemText: string) => {
    setSelectedItemText(itemText);
  };

  const columns: ColumnState[] = [
    {
      label: '번호',
      dataId: 'id',
    },
    {
      label: '제목',
      dataId: 'title',
    },
    {
      label: '작성자',
      dataId: 'author',
    },
    {
      label: '작성일',
      dataId: 'date',
    },
  ];

  const data = [
    {
      id: 1,
      title:
        '공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사',
      author: '관리자 1',
      date: '2023-05-05',
    },
    { id: 2, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 2, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 2, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 2, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 2, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 2, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 2, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 2, title: 'Short', author: '관리자 1', date: '2023-05-05' },
  ];

  const cellRenderer = ({ data, dataId }: { data: any; dataId: string }) => {
    return data[dataId];
  };

  return (
    <div className="board-view">
      <GuestHeader />
      <div className="board-view__top">
        <div className="board-view__image">
          <div className="board-view__image__overlay" />
          <img src="/자유게시판_bn.png" alt="boardBG" />
          <div className="board-view__image__icon">
            <img src="icon-자유게시판.svg" alt="boardIcon" />
            <p>깨끗한 바다 부산을 위한 시민들의 다양한 의견과 정보를 공유합니다.</p>
          </div>
        </div>
        <div className="board-view__content">
          <div className="lab-view__table-head">
            <p>공지사항</p>
            <div className="lab-view__drop-down">
              <Dropdown
                elementAction={
                  <Button
                    icon={ICONS.ARROW_DOWN}
                    iconPlacement={ButtonIconPlacement.Right}
                    iconSize={IconSize.LG}
                    onClick={() => {
                      console.log('Clicked!');
                    }}
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
                  className="button--search"
                >
                  제목
                </Button>
              </div>
            </div>
          </div>
          <div className="lab-view__table-body">
            <Table columns={columns} data={data} cellRenderer={cellRenderer} titleElement="" className="table-generic" />
          </div>
          <div className="board-view__table__nav">
            <p>Nav here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
