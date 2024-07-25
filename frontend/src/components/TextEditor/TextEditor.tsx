import React, { useCallback, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Loading from '../Loading/LoadingEditor';

const MyEditor: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const handleEditorChange = (content: string, editor: any) => {
    console.log('Content was updated:', content);
  };
  const removeStatusbarRightContainer = (editor: any) => {
    editor.on('init', () => {
      const statusbarRightContainer = editor.getContainer().querySelector('.tox-statusbar__right-container');
      if (statusbarRightContainer) {
        statusbarRightContainer.remove();
      }
    });
  };
  const handleEditorInit = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div style={{ position: 'relative', height: '300px' }}>
      {loading && <Loading />}
      <Editor
        apiKey="7jxwm4ttr7coefqcrda275k18eiwu99wl53cx0gcoh9qwzje"
        initialValue="<p></p>"
        init={{
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
          },
          
        }}
      />
    </div>
  );
};

export default MyEditor;
