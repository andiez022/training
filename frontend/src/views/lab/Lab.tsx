import React from 'react';
import './Lab.scss';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';

const Lab = () => {
  return (
    <>
      <div className="lab-header">
        <Header />
      </div>
      <div className="lab-container">a</div>
      <div className="lab-footer">
        <Footer />
      </div>
    </>
  );
};

export default Lab;
