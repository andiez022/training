import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import './RegisterView.scss';

const RegisterView: React.FC = () => {
  const initialValues = {
    id: '',
    name: '',
    password: '',
    email: '',
    confirmPassword: '',
    phoneNumber: '',
  };

  const handleSubmit = (values: any) => {
    // Handle registration here
    console.log('Registration:', values);
  };

  return (
    <div className="registration-form">
      <h2>회원 가입</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="id">아이디</label>
              <Field type="text" id="id" name="id" placeholder="아이디를 입력하세요" />
              <ErrorMessage name="id" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="name">이름</label>
              <Field type="text" id="name" name="name" placeholder="이름을 입력하세요" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <Field type="password" id="password" name="password" placeholder="비밀번호를 입력하세요" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <Field type="email" id="email" name="email" placeholder="이메일을 입력하세요" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <Field type="password" id="confirmPassword" name="confirmPassword" placeholder="비밀번호를 입력하세요." />
              <ErrorMessage name="confirmPassword" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">휴대폰 번호</label>
              <Field type="tel" id="phoneNumber" name="phoneNumber" placeholder="'-' 없이 입력하세요." />
              <ErrorMessage name="phoneNumber" component="div" className="error" />
            </div>
          </div>

          <button type="submit">회원가입하기</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterView;
