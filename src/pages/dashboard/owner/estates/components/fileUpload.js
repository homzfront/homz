import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts/1',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setUploadProgress(progress);
          },
        }
      );

      setUploadStatus('success');
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      setUploadStatus('error');
      console.error('Error uploading file:', error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Drag & drop a file here, or click to select a file</p>
      </div>
      {uploadProgress > 0 && (
        <div style={progressBarStyles(uploadStatus)}>
          <div style={{ width: `${uploadProgress}%` }}>{uploadProgress}%</div>
        </div>
      )}
    </div>
  );
};

const dropzoneStyles = {
  border: '1px solid #202020',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

const progressBarStyles = (status) => ({
  marginTop: '10px',
  border: '1px solid',
  borderRadius: '4px',
  height: '20px',
  overflow: 'hidden',
  background: status === 'success' ? '#202020' : status === 'error' ? '#039855' : '#202020',
});

export default FileUpload;
