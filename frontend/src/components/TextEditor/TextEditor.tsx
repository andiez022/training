import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';
// import 'ckeditor5/ckeditor5.css';

interface TextEditorProps {
  initialData: string;
  onChange?: (event: any, editor: any) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ initialData, onChange }) => {
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

  return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfig}
      data={initialData}
      onChange={(event, editor) => {
        const data = editor.getData();
        if (onChange) {
          onChange(event, editor);
        }
        console.log({ event, editor, data });
      }}
    />
  );
};

export default TextEditor;
