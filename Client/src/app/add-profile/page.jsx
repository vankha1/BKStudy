"use client";

import { useState } from "react";
import UploadFile from "@components/UploadFile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthContext } from "@app/contexts/auth";

const AddProfile = () => {

  const user =  JSON.parse(localStorage.getItem("userInfo"))
  // console.log(user)

  const [userInfo, setUserInfo] = useState({
    filename: "",
    phoneNumber: "",
    fullname: "",
    dateOfBirth: "",
    userType: user?.userType ? user?.userType : ''
  });
  const [imageUrl, setImageUrl] = useState("/assets/images/avatar.svg");
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();
  const { setIsLogin } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();

    const token = user?.token ? user?.token : localStorage.getItem("JWT");
    formData.append("image", imageFile, userInfo.filename);
    formData.append("phoneNumber", userInfo.phoneNumber);
    formData.append("fullname", userInfo.fullname);
    formData.append("dateOfBirth", userInfo.dateOfBirth);
    if (user?.googleId){
      formData.append("userType", userInfo.userType);
    }
    axios
      .post(`http://localhost:8080/api/v1/user/add-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.statusText === "OK") {
          localStorage.setItem(
            "userInfo",
            JSON.stringify(
              response.data.user ? response.data.user : response.user
            )
          );
          setIsLogin(true);
          router.push("/");
        } else console.log(response);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleUploadImage = (fileUrl, file) => {
    setUserInfo({ ...userInfo, filename: file.name });
    setImageUrl(fileUrl);
    setImageFile(file);
  };

  // console.log(userInfo);

  return (
    <section className="w-full flex-center flex-col gap-4">
      <h1 className="font-bold text-3xl">Thông tin cá nhân</h1>
      <div className="flex-center flex-col">
        <p className="font-semibold text-lg">Ảnh đại diện</p>
        <Image
          src={imageUrl}
          width={200}
          height={200}
          alt="Account avatar"
          id="avatar"
        />
        <UploadFile
          title="Chọn ảnh"
          className="border border-slate-400 rounded-lg px-2 py-1 mt-3"
          fileType="image"
          onFileSelected={handleUploadImage}
        />
      </div>
      <form onSubmit={handleSubmit} className="flex-center flex-col">
        <div className="w-full flex-start flex-col mt-1 mb-3">
          <label className="text-xs font-semibold mb-1">Họ và tên</label>
          <input
            type="fullname"
            name="fullname"
            id="fullname"
            value={userInfo.fullname}
            onChange={(e) => {
              setUserInfo({ ...userInfo, fullname: e.target.value });
            }}
            className="input min-w-[20rem]"
            placeholder=""
          />
        </div>
        <div className="w-full flex-start flex-col mt-1 mb-3">
          <label className="text-xs font-semibold mb-1">Ngày sinh</label>
          <input
            type="birth"
            name="birth"
            id="birth"
            value={userInfo.dateOfBirth}
            onChange={(e) => {
              setUserInfo({ ...userInfo, dateOfBirth: e.target.value });
            }}
            className="input min-w-[20rem]"
            placeholder="dd/mm/yyyy"
          />
        </div>
        <div className="w-full flex-start flex-col mt-1 mb-3">
          <label className="text-xs font-semibold mb-1">Số điện thoại</label>
          <input
            type="phone"
            name="phone"
            id="phone"
            value={userInfo.phoneNumber}
            onChange={(e) => {
              setUserInfo({ ...userInfo, phoneNumber: e.target.value });
            }}
            className="input min-w-[20rem]"
            placeholder="xxxxxxxxxx"
          />
        </div>
        {console.log(user?.googleId)}
        {user?.googleId ? (
          <div className="w-full flex-start flex-col mt-1 mb-3">
            <label className="text-xs font-semibold mb-1">Vai trò</label>
            <select
              id="role"
              onChange={(e) => {
                setUserInfo({ ...userInfo, userType: e.target.value });
              }}
              className="input min-w-[20rem] text-sm text-slate-500"
            >
              <option>Chọn vai trò của bạn</option>
              <option value="STUDENT">Sinh viên</option>
              <option value="LECTURER">Giáo viên</option>
            </select>
          </div>
        ) : (
          ""
        )}
        <button
          type="submit"
          disabled={submitting}
          className="big-blue-button mt-6"
        >
          Xác nhận
        </button>
      </form>
    </section>
  );
};

export default AddProfile;
