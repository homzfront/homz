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

// Dynamically load TinyMCE to avoid server-side rendering issues in Next.js
const TinyMCE = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
});

// Function to decode HTML entities (if any) in incoming data
const decodeHtmlEntities = (html) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  return textarea.value;
};

const RichTextEditorEmail = ({ charLimit, text, setEditorHtml, editorHtml }) => {
  const [charCount, setCharCount] = useState(0); // Track the character count of the editor content

  // Initialize editor content and character count when `text` prop changes
  useEffect(() => {
    const decodedText = decodeHtmlEntities(text);
    setEditorHtml(decodedText);
    setCharCount(decodedText.replace(/<[^>]+>/g, '').length);
  }, [text, setEditorHtml]);

  const options = [
    "[Tenant’s First Name]", "[Tenant’s Full Name]", "[Tenant’s Address]", "[Due Date]",
    "[New Due Date]", "[New Start Date]", "[Property Manager’s Name]", "[Bank Name]",
    "[Bank Account Number]", "[Bank Account Name]", "[Property Manager’s Business Name]",
    "[Property Manager’s Business Email]", "[Property Manager’s Business Address]",
    "[Property Manager’s Business Logo]", "[Property Manager’s Business Phone Number]",
    "[Property Description]", "[PROPERTY DESCRIPTION]", "[PROPERTY ADDRESS]"
  ];

  // Handle editor content changes, including enforcing character limit
  const handleEditorChange = (content) => {
    const plainText = content.replace(/<[^>]+>/g, ''); // Remove HTML tags to count characters accurately
    const currentCharCount = plainText.length;

    // Only update if within the character limit
    if (currentCharCount <= charLimit) {
      setEditorHtml(content);
      setCharCount(currentCharCount);
    }
  };

  // Handle the insertion of selected tag into the editor
  const handleTagSelect = (tag) => {
    const charLeft = charLimit - charCount;

    // Ensure tag fits within the remaining character limit
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
            branding: false,
            paste_data_images: false,
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

// Prop validation for the component
RichTextEditorEmail.propTypes = {
  charLimit: PropTypes.number.isRequired, // Maximum number of characters allowed
  text: PropTypes.string, // Initial text content
  setEditorHtml: PropTypes.func.isRequired, // Function to update the parent component's state
  editorHtml: PropTypes.string.isRequired, // The editor's current HTML content
};

export default RichTextEditorEmail;