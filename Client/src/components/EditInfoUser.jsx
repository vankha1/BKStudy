import React, { useState } from 'react';

function EditData({ infos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState([infos]);

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
      {infos.map((info, index) => (
        info.title !== "Quyền truy cập" ? (
          <div className='mb-4'>
            <h4 key={index} className='text-lg font-medium mb-1'>{info.title}</h4>
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
        ) : (
          <>
          </>
        )
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