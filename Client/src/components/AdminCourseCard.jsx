"use client";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import Notification, { errorNotifi, successNotifi, warningNotifi } from '@components/Notification';
import { useRouter } from "next/navigation"

const AdminCourseCard = ({ _id, tittle, author, image, price, description }) => {
  const [showAccept, setShowAccept] = useState(false);
  const router = useRouter();

  const approveCourse = (courseId) => {
    const token = localStorage.getItem("JWT");
    console.log(`http://localhost:8080/api/v1/admin/course-approve/${courseId}`);
    console.log(token);
    axios
      .post(`http://localhost:8080/api/v1/admin/course-approve/${courseId}`, [] ,{
      headers: {
        Authorization: `Bearer ${token}`
      }
      }).then((response) => {
      if (response.statusText === 'OK') {
        successNotifi('Chấp nhận thành công!.');
      }
      else {
          warningNotifi('Có lỗi xảy ra, thử lại sau!.')
      }
      setTimeout(() => {
          router.push('/admin-manage-course');
      }, 1000);
      }).catch((error) => {
        errorNotifi('Gửi yêu cầu thất bại!.');
      })
  }

  return (
    <div className="w-full px-8 py-4 rounded-lg shadow-lg mb-8 transfrom-action">
      <div className="flex-between">
        <div className="flex-center flex-row w-full ">
          <Image
            src={image}
            width={160}
            height={100}
            alt="Course image"
            className="mr-8"
          />
          <div className="flex-start flex-col gap-1 grow">
            <p className="text-3xl font-bold">{tittle}</p>
            <p className="text-sm">Giáo viên: {author}</p>
            <p className="text-sm">Giá tiền: {price}.000đ</p>
            <p className="text-sm">Mô tả: {description}</p>
          </div>
          {!showAccept && (
            <div className="flex justify-end">
              <button
                className="small-blue-button mx-5"
                onClick={() => {setShowAccept(!showAccept); approveCourse(_id)}}
              >
                Phê duyệt
              </button>
            </div>
          )}
          {showAccept && (
            <Image
              src="/assets/icons/accept_icon.svg"
              width={70}
              height={70}
              className="mr-14"
            ></Image>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCourseCard;
