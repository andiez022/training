import React, { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Editor } from '@tinymce/tinymce-react';
import Loading from '../../components/Loading/LoadingEditor';
import './BoardCreate.scss';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import api from '../../services/apiServices';

interface FormValues {
  author: string;
  password: string;
  title: string;
  content: string;
}

// backshadow variants
const backVariants = {
  hiden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};
// modal variant
const modalVariants = {
  hiden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};
const BoardCreate = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // ? add data
  const createUserData = useMutation((values: any) => api.data.addData('free-board', values), {
    onSuccess: (res) => {
      navigate('/free-board');
      toast.success(`${res?.successMsg}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
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
      author: '',
      password: '',
      title: '',
      content: '',
    },
    validationSchema: Yup.object({
      author: Yup.string().required('입력하세요'),
      password: Yup.string().required('입력하세요'),
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
      <div className="board-header">
        <Header />
      </div>
      <div className="board-create-container">
        <p className="board-create-container__title">자유게시판 작성</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="board-create-container__input-info">
            <div className="board-create-container__input-info__author">
              <label htmlFor="author">작성자 이름</label>
              <input
                type="text"
                id="author"
                placeholder="이름을 입력하세요."
                name="author"
                value={formik.values.author}
                onChange={formik.handleChange}
              />

              {formik.errors.author && formik.touched.author && <p className="warning">{formik.errors.author}</p>}
            </div>
            <div className="board-create-container__input-info__password">
              <label htmlFor="password">비밀번호</label>
              <input
                type="text"
                id="password"
                placeholder="비밀번호를 입력하세요."
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && <p className="warning">{formik.errors.password}</p>}
            </div>
          </div>
          <div className="board-create-container__input-title">
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
          <div className="board-create-container__input-text-editor">
            {/* <TextEditor /> */}
            <div style={{ position: 'relative', height: '300px' }}>
              {loading && <Loading />}
              <Editor
                apiKey="cf8cf0sakk2mnhfgylt1z857krdhcb09jbc0y90i3ephnu03"
                initialValue="<p></p>"
                init={{
                  // name: 'content',
                  // value: formik.values.content,
                  // onChange: formik.handleChange,
                  height: 300,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'placeholder',
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | removeformat | ',
                  placeholder: '내용을 입력하세요.',
                  // setup: removeStatusbarRightContainer,
                  setup: (editor) => {
                    editor.on('init', handleEditorInit);
                    editor.on('Change', () => {
                      handleEditorChange(editor.getContent());
                    });
                  },
                }}
                onEditorChange={handleEditorChange}
              />
              {formik.errors.content && formik.touched.content && (
                <p style={{ marginTop: '10px' }} className="warning">
                  {formik.errors.content}
                </p>
              )}
            </div>
          </div>
          <div className="board-create-container__input__button">
            <button type="submit" className="board-create-container__input__button-submit">
              등록
            </button>
            <Link to="/free-board">
              <button type="button" className="board-create-container__input__button-cancel">
                취소
              </button>
            </Link>
          </div>
        </form>
      </div>
      <div className="board-footer">
        <Footer />
      </div>
    </div>
  );
};

export default BoardCreate;
