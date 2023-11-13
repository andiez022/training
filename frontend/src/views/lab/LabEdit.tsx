import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { DataItem } from '../../services/types/common';
import api from '../../services/apiServices';

import './LabView.scss';

const LabEdit: React.FC = () => {
  const { id } = useParams();
  const [dataItem, setDataItem] = useState<DataItem | null>(null);
  const [initialEditValues, setInitialEditValues] = useState({
    id: '',
    title: '',
    content: '',
  });

  const handleFetchItem = async (itemId: string) => {
    try {
      const responseData = await api.data.fetchDataById('living-lab', itemId);
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
        content: dataItem.content,
      });
    }
  }, [dataItem]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('제목을 입력하세요.'),
    content: Yup.string().required('제내용을 입력하세요.'),
  });

  const handleModify = async (values: any) => {
    try {
      await api.data.editData('living-lab', values);

      window.location.pathname = 'lab';
    } catch (error) {
      console.error('Error posting data: ', error);
    }
  };

  const toolBarOptions = [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
    [{ list: 'bullet' }, { list: 'ordered' }, 'blockquote'],
    ['link', 'image'],
  ];

  const modules = {
    toolbar: toolBarOptions,
  };

  return (
    <div className="lab-view">
      <div className="lab-view__top">
        <div className="lab-view__content">
          <div className="lab-view__table-head">
            <div className="lab-view__title">
              <h2 className="gradual-color-transition">리빙랩 수정</h2>
            </div>
          </div>
          <div className="form-container">
            <Formik enableReinitialize initialValues={initialEditValues} validationSchema={validationSchema} onSubmit={handleModify}>
              {({ isSubmitting }) => (
                <Form className="form-create">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="title">제목</label>
                      <Field type="text" id="title" name="title" />
                    </div>
                  </div>
                  <ErrorMessage name="title" component="div" className="error" />
                  <div className="form-row">
                    <div className="form-group">
                      <Field id="content" name="content">
                        {({ field }: { field: { value: string; onChange: (e: any) => void } }) => (
                          <ReactQuill
                            value={field.value}
                            onChange={(value) => field.onChange({ target: { name: 'content', value } })}
                            className="content-area"
                            modules={modules}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                  <ErrorMessage name="content" component="div" className="error" />
                  <div className="form-button">
                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                      등록
                    </button>
                    <button type="button" className="cancel-button" onClick={() => window.location.assign('/lab')}>
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

export default LabEdit;
