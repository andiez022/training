import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { DataItem } from '../../services/types/common';
import api from '../../services/apiServices';

import './ContentView.scss';

const ContentEdit: React.FC = () => {
  const { id } = useParams();
  const [dataItem, setDataItem] = useState<DataItem | null>(null);
  const [initialEditValues, setInitialEditValues] = useState({
    id: '',
    title: '',
    video: '',
    description: '',
  });

  const handleFetchItem = async (itemId: string) => {
    try {
      const responseData = await api.data.fetchDataById('content', itemId);
      setDataItem(responseData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    if (id) {
      handleFetchItem(id);
    }
  }, []);

  useEffect(() => {
    if (dataItem) {
      setInitialEditValues({
        id: dataItem.id,
        title: dataItem.title,
        video: dataItem.video,
        description: dataItem.description,
      });
    }
  }, [dataItem]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('제목을 입력하세요.'),
    description: Yup.string().required('제내용을 입력하세요.'),
  });

  const handleModify = async (values: any) => {
    try {
      await api.data.editData('content', values);

      window.location.pathname = 'content';
    } catch (error) {
      console.error('Error posting data: ', error);
    }
  };

  return (
    <div className="content-view">
      <div className="content-view__top">
        <div className="content-view__content">
          <div className="content-view__table-head">
            <div className="content-view__title">
              <h2 className="gradual-color-transition">공지사항 작성</h2>
            </div>
          </div>
          <div className="form-container">
            <Formik enableReinitialize initialValues={initialEditValues} validationSchema={validationSchema} onSubmit={handleModify}>
              {({ isSubmitting }) => (
                <Form className="form-create">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="title">제목</label>
                      <Field type="text" id="title" name="title" placeholder="제목을 입력해주세요." />
                    </div>
                  </div>
                  <ErrorMessage name="title" component="div" className="error" />
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="video">링크</label>
                      <Field type="text" id="video" name="video" placeholder="링크를 입력해주세요." />
                    </div>
                  </div>
                  <ErrorMessage name="video" component="div" className="error" />
                  <div className="form-row">
                    <div className="form-group">
                      <Field as="textarea" id="description" name="description" className="content-area" />
                    </div>
                  </div>
                  <ErrorMessage name="description" component="div" className="error" />
                  <div className="form-button">
                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                      등록
                    </button>
                    <button type="button" className="cancel-button" onClick={() => window.location.assign('/content')}>
                      취소
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEdit;
