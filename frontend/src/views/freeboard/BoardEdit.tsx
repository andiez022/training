import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import '../announcement/AnnCreate.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import api from '../../services/apiServices';
import { selectToken } from '../../services/controllers/common/UserSelector';

interface FormValues {
  title: string;
  content: string;
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

const BoardEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data: dataItem } = useQuery(['boardItem', id], () => api.data.fetchDataById('free-board', id || ''));
  const isLoggedIn = useSelector(selectToken) !== null;

  // ? edit data
  const editData = useMutation((values: any) => api.data.editdataById('free-board/admin', id || '', values), {
    onSuccess: () => {
      navigate('/free-board');
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
        <form>
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
            <button className="ann-create-container__input__button-submit" onClick={(e: any) => formik.handleSubmit(e)}>
              등록
            </button>
            <button type="button" className="ann-create-container__input__button-cancel" onClick={() => navigate('/living-lab')}>
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

export default BoardEdit;
