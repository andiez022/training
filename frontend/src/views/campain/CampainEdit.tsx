import React, { ChangeEvent, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../announcement/AnnCreate.scss';
import './CampainCreate.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import api from '../../services/apiServices';
import Icon, { ICONS, IconSize } from '../../components/SVG/Icon';

interface FormValues {
  id: string;
  title: string;
  content: string;
  link: string;
  image: File | null;
  image_name: string;
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

const LabEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: dataItem } = useQuery(['campaignItem', id], () => api.data.fetchDataById('campaign', id || ''));
  const [imageName, setImageName] = useState<string>(dataItem?.image_name);

  // ? edit data
  const editData = useMutation((values: any) => api.data.editCampaignData('campaign', values), {
    onSuccess: () => {
      navigate('/campain');
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
      link: '',
      image: null,
      image_name: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required('입력하세요'),
      id: Yup.string().required('입력하세요'),
      content: Yup.string().required('입력하세요'),
      link: Yup.string().required('입력하세요'),
      image: Yup.mixed().required('파일을 선택하세요'),
    }),
    onSubmit: (values) => {
      editData.mutate(values);
    },
  });

  useEffect(() => {
    if (dataItem) {
      setImageName(dataItem.image_name || '');
      formik.setValues({
        id: dataItem.id,
        title: dataItem.title,
        content: dataItem.content,
        link: dataItem.link,
        image: dataItem.image,
        image_name: imageName,
      });
    }
  }, [dataItem]);

  const handleEditorChange = (content: string) => {
    formik.setFieldValue('content', content);
  };
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

          <div className="ann-create-container__input__button">
            <button type="submit" className="ann-create-container__input__button-submit">
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

export default LabEdit;
