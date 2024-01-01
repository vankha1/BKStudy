"use client"; // This is a client component
import { useRef, useState } from 'react';

const UploadFile = ({ title, className, fileType, onFileSelected, type='single-file'}) => {
  const fileInputRef = useRef(null);
  const [filesUpload, setFilesUpload] = useState([]);
  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    setFilesUpload([...filesUpload, selectedFile]);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileUrl = e.target.result;
        type === 'single-file' ?  onFileSelected(fileUrl, selectedFile) : onFileSelected(fileUrl, filesUpload)
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