import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Dropdown from './dropDown';

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditorInApp = ({ charLimit, text }) => {
  const [tags, setTags] = useState(null);
  const options = ["[Tenant’s First Name]", "[Tenant’s Full Name]", "[Tenant’s Address]", "[Rent Due]", "[Rent Start Date]", "[Rent Due Date]", "[Property Type]", "[Property Manager’s Name]", "[Property Manager’s Business Name]", "[Property Manager’s Phone Number]", "[Property Manager’s Email]", "[Bank Name]", "[Bank Account Number]", "[Bank Account Name]"];
  const [editorHtml, setEditorHtml] = useState(text);
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
      <div className='flex flex-col md:flex-row items-center gap-2 w-full'>
      <div className='w-full md:w-[850px]'>
          <Dropdown
            options={options}
            onSelect={(option) => setTags(option)}
            className={"text-[14px] font-[500] text-GrayHomz2"}
            width={"w-full"}
          />
        </div>
        <div className="mt-2 w-full text-right text-GrayHomz2 text-[11px] text-[400]">{charLeft} characters left</div>
      </div>
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
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
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
