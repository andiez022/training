import React, { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../announcement/AnnCreate.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';

import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import api from '../../services/apiServices';

interface FormValues {
  title: string;
  content: string;
}

// ? editor
const editorConfig: EditorConfig = {
  toolbar: [
    'undo',
    'redo',
    '|',
    'heading',
    '|',
    'bold',
    'italic',
    '|',
    'link',
    'insertTable',
    'mediaEmbed',
    '|',
    'bulletedList',
    'numberedList',
    'indent',
    'outdent',
  ],
};

const BoardCreate = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ? add data
  const createUserData = useMutation((values: any) => api.data.addData('living-lab', values), {
    onSuccess: () => {
      navigate('/living-lab');
      toast.success('성공적으로 생성했습니다.', {
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
    // onSettled: (res) => {},
  });
  // const handleEditorChange = (content: string, editor: any) => {
  //   console.log('Content was updated:', content);
  // };
  // const removeStatusbarRightContainer = (editor: any) => {
  //   editor.on('init', () => {
  //     const statusbarRightContainer = editor.getContainer().querySelector('.tox-statusbar__right-container');
  //     if (statusbarRightContainer) {
  //       statusbarRightContainer.remove();
  //     }
  //   });
  // };
  const handleEditorInit = useCallback(() => {
    setLoading(false);
  }, []);

  // ? Formik
  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('입력하세요'),
      content: Yup.string().required('입력하세요'),
    }),
    onSubmit: (values) => {
      createUserData.mutate(values);
    },
  });

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
            <input
              type="text"
              id="title"
              placeholder="제목을 입력해주세요."
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.errors.title && formik.touched.title && <p className="warning">{formik.errors.title}</p>}
          </div>
          <div className="ann-create-container__input-text-editor">
            {/* <TextEditor /> */}
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
            <Link to="/living-lab">
              <button type="button" className="ann-create-container__input__button-cancel">
                취소
              </button>
            </Link>
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
