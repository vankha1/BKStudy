"use client"; // This is a client component
import { useRef } from 'react';

const UploadFile = ({ title, className, fileType, onFileSelected }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileUrl = e.target.result;
        onFileSelected(fileUrl);
      };
      reader.readAsDataURL(selectedFile);
    };
  };

    return (
      <>
        <button className={className} onClick={handleFileUpload}>{title}</button>
        <input
          type="file"
          accept={`${fileType}/*`}
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileSelected}
        />
      </>
    )
  }

  export default UploadFile