import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditorInApp = ({ charLimit }) => {
  const [editorHtml, setEditorHtml] = useState('Lorem ipsum dolor sit amet consectetur. Massa lectus nulla proin morbi id. Lectus nulla turpis vel ultricies pretium dictumst amet lectus nulla. Enim quis urna lacus in blandit arcu eget erat amet. Arcu massa ultricies tristique tellus at pretium hendrerit vivamus. Risus adipiscing dis semper senectus vitae sed turpis sed est. Nunc est diam et magna lorem nec fermentum donec risus. Viverra sed ut id eros lobortis sed eros non elit.');
  const [charCount, setCharCount] = useState(0);

  const handleChange = (html) => {
    const text = html.replace(/<[^>]+>/g, ''); // Remove HTML tags
    const currentCharCount = text.length;

    if (currentCharCount <= charLimit) {
      setEditorHtml(html);
      setCharCount(currentCharCount);
    }
  };

  const handleKeyDown = (event) => {
    const text = editorHtml.replace(/<[^>]+>/g, ''); // Remove HTML tags
    if (text.length >= charLimit && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = (event.clipboardData || window.clipboardData).getData('Text');
    const text = editorHtml.replace(/<[^>]+>/g, ''); // Remove HTML tags
    if (text.length + clipboardData.length <= charLimit) {
      setEditorHtml(editorHtml + clipboardData);
      setCharCount(text.length + clipboardData.length);
    } else {
      const allowedText = clipboardData.slice(0, charLimit - text.length);
      setEditorHtml(editorHtml + allowedText);
      setCharCount(charLimit);
    }
  };

  useEffect(() => {
    // Move the toolbar to the bottom after the component mounts
    const toolbar = document.querySelector('.ql-toolbar');
    const editor = document.querySelector('.ql-container');
    if (toolbar && editor) {
      editor.parentNode.appendChild(toolbar);
    }

    const editorElement = document.querySelector('.ql-editor');
    if (editorElement) {
      editorElement.addEventListener('keydown', handleKeyDown);
      editorElement.addEventListener('paste', handlePaste);
    }

    return () => {
      if (editorElement) {
        editorElement.removeEventListener('keydown', handleKeyDown);
        editorElement.removeEventListener('paste', handlePaste);
      }
    };
  }, [editorHtml, charLimit]);

  const charLeft = charLimit - charCount;

  return (
    <div className='text-[14px] text-[400] text-GrayHomz'>
      <div className='custom-editor'>
        <ReactQuill
          value={editorHtml}
          onChange={handleChange}
          modules={RichTextEditorInApp.modules}
          formats={RichTextEditorInApp.formats}
          placeholder="Write your preferred reminder message..."
        />
      </div>
      <div className="mt-2 w-full text-right text-GrayHomz2 text-[11px] text-[400]">{charLeft} characters left</div>
    </div>
  );
};

RichTextEditorInApp.propTypes = {
  charLimit: PropTypes.number.isRequired,
  borderColor: PropTypes.string
};

RichTextEditorInApp.modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link']
  ],
};

RichTextEditorInApp.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline',
  'list', 'bullet',
  'link'
];

export default RichTextEditorInApp;
