import React, { ChangeEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './CampainCreate.scss';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import api from '../../services/apiServices';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

interface FormValues {
  title: string;
  content: string;
  link: string;
  image: File | null;
  image_name: string;
}

const BoardCreate = () => {
  const [imageName, setImageName] = useState<string>('');
  const navigate = useNavigate();

  // Editor configuration
  const handleEditorChange = (content: string) => {
    formik.setFieldValue('content', content);
  };

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
    placeholder: '내용을 입력하세요.',
  };

  // Mutation to add data
  const createCampainData = useMutation((values: any) => api.data.addCampaignData('campaign', values), {
    onSuccess: () => {
      navigate('/campain');
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
    onError: (error) => {
      console.error('Error creating campaign:', error);
      toast.error('생성 중 오류가 발생했습니다.', {
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

  // Formik setup
  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      content: '',
      link: '',
      image: null,
      image_name: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('입력하세요'),
      content: Yup.string().required('입력하세요'),
      link: Yup.string().required('입력하세요'),
      image: Yup.mixed().required('파일을 선택하세요'),
    }),
    onSubmit: (values) => {
      console.log('Submitting form:', values);
      createCampainData.mutate(values);
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (image) {
      setImageName(image.name);
      formik.setFieldValue('image', image);
    }
  };

  const handleDeleteFileUpload = () => {
    setImageName('');
    formik.setFieldValue('image', null);
    const fileInput = document.getElementById('upload-img') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div>
      <div className="board-header">
        <Header />
      </div>
      <div className="board-create-container">
        <p className="board-create-container__title">자유게시판 작성</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="board-create-container__input-title">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              placeholder="제목을 입력하세요. (공백포함 50자이내)"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.title && formik.touched.title && <p className="warning">{formik.errors.title}</p>}
          </div>
          <div className="board-create-container__input-text-editor">
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
          <div className="board-create-container__input-link">
            <label htmlFor="link">링크</label>
            <input
              type="text"
              id="link"
              placeholder="링크를 입력해주세요."
              name="link"
              value={formik.values.link}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.link && formik.touched.link && <p className="warning">{formik.errors.link}</p>}
          </div>
          <div className="upload">
            <div className="upload-img">
              <input type="file" id="upload-img" name="image" hidden onChange={handleFileChange} />
              <label htmlFor="upload-img">
                <p> 대표이미지 첨부</p>
                <Icon component={ICONS.UPLOAD_ICON} size={IconSize.LG} />
              </label>
            </div>
            <span id="file-chosen">
              {imageName}
              {imageName && (
                <div className="icon-delete-upload" onClick={handleDeleteFileUpload}>
                  <Icon component={ICONS.DELETE_UPLOAD} size={IconSize.LG} />
                </div>
              )}
            </span>
          </div>
          {formik.errors.image && formik.touched.image && <p className="warning">{formik.errors.image}</p>}

          <div className="board-create-container__input__button">
            <button type="submit" className="board-create-container__input__button-submit">
              등록
            </button>
            <button type="button" className="board-create-container__input__button-cancel" onClick={() => navigate('/campain')}>
              취소
            </button>
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
