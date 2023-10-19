import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import { Link } from 'react-router-dom';

import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

import './LoginView.scss';

const LoginView: React.FC = () => {
  const initialValues = {
    username: '',
    password: '',
    rememberUserId: false,
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (values: any) => {
    console.log('Remember User ID:', values.rememberUserId);
    console.log('Form values:', values);
  };

  return (
    <div className="login-form">
      <h2>로그인</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div className="form-group">
            <label htmlFor="username">아이디</label>
            <Field type="text" id="username" name="username" placeholder="아이디를 입력하세요." />
            <ErrorMessage name="username" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <Field type={passwordVisible ? 'text' : 'password'} id="password" name="password" placeholder="비밀번호를 입력하세요." />
            <span onClick={togglePasswordVisibility}>👁️</span>
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <div className="form-group">
            <label>
              <Field type="checkbox" name="rememberUserId" />
              아이디 기억하기
            </label>
          </div>
          <button type="submit">확인</button>
        </Form>
      </Formik>
      <Link to="/register" className="registration-button">
        리빙랩 회원가입
      </Link>
    </div>
  );
};

export default LoginView;
