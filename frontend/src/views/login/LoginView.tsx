import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import './LoginView.scss';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';
import hideShowPass from '../../common/utils/hideShowPass';
import { SignUpForm } from '../../services/types/common';

const Login = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);

  // ? Formik
  const formik = useFormik<SignUpForm>({
    initialValues: {
      id: '',
      password: '',
    },
    validationSchema: Yup.object({
      id: Yup.string().required('입력하세요'),
      password: Yup.string().required('입력하세요'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <div className="login-header">
        <Header />
        {/* <div className="home-back">[ 관리자 ]</div> */}
      </div>
      <div className="login-container">
        <form onSubmit={formik.handleSubmit} className="login-container__form">
          <h1>로그인</h1>
          <div className="login-container__form-id">
            <p>아이디</p>
            <input type="text" name="id" value={formik.values.id} onChange={formik.handleChange} placeholder="아이디를 입력하세요." />
            {formik.errors.id && formik.touched.id && <p className="warning">{formik.errors.id}</p>}
          </div>
          <div className="login-container__form-password">
            <p>비밀번호</p>
            <div className="login-container__form-password__input">
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="비밀번호를 입력하세요"
              />
              <div className="login-container__form-password__icon" onClick={() => hideShowPass({ password: 'password' })}>
                {show ? (
                  <div onClick={() => setShow(!show)}>
                    <Icon component={ICONS.EYE_ICON} size={IconSize.LG} />
                  </div>
                ) : (
                  <div onClick={() => setShow(!show)}>
                    <Icon component={ICONS.EYE_OFF_ICON} size={IconSize.LG} />
                  </div>
                )}
              </div>
            </div>
            {formik.errors.password && formik.touched.password && <p className="warning">{formik.errors.password}</p>}
          </div>
          <div className="login-container__form-remember">
            <div className="login-container__form-remember__icon" onClick={() => setRemember(!remember)}>
              {remember ? <Icon component={ICONS.CHECK_REMEMBER} size={IconSize.SM} /> : ''}
            </div>
            <p>아이디 기억하기</p>
          </div>
          <div className="login-container__form-button">
            <button type="submit" className="login-container__form-button-submit">
              확인
            </button>
            <button className="login-container__form-button-register" onClick={() => navigate('/register')}>
              리빙랩 회원가입
            </button>
          </div>
        </form>
      </div>
      <div className="login-footer">
        <Footer />
      </div>
    </>
  );
};

export default Login;
