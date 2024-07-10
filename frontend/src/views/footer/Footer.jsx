import React from 'react';
import './Footer.scss';
import footerLogo from '../../common/assets/images/footer-logo.svg';

export const Footer = () => {
  return (
    <div className="footer-container">
      <svg className="footer-logo">
        <image xlinkHref={footerLogo} />
      </svg>
      <div className="footer-text">
        <p>47340 부산광역시 부산진구 엄광로 176 | TEL. 051-890-1754 | FAX. 051-890-1759</p>
        <p>COPYRIGHT 2023 DONG-EUI UNIVERSITY. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  );
};
