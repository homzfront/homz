import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditor = () => {
  const [editorHtml, setEditorHtml] = useState('');

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  return (
    <div className=''>
      <ReactQuill
        value={editorHtml}
        onChange={handleChange}
        modules={RichTextEditor.modules}
        formats={RichTextEditor.formats}
        placeholder="Write your preferred reminder message..."
      />
    </div>
  );
};

RichTextEditor.modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
     {'indent': '-1'}, {'indent': '+1'}],
  ],
};

RichTextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
];

export default RichTextEditor;
