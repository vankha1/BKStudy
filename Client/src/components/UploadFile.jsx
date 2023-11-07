"use client"; // This is a client component
import { useRef } from 'react';

const UploadFile = ({ title, className }) => {
    const fileInputRef = useRef(null);

    const handleFileUpload = () => {
      fileInputRef.current.click();
    };
  
    const handleFileSelected = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target.result;
          const imageElement = document.createElement('img');
          imageElement.src = imageUrl;
          document.body.appendChild(imageElement);
  
          // Call API in here
        };
        reader.readAsDataURL(selectedFile);
      }
    };

    return (
        <>
            <button className={className} onClick={handleFileUpload}>{title}</button>
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileSelected}
            />
        </>
    )
}

export default UploadFile