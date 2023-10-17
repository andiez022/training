import React, { useState, useEffect } from 'react';

import Icon, { ICONS, IconSize } from '../SVG/Icon';

import './VideoCollection.scss';

export interface VideoItem {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
}

const VideoCollection: React.FC = () => {
  const [videoData, setVideoData] = useState<VideoItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 10;

  const totalPageCount = Math.ceil(videoData.length / itemsPerPage);

  // Fetch or set your video data in the useEffect hook
  useEffect(() => {
    const exampleVideoData: VideoItem[] = [
      {
        id: 1,
        image: '/logo192.png',
        title: '전영은 콘텐츠 테스트 전영은 콘텐츠 테스트 전영은 콘텐츠 테스트 전영은 콘텐츠 테스트 전영 츠 테스트 전영ㅇ',
        description: 'acb3213123555dsadsad',
        date: '2023-10-16',
      },
      {
        id: 2,
        image: '/logo192.png',
        title: 'Video 2',
        description:
          '튼튼하며, 천지는 곳이 광야에서 천하를 말이다. 불러 청춘의 바이며, 있는 못할 석가는 끓는 생의 찾아다녀도, 사막이다. 크고 두손을 원대하고, 인간의 봄바람이다. 이성은 넣는 만천하의 불어 구하지 우는 끓는 것이다. 끓는 천지는 안고, 그들은 위하여 인생을 들어 무엇이 희망의 있는가? 투명하되 가는 따뜻한 않는 생명을 아니다. 우리의 영원히 자신과 그러므로 무엇이 피가 희망의 교향악이다.',
        date: '2023-10-16',
      },
      {
        id: 3,
        image: '/logo192.png',
        title: 'Video 3',
        description: 'acb3213123555dsadsad',
        date: '2023-10-16',
      },
      {
        id: 4,
        image: '/logo192.png',
        title: 'Video 4',
        description: 'acb3213123555dsadsad',
        date: '2023-10-16',
      },
      {
        id: 5,
        image: '/logo192.png',
        title: 'Video 5',
        description: 'acb3213123555dsadsad',
        date: '2023-10-16',
      },
      {
        id: 6,
        image: '/logo192.png',
        title: 'Video 6',
        description: 'acb3213123555dsadsad',
        date: '2023-10-16',
      },
      {
        id: 7,
        image: '/logo192.png',
        title: 'Video 7',
        description: 'acb3213123555dsadsad',
        date: '2023-10-16',
      },
      {
        id: 8,
        image: '/logo192.png',
        title: 'Video 8',
        description: 'acb3213123555dsadsad',
        date: '2023-10-16',
      },
      {
        id: 9,
        image: '/logo192.png',
        title: 'Video 9',
        description: 'acb3213123555dsadsad',
        date: '2023-10-16',
      },
      {
        id: 10,
        image: '/logo192.png',
        title: 'Video 10',
        description: 'acb3213123555dsadsad',
        date: '2023-10-16',
      },
      {
        id: 11,
        image: '/logo192.png',
        title: 'Video 11',
        description: 'acb3213123555dsadsad',
        date: '2023-10-16',
      },
      {
        id: 12,
        image: '/logo192.png',
        title: 'Video 12',
        description: 'acb3213123555dsadsad',
        date: '2023-10-16',
      },
      {
        id: 13,
        image: '/logo192.png',
        title: 'Video 13',
        description: 'acb3213123555dsadsad',
        date: '2023-10-16',
      },
    ];

    setVideoData(exampleVideoData);
  }, []);

  const renderVideoItems = (page: number) => {
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const itemsToDisplay = videoData.slice(startIdx, endIdx);

    return itemsToDisplay.map((video) => (
      <div key={video.id} className="video">
        <div className="video__thumbnail">
          <img src={video.image} alt="Video Thumbnail" />
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
        <button className="button-nav" onClick={handleFirstPage}>
          <Icon className="icon-nav" component={ICONS.FIRST} size={IconSize.XL} />
        </button>
        <button className="button-nav" onClick={handlePrevPage}>
          <Icon className="icon-nav" component={ICONS.BACKWARD} size={IconSize.XL} />
        </button>
        <div className="page-number">
          {Array.from({ length: totalPageCount }, (_, index) => (
            <button key={index + 1} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
        <button className="button-nav" onClick={handleNextPage}>
          <Icon className="icon-nav" component={ICONS.FORWARD} size={IconSize.XL} />
        </button>
        <button className="button-nav" onClick={handleLastPage}>
          <Icon className="icon-nav" component={ICONS.LAST} size={IconSize.XL} />
        </button>
      </div>
    </div>
  );
};

export default VideoCollection;
