"use client"; // This is a client component
import React, { useState } from 'react';

function EditData({ infos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState([infos]);

  const USER_INFO = [
    {
      title: 'Họ tên',
      data: 'Nguyễn Văn A'
    },
    {
      title: 'Ngày tháng năm sinh',
      data: '20/12/2000'
    },
    {
      title: 'Số điện thoại',
      data: '0123456789'
    }
  ]

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (value, index) => {
    const updatedInfo = [...infos];
    updatedInfo[index].data = value;
    setNewData(updatedInfo);
  };

  return (
    <div>
      {USER_INFO.map((info, index) => (
        <div key={index} className='mb-4'>
          <h4 className='text-lg font-medium mb-1'>{info.title}</h4>
          {isEditing ? (
            <input
              type='text'
              className='text-base font-normal border border-solid border-gray-300 p-1'
              value={info.data}
              onChange={(e) => handleInputChange(e.target.value, index)}
            />
          ) : (
            <input
              type="text"
              className='text-base font-normal p-[0.3125rem] bg-white'
              value={info.data}
              disabled
            />
          )}
        </div>
      ))}
      {isEditing ? (
        <button
          className='w-44 px-4 py-2 rounded-3xl border border-solid border-gray-300'
          onClick={handleSaveClick}
        >
          Lưu
        </button>
      ) : (
        <button
          className='w-44 px-4 py-2 rounded-3xl border border-solid border-gray-300'
          onClick={handleEditClick}
        >
          Chỉnh sửa thông tin
        </button>
      )}
    </div>
  );
}

export default EditData;
