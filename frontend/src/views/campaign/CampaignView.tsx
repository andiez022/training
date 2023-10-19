import React, { useState } from 'react';
import Header from '../header/Header';

import Dropdown from '../../components/Dropdown/Dropdown';
import DropdownItem from '../../components/Dropdown/DropdownItem';
import Button, { ButtonIconPlacement } from '../../components/Button/Button';
import { ICONS, IconSize } from '../../components/SVG/Icon';
import TextInput from '../../components/TextInput/TextInput';

import ImageGallery from '../../components/ImageGallery/ImageGallery';

import './CampaignView.scss';

const CampaignView: React.FC<{ userRole: string }> = ({ userRole }) => {
  const [selectedItemText, setSelectedItemText] = useState('');

  const handleDropdownItemClick = (itemText: string) => {
    setSelectedItemText(itemText);
  };

  return (
    <div className="campaign-view">
      <div className="campaign-view__top">
        <div className="campaign-view__image">
          <div className="campaign-view__image__overlay" />
          <img src="/campaign_bn.png" alt="campaignBG" />
          <div className="campaign-view__image__icon">
            <img src="icon_campaign.svg" alt="campaignIcon" />
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
          <div className="campaign-view__grid-body">
            <ImageGallery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignView;
