"use client"; // This is a client component
import React, { useState, useRef } from 'react'

import UploadImage from '@components/UploadFile'

const AddActions = ({ infos, infoCourse, setInfoCourse, hanleCourse }) => {

    const [isEditing, setIsEditing] = useState(true);
    const [newData, setNewData] = useState([infos]);
    const [image, setImage] = useState();

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const handleInputChange = (value, index) => {
        const updatedInfo = [...infos];
        updatedInfo[index].data = value;
        setNewData(updatedInfo);
    };

    const handleImage = (fileUrl, selectedFile) => {
        setImage(selectedFile);
    }

    const handleValueObj = () => {
        const updatedInfoCourse = { ...infoCourse };    
        let index = 0;
        for (let [key, value] of Object.entries(updatedInfoCourse)) {
            updatedInfoCourse[key] = infos[index++].data || value;
        }
        hanleCourse(JSON.stringify(updatedInfoCourse))
    }
    

    return (
        <div className='flex flex-wrap'>
            {infos.map((info, index) => (
                <div key={index} className={info.className}>
                    <h4 className='text-lg font-normal mb-1'>{info.title}</h4>
                    {isEditing ? (
                        <>
                            {
                                info.button_title ? (
                                    <div className='flex-between'>
                                        <textarea
                                            type='text'
                                            className={`${info.input_className} resize-none`}
                                            placeholder={info.placeholders}
                                            value={image ? image.name : info.data}
                                            disabled
                                        />
                                        <UploadImage
                                            title={info.button_title}
                                            className='py-2 px-4 ml-8 small-blue-button'
                                            fileType={info.fileType}
                                            onFileSelected={(fileUrl, selectedFile) => {
                                                handleImage(fileUrl, selectedFile);
                                                handleInputChange(selectedFile, index);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <textarea
                                        type='text'
                                        className={`${info.input_className} resize-none`}
                                        placeholder={info.placeholders}
                                        value={info.data}
                                        onChange={(e) => handleInputChange(e.target.value, index)}
                                    />
                                )
                            }
                        </>
                    ) : (
                        <>
                            {
                                info.button_title ? (
                                    <div className='flex-between'>
                                        <textarea
                                            type='text'
                                            className={`${info.input_className} resize-none`}
                                            placeholder={info.placeholders}
                                            value={info.data}
                                            disabled
                                        />
                                        <UploadImage title={info.button_title} className='py-2 px-4 ml-8 small-blue-button' fileType={info.fileType} />
                                    </div>
                                ) : (
                                    <textarea
                                        type='text'
                                        className={`${info.input_className} resize-none`}
                                        placeholder={info.placeholders}
                                        value={info.data}
                                        disabled
                                    />
                                )
                            }
                        </>
                    )}
                </div>
            ))}
            <div className='flex-between w-full mb-8'>
                <button className='small-gray-button'>Hủy</button>
                <button
                    className='small-blue-button'
                    onClick={() => {
                        handleSaveClick();
                        handleValueObj();
                    }}
                >
                    Xác nhận
                </button>
            </div>
        </div>
    );
}

export default AddActions