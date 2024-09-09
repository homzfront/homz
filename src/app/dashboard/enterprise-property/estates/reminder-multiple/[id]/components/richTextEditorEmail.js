import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/autoresize';
import 'tinymce/skins/ui/oxide/skin.min.css';
import Dropdown from './dropDown';

const TinyMCE = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), {
  ssr: false,
  loading: () => <p>Loading editor...</p>  
});

const decodeHtmlEntities = (html) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  return textarea.value;
};

const RichTextEditorEmail = ({ charLimit, text, setEditorHtml, editorHtml }) => {
  const [charCount, setCharCount] = useState(decodeHtmlEntities(text).replace(/<[^>]+>/g, '').length);

  useEffect(() => {
    setEditorHtml(decodeHtmlEntities(text));
  }, [text, setEditorHtml]);

  const options = [
    "[Tenant’s First Name]",
    "[Tenant’s Full Name]",
    "[Tenant’s Address]",
    "[Due Date]",
    "[New Due Date]",
    "[New Start Date]",
    "[Property Manager’s Name]",
    "[Bank Name]",
    "[Bank Account Number]",
    "[Bank Account Name]",
    "[Property Manager’s Business Name]",
    "[Property Manager’s Business Email]",
    "[Property Manager’s Business Address]",
    "[Property Manager’s Business Logo]",
    "[Property Manager’s Business Phone Number]",
    "[Property Description]",
    "[PROPERTY DESCRIPTION]",
    "[PROPERTY ADDRESS]"
  ];

  const handleEditorChange = (content) => {
    const plainText = content.replace(/<[^>]+>/g, '');
    const currentCharCount = plainText.length;
    if (currentCharCount <= charLimit) {
      setEditorHtml(content);
      setCharCount(currentCharCount);
    }
  };

  const handleTagSelect = (tag) => {
    const charLeft = charLimit - charCount;
    if (tag.length <= charLeft) {
      setEditorHtml((prevHtml) => prevHtml + tag);
      setCharCount((prevCount) => prevCount + tag.length);
    }
  };

  const charLeft = charLimit - charCount;

  return (
    <div className='text-[14px] text-[400] text-GrayHomz'>
      <div className='custom-editor'>
        <TinyMCE
          value={editorHtml}
          init={{
            height: 500,
            menubar: false,
            plugins: ['link', 'lists', 'paste', 'autoresize'],
            toolbar: 'undo redo | bold italic underline | bullist numlist | link',
            paste_data_images: false,
            branding: false,
          }}
          onEditorChange={handleEditorChange}
        />
      </div>
      <div className='flex flex-col md:flex-row items-center gap-2 w-full'>
        <div className='w-full md:w-[75%]'>
          <Dropdown
            options={options}
            onSelect={handleTagSelect}
            className={"text-[14px] font-[500] text-GrayHomz2"}
            width={"w-full"}
          />
        </div>
        <div className="mt-2 w-full md:w-[25%] text-right text-GrayHomz2 text-[11px] text-[400]">
          {charLeft} characters left
        </div>
      </div>
    </div>
  );
};

RichTextEditorEmail.propTypes = {
  charLimit: PropTypes.number.isRequired,
  text: PropTypes.string,
  setEditorHtml: PropTypes.func.isRequired,
  editorHtml: PropTypes.string.isRequired,
};

export default RichTextEditorEmail;
