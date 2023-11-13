import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import GalleryImageDetails from '../../components/ImageGallery/GalleryImageDetails';

import { DataItem } from '../../services/types/common';
import api from '../../services/apiServices';

import './CampaignView.scss';

const CampaignItem: React.FunctionComponent = () => {
  const { id } = useParams();
  const [dataItem, setDataItem] = useState<DataItem | null>(null);

  const handleFetchItem = async (itemId: string) => {
    try {
      const responseData = await api.data.fetchDataById('campaign', itemId);
      setDataItem(responseData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    if (id) {
      handleFetchItem(id);
    }
  }, [id]);

  return (
    <div className="campaign-view">
      <div className="campaign-view__top">
        <div className="campaign-view__content">
          <div className="campaign-view__grid-head">
            <div className="campaign-view__title">
              <h2 className="gradual-color-transition">캠페인</h2>
            </div>
          </div>
          {dataItem && (
            <GalleryImageDetails
              id={dataItem.id}
              image={dataItem.image}
              title={dataItem.title}
              author={dataItem.author}
              link={dataItem.link}
              description={dataItem.content}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignItem;
