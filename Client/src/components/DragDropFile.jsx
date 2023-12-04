'use client';
import React, { useState } from 'react';

const DragDropFile = () => {
    const [images, setImages] = useState([]);

    const handleDrop = (e) => {
        e.preventDefault();

        const files = e.dataTransfer.files;

        // Ensure at least one file is dropped
        if (files.length > 0) {
            const newImages = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                // Ensure the dropped file is an image
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();

                    reader.onload = () => {
                        newImages.push(reader.result);

                        // If all files are processed, update the state
                        if (newImages.length === files.length) {
                            setImages(newImages);
                        }
                    };

                    reader.readAsDataURL(file);
                }
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;

        if (files.length > 0) {
            const newImages = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                // Ensure the selected file is an image
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();

                    reader.onload = () => {
                        newImages.push(reader.result);

                        // If all files are processed, update the state
                        if (newImages.length === files.length) {
                            setImages(newImages);
                        }
                    };

                    reader.readAsDataURL(file);
                }
            }
        }
    };

    return (
        <div>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ width: '300px', height: '300px', border: '2px dashed #ccc', position: 'relative' }}
            >
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div key={index} style={{ width: '100%', height: '100px', marginBottom: '8px', position: 'relative' }}>
                            <img src={image} alt={`Uploaded ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', lineHeight: '300px', margin: '0' }}>Drag and drop images or click to select</p>
                )}
            </div>
            <input
                type="file"
                id="fileInput"
                multiple
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default DragDropFile;
