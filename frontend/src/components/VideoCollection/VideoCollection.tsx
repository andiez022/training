import React, { useState } from 'react';

import Icon, { ICONS, IconSize } from '../SVG/Icon';
import VideoPlayer from './VideoPlayer';

import './VideoCollection.scss';

export interface VideoItemProps {
  selected: boolean;
  id: any;
  numbering: number;
  video_id?: string;
  image: string;
  title: string;
  description: string;
  author: string;
  date: string;
}

interface VideoCollectionProps {
  data: VideoItemProps[];
}

const VideoCollection: React.FC<VideoCollectionProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const totalPageCount = Math.ceil(data.length / itemsPerPage);

  const renderVideoItems = (page: number) => {
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const itemsToDisplay = data.slice(startIdx, endIdx);

    return itemsToDisplay.map((video) => (
      <div key={video.id} className="video">
        <div className="video__thumbnail">
          <VideoPlayer videoId={video.video_id} />
        </div>
        <div className="video__info">
          <div className="video__info__header">
            <div className="video__info__header__title">
              <h3>{video.title}</h3>
            </div>
            <p>{video.date}</p>
          </div>
          <div className="video__info__desc">
            <p>{video.description}</p>
          </div>
        </div>
      </div>
    ));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPageCount);
  };

  return (
    <div>
      <div className="video-collection">{renderVideoItems(currentPage)}</div>
      <div className="pagination">
        {currentPage > 1 && (
          <div className="icon-nav">
            <button onClick={handleFirstPage} className="button-nav">
              <Icon component={ICONS.FIRST} size={IconSize.XXL} />
            </button>
            <button onClick={handlePrevPage} className="button-nav">
              <Icon component={ICONS.BACKWARD} size={IconSize.XXL} />
            </button>
          </div>
        )}
        <div className="page-number">
          {Array.from({ length: totalPageCount }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(index + 1);
              }}
              className={`button ${currentPage === index + 1 ? 'clicked' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {currentPage < totalPageCount && (
          <div className="icon-nav">
            <button onClick={handleNextPage} className="button-nav">
              <Icon component={ICONS.FORWARD} size={IconSize.XXL} />
            </button>
            <button onClick={handleLastPage} className="button-nav">
              <Icon component={ICONS.LAST} size={IconSize.XXL} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCollection;
