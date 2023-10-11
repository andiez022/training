import * as React from 'react';

import './Footer.scss';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src="/그룹 221.svg" alt="footerLogo" />
      </div>
      <div className="footer-section">
        <p>47430 부산광역시 부산진구 엄광로 176 | TEL. 051-890-1754 | FAX. 051-890-1759</p>
        <p>COPYRIGHT 2023 DONG-EUI UNIVERSITY. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
};

export default Footer;
