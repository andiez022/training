import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import TableRowDetails from '../../components/Table/TableRowDetails';

import { DataItem } from '../../services/types/common';
import api from '../../services/apiServices';

import './ContentView.scss';

const ContentItem: React.FunctionComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataItem, setDataItem] = useState<DataItem | null>(null);

  const handleFetchItem = async (itemId: string) => {
    try {
      const responseData = await api.data.fetchDataById('content', itemId);
      setDataItem(responseData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleDisplayItem = (itemId: string) => {
    navigate(`/content/${itemId}`);
  };

  useEffect(() => {
    if (id) {
      handleFetchItem(id);
    }
  }, [id]);

  return (
    <div className="content-view">
      <div className="content-view__top">
        <div className="content-view__content">
          <div className="content-view__table-head">
            <div className="content-view__title">
              <h2 className="gradual-color-transition">공지사항</h2>
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
};

export default ContentItem;