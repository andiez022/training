import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

import './LoginView.scss';

const LoginView: React.FC = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = (values: any) => {
    console.log(values);
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
            <Field type="password" id="password" name="password" placeholder="비밀번호를 입력하세요." />
            <ErrorMessage name="password" component="div" className="error" />
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
