import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import './RegisterView.scss';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';
import hideShowPass from '../../common/utils/hideShowPass';
import { RegisterForm } from '../../services/types/common';

const Register = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  const [remember, setRemember] = useState(true);

  // ? Formik
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik<RegisterForm>({
    initialValues: {
      id: '',
      name: '',
      password: '',
      passwordVerify: '',
      email: '',
      phone: '',
    },
    validationSchema: Yup.object({
      id: Yup.string().required('입력하세요'),
      password: Yup.string().min(8, '전화가 올바른 형식이 아닙니다.').max(23).required('입력하세요'),
      name: Yup.string().required('입력하세요'),
      passwordVerify: Yup.string().required('입력하세요'),
      email: Yup.string().email('이메일 형식이 잘못되었습니다').required('입력하세요'),
      phone: Yup.string()
        .min(8, '전화가 올바른 형식이 아닙니다.')
        .required('입력하세요')
        .matches(phoneRegExp, '전화가 올바른 형식이 아닙니다.'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <div className="register-header">
        <Header />
        {/* <div className="home-back">[ 관리자 ]</div> */}
      </div>
      <div className="register-container">
        <form onSubmit={formik.handleSubmit} className="register-container__form">
          <h1>리빙랩 회원가입</h1>
          <div className="register-container__form-input">
            <div className="left">
              <div className="register-container__form-input-id">
                <p>아이디</p>
                <input type="text" name="id" value={formik.values.id} onChange={formik.handleChange} placeholder="아이디를 입력하세요." />
                {formik.errors.id && formik.touched.id && <p className="warning">{formik.errors.id}</p>}
              </div>

              <div className="register-container__form-input-password">
                <p>비밀번호</p>
                <div className="register-container__form-input-password__input">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="비밀번호를 입력하세요"
                  />
                  <div className="register-container__form-input-password__icon" onClick={() => hideShowPass({ password: 'password' })}>
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

              <div className="register-container__form-input-password-verify">
                <p>비밀번호 확인</p>
                <div className="register-container__form-input-password-verify__input">
                  <input
                    type="password-verify"
                    id="password-verify"
                    name="passwordVerify"
                    value={formik.values.passwordVerify}
                    onChange={formik.handleChange}
                    placeholder="비밀번호를 입력하세요"
                  />
                  <div
                    className="register-container__form-input-password-verify__icon"
                    onClick={() => hideShowPass({ password: 'password-verify' })}
                  >
                    {showVerify ? (
                      <div onClick={() => setShowVerify(!showVerify)}>
                        <Icon component={ICONS.EYE_ICON} size={IconSize.LG} />
                      </div>
                    ) : (
                      <div onClick={() => setShowVerify(!showVerify)}>
                        <Icon component={ICONS.EYE_OFF_ICON} size={IconSize.LG} />
                      </div>
                    )}
                  </div>
                </div>
                {formik.errors.passwordVerify && formik.touched.passwordVerify && <p className="warning">{formik.errors.passwordVerify}</p>}
              </div>
            </div>

            <div className="right">
              <div className="register-container__form-input-name">
                <p>이름</p>
                <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} placeholder="이름을 입력하세요." />
                {formik.errors.name && formik.touched.name && <p className="warning">{formik.errors.name}</p>}
              </div>

              <div className="register-container__form-input-email">
                <p>이메일</p>
                <input
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="이메일을 입려하세요."
                />
                {formik.errors.email && formik.touched.email && <p className="warning">{formik.errors.email}</p>}
              </div>
              <div className="register-container__form-input-phone">
                <p>이메일</p>
                <input
                  type="text"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  placeholder="'-' 없이 입력하세요."
                />
                {formik.errors.phone && formik.touched.phone && <p className="warning">{formik.errors.phone}</p>}
              </div>
            </div>
          </div>
          <div className="register-container__form-remember">
            <div className="register-container__form-remember__icon" onClick={() => setRemember(!remember)}>
              {remember ? <Icon component={ICONS.CHECK_REMEMBER} size={IconSize.SM} /> : ''}
            </div>
            <p>개인정보 수집 및 이용에 동의합니다.</p>
            {remember ? '' : <p className="warning">정책을 수락해야 함</p>}
          </div>

          <div className="register-container__form-button">
            {/* <button type="submit" className="register-container__form-button-submit">
              확인
            </button> */}
            <button className="register-container__form-button-register">회원가입하기</button>
          </div>
        </form>
      </div>
      <div className="register-footer">
        <Footer />
      </div>
    </>
  );
};

export default Register;
