import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

import './RegisterView.scss';

const RegisterView: React.FC = () => {
  const initialValues = {
    id: '',
    name: '',
    password: '',
    email: '',
    confirmPassword: '',
    phoneNumber: '',
    termAgreement: false,
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const togglePasswordConfirmVisibility = () => {
    setPasswordConfirmVisible(!passwordConfirmVisible);
  };

  const validationSchema = Yup.object().shape({
    id: Yup.string().required('아이디를 입력하세요.'),
    name: Yup.string().required('이름을 입력하세요.'),
    password: Yup.string().required('비밀번호를 입력하세요.'),
    email: Yup.string().email('올바른 이메일 형식이 아닙니다.').required('이메일을 입력하세요.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호 확인을 입력하세요.'),
    phoneNumber: Yup.string().required('휴대폰 번호를 입력하세요.'),
    termAgreement: Yup.boolean().oneOf([true], '개인정보 수집 및 이용에 동의해야 합니다.'),
  });

  const handleSubmit = (values: any) => {
    console.log('Registration:', values);
  };

  return (
    <div className="registration-form">
      <h2>리빙랩 회원가입</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
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
                <Field type={passwordVisible ? 'text' : 'password'} id="password" name="password" placeholder="비밀번호를 입력하세요." />
                <span onClick={togglePasswordVisibility}>
                  <Icon component={passwordVisible ? ICONS.EYE_VISIBLE : ICONS.EYE_INVISIBLE} size={IconSize.LG} />
                </span>
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
                <Field
                  type={passwordConfirmVisible ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="비밀번호를 입력하세요."
                />
                <span onClick={togglePasswordConfirmVisibility}>
                  <Icon component={passwordConfirmVisible ? ICONS.EYE_VISIBLE : ICONS.EYE_INVISIBLE} size={IconSize.LG} />
                </span>
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">휴대폰 번호</label>
                <Field type="tel" id="phoneNumber" name="phoneNumber" placeholder="'-' 없이 입력하세요." />
                <ErrorMessage name="phoneNumber" component="div" className="error" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <Field type="checkbox" name="termAgreement" />
                  개인정보 수집 및 이용에 동의합니다.
                </label>
                <ErrorMessage name="termAgreement" component="div" className="error" />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}>
              회원가입하기
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterView;
