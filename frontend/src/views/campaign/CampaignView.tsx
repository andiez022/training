import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import TextInput from '../../components/TextInput/TextInput';

import GalleryImageDetails, { GalleryImageProps } from '../../components/ImageGallery/GalleryImageDetails';
import ImageGallery from '../../components/ImageGallery/ImageGallery';

import './CampaignView.scss';
import CustomTable from '../../components/Table/CustomTable';

const CampaignView: React.FC<{ userRole: string }> = ({ userRole }) => {
  const data: GalleryImageProps[] = [
    {
      id: 'weqweasd',
      numbering: 1,
      image: '/ctest.jpg',
      title: "The error message \"The term 'choco' is not recognized",
      author: 'admin',
      date: '2023-05-05',
      link: 'https://www.youtube.com/watch?v=LqME1y6Mlyg',
      description:
        '깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.',
    },
    {
      id: '2',
      numbering: 2,
      image: '/logo192.png',
      title: 'www',
      author: 'admin',
      date: '2023-05-05',
      link: '',
      description: 'Item 2',
    },
    {
      id: '3',
      numbering: 3,
      image: '/logo192.png',
      title: 'www',
      author: 'admin',
      date: '2023-05-05',
      link: '',
      description: 'Item 3',
    },
    {
      id: '4',
      numbering: 4,
      image: '/logo192.png',
      title: 'www',
      author: 'admin',
      date: '2023-05-05',
      link: '',
      description: 'Item 4',
    },
    {
      id: '5',
      numbering: 5,
      image: '/logo192.png',
      title: 'www',
      author: 'admin',
      date: '2023-05-05',
      link: '',
      description: 'Item 5',
    },
    {
      id: '6',
      numbering: 6,
      image: '/logo192.png',
      title: 'www',
      author: 'admin',
      date: '2023-05-05',
      link: '',
      description: 'Item 6',
    },
    {
      id: '7',
      numbering: 7,
      image: '/logo192.png',
      title: 'www',
      author: 'admin',
      date: '2023-05-05',
      link: '',
      description: 'Item 7',
    },
    {
      id: '8',
      numbering: 8,
      image: '/logo192.png',
      title: 'www',
      author: 'admin',
      date: '2023-05-05',
      link: '',
      description: 'Item 8',
    },
    {
      id: '9',
      numbering: 9,
      image: '/logo192.png',
      title: 'www',
      author: 'admin',
      date: '2023-05-05',
      link: '',
      description: 'Item 9',
    },
    {
      id: '10',
      numbering: 10,
      image: '/logo192.png',
      title: 'www',
      author: 'admin',
      date: '2023-05-05',
      link: '',
      description: 'Item 10',
    },
    {
      id: '11',
      numbering: 11,
      image: '/logo192.png',
      title: 'www',
      author: 'admin',
      date: '2023-05-05',
      link: '',
      description: 'Item 11',
    },
    {
      id: '12',
      numbering: 12,
      image: '/logo192.png',
      title: 'www',
      author: 'admin',
      date: '2023-05-05',
      link: '',
      description: 'Item 12',
    },
    {
      id: '13',
      numbering: 13,
      image: '/logo192.png',
      title: 'www',
      author: 'admin',
      date: '2023-05-05',
      link: '',
      description: 'Item 13',
    },
  ];

  const columns = [
    { dataId: 'numbering', label: '번호' },
    { dataId: 'title', label: '제목' },
    { dataId: 'author', label: '작성자' },
    { dataId: 'date', label: '작성일' },
  ];

  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate('create');
  };

  const { contentType } = useParams();
  const currentItem = data.find((item) => item.id === contentType);

  const [selectedDropdownText, setSelectedDropdownText] = useState('제목');

  const handleDropdownItemClick = (itemText: string) => {
    setSelectedDropdownText(itemText);
  };

  const initialValues = {
    file: null,
    title: '',
    content: '',
  };

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
  };

  if (!contentType) {
    return (
      <div className="campaign-view__top">
        <div className="campaign-view__image">
          <div className="campaign-view__image__overlay" />
          <img src="/campaign_bn.png" alt="campaignBG" />
          <div className="campaign-view__image__icon">
            <img src="/icon_campaign.svg" alt="campaignIcon" />
            <p>깨끗한 바다 부산을 위해 진행 중인 캠페인을 알려드립니다.</p>
          </div>
        </div>
        <div className="campaign-view__content">
          <div className="campaign-view__grid-head">
            <div className="campaign-view__title">
              <h2 className="gradual-color-transition">캠페인</h2>
            </div>
            <div className="campaign-view__drop-down">
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
              <div className="campaign-view__search-area">
                <TextInput dataId="author" placeholder="캠페인 검색" />
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
          {userRole === 'user' && <ImageGallery data={data} userRole={userRole} onCreateButton={handleCreatePost} />}
          {userRole === 'admin' && (
            <CustomTable data={data} itemsPerPage={10} columns={columns} userRole={userRole} onCreateButton={handleCreatePost} />
          )}
        </div>
      </div>
    );
  }

  if (currentItem) {
    return (
      <div className="campaign-view">
        <div className="campaign-view__top">
          <div className="campaign-view__content">
            <div className="campaign-view__grid-head">
              <div className="campaign-view__title">
                <h2 className="gradual-color-transition">캠페인</h2>
              </div>
            </div>
            <GalleryImageDetails
              id={currentItem.id}
              numbering={currentItem.numbering}
              image={currentItem.image}
              title={currentItem.title}
              author={currentItem.author}
              date={currentItem.date}
              link={currentItem.link}
              description={currentItem.description}
            />
          </div>
        </div>
      </div>
    );
  }

  if (contentType === 'create') {
    return (
      <div className="campaign-view">
        <div className="campaign-view__top">
          <div className="campaign-view__content">
            <div className="campaign-view__grid-head">
              <div className="campaign-view__title">
                <h2 className="gradual-color-transition">캠페인 작성</h2>
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
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="link">링크</label>
                      <Field type="text" id="link" name="link" placeholder="링크를 입력해주세요." />
                    </div>
                  </div>
                  <div>
                    <input id="file" name="file" type="file" accept="image/*" />
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
    <div className="campaign-view">
      <div className="campaign-view__top">
        <h2>NOT FOUND</h2>
      </div>
    </div>
  );
};

export default CampaignView;
