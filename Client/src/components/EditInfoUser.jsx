import React, { useState } from "react";

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

  const userInforFields = [
    {
      title: "Họ tên",
      data: infos.username,
    },
    {
      title: "Email",
      data: infos.email,
    },
    {
      title: "Ngay tham gia",
      data: infos.joinedDate,
    },
  ];

  return (
    <div>
      {userInforFields.map((info, index) => (
        <div className="mb-4">
          <h4 key={index} className="text-lg font-medium mb-1">
            {info.title}
          </h4>
          {isEditing ? (
            <input
              type="text"
              className="text-base font-normal border border-solid border-gray-300 p-1"
              value={info.data}
              onChange={(e) => handleInputChange(e.target.value, index)}
            />
          ) : (
            <p className="text-base font-normal">{info.data}</p>
          )}
        </div>
      ))}
      {isEditing ? (
        <button
          className="w-44 px-4 py-2 rounded-3xl border border-solid border-gray-300"
          onClick={handleSaveClick}
        >
          Lưu
        </button>
      ) : (
        <button
          className="w-44 px-4 py-2 rounded-3xl border border-solid border-gray-300"
          onClick={handleEditClick}
        >
          Chỉnh sửa thông tin
        </button>
      )}
    </div>
  );
}

export default EditData;
