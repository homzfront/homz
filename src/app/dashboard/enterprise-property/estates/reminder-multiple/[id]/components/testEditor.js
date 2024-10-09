// // components/TestEditor.js
// import { useEffect, useState } from 'react';
// import mjml2html from 'mjml';

// const TestEditor = ({ mjmlData }) => {
//   const [htmlContent, setHtmlContent] = useState('');

//   useEffect(() => {
//     // Convert MJML to HTML
//     const { html } = mjml2html(mjmlData);
//     setHtmlContent(html);
//   }, [mjmlData]);

//   return (
//     <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
//   );
// };

// export default TestEditor;
import React from 'react'

const TestEditor = () => {
  return (
    <div>TestEditor</div>
  )
}

export default TestEditor