import React, { useState } from 'react';

const ImageGallery: React.FC = () => {
  const data = [
    { id: 1, image: '/logo192.png', description: 'Item 1' },
    { id: 2, image: '/logo192.png', description: 'Item 2' },
    { id: 3, image: '/logo192.png', description: 'Item 3' },
    { id: 4, image: '/logo192.png', description: 'Item 4' },
    { id: 5, image: '/logo192.png', description: 'Item 5' },
    { id: 6, image: '/logo192.png', description: 'Item 6' },
    { id: 7, image: '/logo192.png', description: 'Item 7' },
    { id: 8, image: '/logo192.png', description: 'Item 8' },
    { id: 9, image: '/logo192.png', description: 'Item 9' },
    { id: 10, image: '/logo192.png', description: 'Item 10' },
    { id: 11, image: '/logo192.png', description: 'Item 11' },
    { id: 12, image: '/logo192.png', description: 'Item 12' },
    { id: 13, image: '/logo192.png', description: 'Item 13' },
  ];

  const itemsPerPage = 12;
  const itemsPerRow = 4;
  const totalPageCount = Math.ceil(data.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (item: any) => {
    console.log(`Clicked on item: ${item.description}`);
  };

  return (
    <div className="gallery-container">
      {currentItems.map((item) => (
        <div key={item.id} className="grid-item" onClick={() => handleClick(item)}>
          <img src={item.image} alt={item.description} />
          <p>{item.description}</p>
        </div>
      ))}
      <div className="pagination">
        <div>
          {Array.from({ length: totalPageCount }, (_, index) => (
            <button key={index + 1} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
