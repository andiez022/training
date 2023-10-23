import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import TextInput from '../../components/TextInput/TextInput';

import GalleryImageDetails, { GalleryImageProps } from '../../components/ImageGallery/GalleryImageDetails';
import ImageGallery from '../../components/ImageGallery/ImageGallery';

import './CampaignView.scss';

const CampaignView: React.FC<{ userRole: string }> = ({ userRole }) => {
  const data: GalleryImageProps[] = [
    { id: 'weqweasd', image: '/ctest.jpg', title: 'new campaign!@#@', author: 'admin', link: '33232', description: 'Item 1' },
    { id: '2', image: '/logo192.png', title: '', author: '', link: '', description: 'Item 2' },
    { id: '3', image: '/logo192.png', title: '', author: '', link: '', description: 'Item 3' },
    { id: '4', image: '/logo192.png', title: '', author: '', link: '', description: 'Item 4' },
    { id: '5', image: '/logo192.png', title: '', author: '', link: '', description: 'Item 5' },
    { id: '6', image: '/logo192.png', title: '', author: '', link: '', description: 'Item 6' },
    { id: '7', image: '/logo192.png', title: '', author: '', link: '', description: 'Item 7' },
    { id: '8', image: '/logo192.png', title: '', author: '', link: '', description: 'Item 8' },
    { id: '9', image: '/logo192.png', title: '', author: '', link: '', description: 'Item 9' },
    { id: '10', image: '/logo192.png', title: '', author: '', link: '', description: 'Item 10' },
    { id: '11', image: '/logo192.png', title: '', author: '', link: '', description: 'Item 11' },
    { id: '12', image: '/logo192.png', title: '', author: '', link: '', description: 'Item 12' },
    { id: '13', image: '/logo192.png', title: '', author: '', link: '', description: 'Item 13' },
  ];

  const { contentType } = useParams();
  const currentItem = data.find((item) => item.id === contentType);

  const [selectedItemText, setSelectedItemText] = useState('');

  const handleDropdownItemClick = (itemText: string) => {
    setSelectedItemText(itemText);
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
            <h2 className="gradual-color-transition">캠페인</h2>
            <div className="campaign-view__drop-down">
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
              <div className="campaign-view__search-area">
                <TextInput dataId="" placeholder="캠페인 검색" />
                <Button
                  icon={ICONS.MAGNIFIER}
                  iconPlacement={ButtonIconPlacement.Left}
                  iconSize={IconSize.XL}
                  className="button--icon-text"
                >
                  제목
                </Button>
              </div>
            </div>
          </div>
          <ImageGallery data={data} />
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
              <h2 className="gradual-color-transition">캠페인</h2>
            </div>
            <GalleryImageDetails
              id={currentItem.id}
              image={currentItem.image}
              title={currentItem.title}
              author={currentItem.author}
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
      <div className="campaign-view__top">
        <h1>Create New Item</h1>
        <h1>Create New Item</h1>
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
