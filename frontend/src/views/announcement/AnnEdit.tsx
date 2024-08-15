import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AnnCreate.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import api from '../../services/apiServices';

interface FormValues {
  title: string;
  content: string;
  id: string;
}

// ? editor
const editorConfig: EditorConfig = {
  toolbar: [
    '|',
    'heading',
    '|',
    'bold',
    'italic',
    'underline',
    'blockQuote',
    '|',
    'bulletedList',
    'numberedList',
    'outdent',
    'indent',
    '|',
    'link',
    'uploadImage',
  ],
};

const BoardCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: dataItem } = useQuery(['annItem', id], () => api.data.fetchDataById('notice', id || ''));

  // ? edit data
  const editData = useMutation((values: any) => api.data.editData('notice', values), {
    onSuccess: () => {
      navigate('/announcement');
      toast.success('성공적으로 업데이트되었습니다.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    },
  });

  // ? Formik
  const formik = useFormik<FormValues>({
    initialValues: {
      id: '',
      title: '',
      content: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required('입력하세요'),
      content: Yup.string().required('입력하세요'),
    }),
    onSubmit: (values) => {
      editData.mutate(values);
    },
  });

  useEffect(() => {
    if (dataItem) {
      formik.setValues({
        id: dataItem.id,
        title: dataItem.title,
        content: dataItem.content,
      });
    }
  }, [dataItem]);

  const handleEditorChange = (content: string) => {
    formik.setFieldValue('content', content);
  };

  return (
    <div>
      <div className="ann-header">
        <Header />
      </div>
      <div className="ann-create-container">
        <p className="ann-create-container__title">자유게시판 작성</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="ann-create-container__input-title">
            <label htmlFor="title">제목</label>
            <input type="text" placeholder="제목을 입력해주세요." name="title" value={formik.values.title} onChange={formik.handleChange} />
            {formik.errors.title && formik.touched.title && <p className="warning">{formik.errors.title}</p>}
          </div>
          <div className="ann-create-container__input-text-editor">
            <div style={{ position: 'relative', height: '300px' }}>
              <CKEditor
                editor={ClassicEditor}
                config={editorConfig}
                data={formik.values.content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleEditorChange(data);
                }}
              />
              {formik.errors.content && formik.touched.content && (
                <p style={{ marginTop: '10px' }} className="warning">
                  {formik.errors.content}
                </p>
              )}
            </div>
          </div>
          <div className="ann-create-container__input__button">
            <button type="submit" className="ann-create-container__input__button-submit">
              등록
            </button>
            <button type="button" className="ann-create-container__input__button-cancel" onClick={() => navigate('/announcement')}>
              취소
            </button>
          </div>
        </form>
      </div>
      <div className="ann-footer">
        <Footer />
      </div>
    </div>
  );
};

export default BoardCreate;
