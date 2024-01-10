"use client"; // This is a client component
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import _ from "lodash";
import UploadFiles from "@components/UploadFile";

const AddActions = ({
  infos,
  infoCourse,
  setInfoCourse,
  handlGetDataForAPI,
  path,
}) => {
  const [isEditing, setIsEditing] = useState(true);
  const [newData, setNewData] = useState([infos]);
  const [image, setImage] = useState([]);
  useEffect(() => {
    if (infos[3]?.data && Symbol.iterator in Object(infos[3].data)) {
      setImage([...infos[3].data]);
    }
  }, [infos[3]?.data]);
  const [multiFiles, setMultiFiles] = useState();

  const [isSettingFile, setIsSettingFile] = useState(false);
  const router = useRouter();
  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (value, index) => {
    const updatedInfo = [...infos];
    updatedInfo[index].data = value;
    setNewData(updatedInfo);
  };

  const handleImage = (fileUrl, selectedFile, type) => {
    if (type == "single-file") {
      setImage(selectedFile);
    } else {
      setImage([...image, selectedFile]);
    }
  };

  const handleValueObj = () => {
    const updatedInfoCourse = { ...infoCourse };
    let index = 0;
    for (let [key, value] of Object.entries(updatedInfoCourse)) {
      updatedInfoCourse[key] = infos[index++].data || value;
    }
    handlGetDataForAPI(updatedInfoCourse);
  };

  const handleDeleteFileName = (fileName, index) => {
    let fileData = [...image];
    fileData = fileData.filter((file) => file.name !== fileName);
    fileData = fileData.filter((file) => file.filename !== fileName);
    setImage(fileData);
    const updatedInfo = [...infos];
    updatedInfo[index].data = fileData;
    setNewData(updatedInfo);
  };

  return (
    <div className="flex flex-wrap">
      {infos.map((info, index) => (
        <div key={index} className={info.className}>
          <h4 className="text-lg font-normal mb-1">{info.title}</h4>
          {info.type == "mutil-file" ? (
            <div className="w-full h-44 text-base font-normal border border-solid p-1 rounded-lg">
              <div className="">
                <div className="flex-between">
                  <div className="opacity-0">!!!</div>
                  <Image
                    src="/assets/icons/setting_icon.svg"
                    className={
                      isSettingFile
                        ? "relative hover:cursor-pointer transform rotate-[60deg] duration-100"
                        : "relative hover:cursor-pointer transform rotate-[0deg] duration-100"
                    }
                    onClick={() => setIsSettingFile(!isSettingFile)}
                    alt="Setting icon"
                    width={20}
                    height={20}
                  />
                  {isSettingFile ? (
                    <div className="absolute right-48 bottom-60 bg-slate-100 rounded-lg">
                      <UploadFiles
                        title={info.button_title}
                        className="w-32 py-1 flex items-center justify-center hover:cursor-pointer hover:bg-slate-200 px-4 rounded-lg"
                        fileType={info.fileType}
                        onFileSelected={(fileUrl, selectedFile, type) => {
                          handleImage(fileUrl, selectedFile, type);
                          handleInputChange([...image, selectedFile], index);
                        }}
                        type={info.type}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex">
                  {image &&
                    image.map((item, indexFile) => (
                      <div
                        key={indexFile}
                        className="w-24 py-2 px-2 rounded-lg bg-gray-200 mx-4 hover:cursor-pointer"
                      >
                        <div className="flex-between">
                          <div className="opacity-0">!!!</div>
                          <Image
                            src="/assets/icons/delete_icon.svg"
                            className="hover:cursor-pointer"
                            alt="Setting icon"
                            width={16}
                            height={16}
                            onClick={() => {
                              handleDeleteFileName(
                                item.name ? item.name : item.filename,
                                index
                              );
                            }}
                          />
                        </div>
                        <div className="px-2">
                          <Image
                            src="/assets/document.png"
                            className="w-16 h-16"
                            alt="Setting icon"
                            width={120}
                            height={100}
                          />
                          <div className="text-sm w-16 h-8 overflow-hidden">
                            {item.name ? item.name : item.filename}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : info.button_title && info.fileType ? (
            <div className="flex-between">
              <textarea
                type="text"
                className={`${info.input_className} resize-none`}
                placeholder={info.placeholders}
                defaultValue={image && info.data ? info.data.name : info.data}
                disabled
              />
              <UploadFiles
                title={info.button_title}
                className="py-2 px-4 ml-8 small-second-button"
                fileType={info.fileType}
                onFileSelected={(fileUrl, selectedFile, type) => {
                  handleImage(fileUrl, selectedFile, type);
                  handleInputChange(selectedFile, index);
                  console.log(info);
                }}
                type={info.type}
              />
            </div>
          ) : (
            <>
              {info.button_title ? (
                <div className="flex-between">
                  <textarea
                    type="text"
                    className={`${info.input_className} resize-none`}
                    placeholder={info.placeholders}
                    defaultValue={info.data}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                  />
                  <button
                    className="py-2 px-4 ml-8 small-second-button"
                    // onClick={handlGetDataForAPI}
                  >
                    {info.button_title}
                  </button>
                </div>
              ) : (
                <textarea
                  type="text"
                  className={`${info.input_className} resize-none`}
                  placeholder={info.placeholders}
                  defaultValue={info.data}
                  onInput={(e) => {
                    handleInputChange(e.target.value, index);
                  }}
                />
              )}
            </>
          )}
        </div>
      ))}
      <div className="flex-between w-full mb-8">
        <button
          className="small-gray-button"
          onClick={() => {
            router.push(path);
          }}
        >
          Hủy
        </button>
        <button
          className="small-blue-button"
          onClick={() => {
            // handleSaveClick();
            handleValueObj();
          }}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default AddActions;
