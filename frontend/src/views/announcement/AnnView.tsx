import React, { useState } from 'react';
import Header from '../header/Header';

import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';

import CustomTable from '../../components/Table/CustomTable';

import './AnnView.scss';

const AnnView: React.FC = () => {
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
      id: 1,
      title:
        '공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사항 입니다. 공지사',
      author: '관리자 1',
      date: '2023-05-05',
    },
    { id: 2, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 3, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 4, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 5, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 6, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 7, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 8, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 9, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 10, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 11, title: 'Short', author: '관리자 1', date: '2023-05-05' },
  ];

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
            <h2 className="gradual-color-transition">공지사항</h2>
            <div className="ann-view__drop-down">
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
              <div className="ann-view__search-area">
                <TextInput dataId="" placeholder="공지사항 검색" />
                <Button icon={ICONS.MAGNIFIER} iconPlacement={ButtonIconPlacement.Left} iconSize={IconSize.XL} className="button--search">
                  검색
                </Button>
              </div>
            </div>
          </div>
          <div className="ann-view__table-body">
            <CustomTable data={data} itemsPerPage={10} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnView;
