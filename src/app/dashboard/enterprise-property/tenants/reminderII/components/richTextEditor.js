import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

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

// Add desired modules and formats
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
