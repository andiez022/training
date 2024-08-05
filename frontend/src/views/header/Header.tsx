import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logoHeader from '../../common/assets/images/logo-header.svg';
import CardHeader from '../../components/Card/components/CardHeader';
import './Header.scss';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';
import { selectToken, selectUserRole } from '../../services/controllers/common/UserSelector';
import { storage } from '../../common/utils/storage';
import { logout } from '../../services/controllers/common/UserSlice';
import { routes } from '../../common/utils/routes';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showNavRes, setShowNavRes] = useState(false);

  const handleOpenNav = () => {
    setShowNavRes(!showNavRes);
  };

  const isLoggedIn = useSelector(selectToken) !== null;
  const isAdmin = useSelector(selectUserRole) === 'Admin';

  console.log(isAdmin);

  return (
    <div className={`header ${showNavRes ? 'show' : ''} ${isLoggedIn ? (isAdmin ? 'admin' : 'user') : ''}`}>
      <div className="header-left">
        <Link to="/">
          <svg className="header-logo">
            <image xlinkHref={logoHeader} />
          </svg>
        </Link>
        {isLoggedIn ? (
          <div className="home-back" onClick={() => navigate('/')}>
            [ 관리자 ]
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="header-right">
        <div className="close-icon icon-nav-bar" onClick={handleOpenNav}>
          {showNavRes ? (
            <Icon component={ICONS.CLOSE_ICON} size={IconSize.LG} style={{ fill: 'black' }} />
          ) : (
            <Icon component={ICONS.METRO_MENU} size={IconSize.LG} />
          )}
        </div>
        <div className={`header-right__card ${showNavRes ? 'show' : ''}`}>
          <NavLink to="/" className="home">
            <CardHeader title="홈" />
          </NavLink>

          <NavLink to="/introduction" className="introduction">
            <CardHeader title="소개" />
          </NavLink>

          <NavLink to="/announcement" className="announcement">
            <CardHeader title="공지사항" />
          </NavLink>

          <NavLink to="/facility" className="facility">
            <CardHeader title="시설현황" />
          </NavLink>

          <NavLink to="/content" className="content">
            <CardHeader title="콘텐츠" />
          </NavLink>

          <NavLink to="/living-lab" className="living-lab">
            <CardHeader title="콘텐츠" />
          </NavLink>

          <NavLink to="/campain" className="campain">
            <CardHeader title="캠페인" />
          </NavLink>

          <NavLink to="/free-board" className="free-board">
            <CardHeader title="자유게시판" />
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/login"
              onClick={() => {
                storage.removeToken();
                dispatch(logout());
                navigate(routes.LOGIN);
              }}
            >
              <CardHeader title="로그아웃" />
            </NavLink>
          )}
        </div>
      </div>
      {/* <div className={`icon-nav-bar ${showNavRes ? '' : 'unshow'}`} onClick={handleOpenNav}>
        <Icon component={ICONS.METRO_MENU} size={IconSize.LG} />
      </div> */}
    </div>
  );
};
