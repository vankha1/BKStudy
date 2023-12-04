"use client"; // This is a client component
import React, { useState, useRef } from 'react'

import UploadImage from '@components/UploadFile'
import DragDropFile from './DragDropFile';

const AddActions = ({ infos, infoCourse, setInfoCourse, handlGetDataForAPI, router, path }) => {

    const [isEditing, setIsEditing] = useState(true);
    const [newData, setNewData] = useState([infos]);
    const [image, setImage] = useState();
    const [videoURL, setVideoURL] = useState('');

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

    const handleVideoURL = (value) => {
        setVideoURL(value);
    }

    const handleGetVideoURL = () => {

    }

    const handleValueObj = () => {
        const updatedInfoCourse = { ...infoCourse };
        let index = 0;
        for (let [key, value] of Object.entries(updatedInfoCourse)) {
            updatedInfoCourse[key] = infos[index++].data || value;
        }
        handlGetDataForAPI(updatedInfoCourse)
    }


    return (
        <div className='flex-wrap'>
            {
                Array.isArray(infos) && infos.map((info, index) => (
                    <div key={info._id} className={info.className}>
                        <div className={info.title_className}>{info.title}</div>
                        <textarea
                            type='text'
                            className={`${info.input_className} rounded-lg resize-none`}
                            placeholder={info.placeholders}
                            value={info.value}
                            onChange={(e) => {
                                handleInputChange(e.target.value, index);
                            }}
                        />
                    </div>
                ))
            }
            <h1>Drag fileeeee</h1>
            <DragDropFile />
        </div>
    );
}

export default AddActions