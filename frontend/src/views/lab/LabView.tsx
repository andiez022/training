import React, { useState } from 'react';
import Header from '../header/Header';

import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import TextInput from '../../components/TextInput/TextInput';

import CustomTable from '../../components/Table/CustomTable';

import './LabView.scss';

const LabView: React.FC<{ userRole: string }> = ({ userRole }) => {
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
    { id: 2, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 2, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 2, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 2, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 2, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 2, title: 'Short', author: '관리자 1', date: '2023-05-05' },
    { id: 2, title: 'Short', author: '관리자 1', date: '2023-05-05' },
  ];

  return (
    <div className="lab-view">
      <div className="lab-view__top">
        <div className="lab-view__image">
          <div className="lab-view__image__overlay" />
          <img src="/lab_bn.png" alt="labBG" />
          <div className="lab-view__image__icon">
            <img src="icon_lab.svg" alt="labIcon" />
            <p>깨끗한 바다 부산을 위해 시민들이 직접 참여 중인 프로젝트를 소개합니다.</p>
          </div>
        </div>
        <div className="lab-view__content">
          <div className="lab-view__table-head">
            <h2 className="gradual-color-transition">리빙랩</h2>
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
                  className="button--icon-text"
                >
                  제목
                </Button>
              </div>
            </div>
          </div>
          <div className="lab-view__table-body">
            <CustomTable columns={columns} data={data} itemsPerPage={10} userRole={userRole} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabView;
