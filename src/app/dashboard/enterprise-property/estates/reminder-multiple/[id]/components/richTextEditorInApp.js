import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Dropdown from './dropDown';
import { FaCheck } from 'react-icons/fa';

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// Helper function to decode HTML entities
const decodeHtmlEntities = (html) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  return textarea.value;
};

const RichTextEditorInApp = ({ charLimit, text, editorHtml, setEditorHtml }) => {
  // Decode the initial text to ensure it's clean
  const [charCount, setCharCount] = useState(decodeHtmlEntities(text).replace(/<[^>]+>/g, '').length);
  const [showCopiedNotification, setShowCopiedNotification] = useState(false);
  const notificationTimeoutRef = useRef(null);

  useEffect(() => {
    // Decode and set the initial editorHtml to clean up any encoded HTML entities
    setEditorHtml(decodeHtmlEntities(text));
  }, [text, setEditorHtml]);

  const options = [
    "[Tenant's First Name]",
    "[Tenant's Full Name]",
    "[Tenant's Address]",
    "[Due Date]",
    "[New Due Date]",
    "[New Start Date]",
    "[Property Manager's Name]",
    "[Bank Name]",
    "[Bank Account Number]",
    "[Bank Account Name]",
    "[Property Manager's Business Name]",
    "[Property Manager's Business Email]",
    "[Property Manager's Business Address]",
    "[Property Manager's Business Logo]",
    "[Property Manager's Business Phone Number]",
    "[Property Description]",
    "[PROPERTY DESCRIPTION]",
    "[PROPERTY ADDRESS]",
    "[Rent Amount in Figures]"
  ];

  const handleChange = (html) => {
    const text = html.replace(/<[^>]+>/g, '');
    const currentCharCount = text.length;
    if (currentCharCount <= charLimit) {
      setEditorHtml(html);
      setCharCount(currentCharCount);
    }
  };

  const handleKeyDown = (event) => {
    const plainText = editorHtml.replace(/<[^>]+>/g, '');
    if (plainText.length >= charLimit && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
      event.preventDefault();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = (event.clipboardData || window.clipboardData).getData('Text');
    const plainText = editorHtml.replace(/<[^>]+>/g, '');
    if (plainText.length + clipboardData.length <= charLimit) {
      setEditorHtml(editorHtml + clipboardData);
      setCharCount(plainText.length + clipboardData.length);
    } else {
      const allowedText = clipboardData.slice(0, charLimit - plainText.length);
      setEditorHtml(editorHtml + allowedText);
      setCharCount(charLimit);
    }
  };

  const handleTagSelect = (tag) => {
    // Copy the tag to clipboard
    navigator.clipboard.writeText(tag)
      .then(() => {
        // Show notification
        setShowCopiedNotification(true);

        // Clear any existing timeout
        if (notificationTimeoutRef.current) {
          clearTimeout(notificationTimeoutRef.current);
        }

        // Hide notification after 2 seconds
        notificationTimeoutRef.current = setTimeout(() => {
          setShowCopiedNotification(false);
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy tag: ', err);
      });
  };

  useEffect(() => {
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
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, [editorHtml, charLimit]);

  const charLeft = charLimit - charCount;

  return (
    <div className='text-[14px] text-[400] text-GrayHomz relative'>
      <div className='custom-editor'>
        <ReactQuill
          value={editorHtml}
          onChange={handleChange}
          modules={RichTextEditorInApp.modules}
          formats={RichTextEditorInApp.formats}
          placeholder="Write your preferred reminder message..."
        />
        {/* Copied notification */}
        {!showCopiedNotification && (
          <div className="absolute bottom-[5px] right-0 flex items-center bg-green-500 text-white px-4 py-2 rounded-md shadow-lg animate-fade-in-out z-50">
            <FaCheck className="mr-2" />
            Copied to clipboard!
          </div>
        )}
      </div>
      <div className='flex flex-col md:flex-row items-center gap-2 w-full mt-2'>
        <div className='w-full md:w-[75%]'>
          <Dropdown
            options={options}
            onSelect={handleTagSelect}
            className={"text-[14px] font-[500] text-GrayHomz2"}
            width={"w-full"}
          />
        </div>
        <div className="w-full md:w-[25%] text-right text-GrayHomz2 text-[11px] text-[400]">
          {charLeft} characters left
        </div>
      </div>
    </div>
  );
};

RichTextEditorInApp.propTypes = {
  charLimit: PropTypes.number.isRequired,
  text: PropTypes.string,
  editorHtml: PropTypes.string.isRequired,
  setEditorHtml: PropTypes.func.isRequired,
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