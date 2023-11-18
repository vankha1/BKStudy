"use client";
import Image from "next/image";
import { useState } from "react";

const AdminCourseCard = ({ tittle, author, image, price, description }) => {
  const [showAccept, setShowAccept] = useState(false);
  const [showReject, setShowReject] = useState(false);

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
          {!showAccept && !showReject && (
            <div className="flex justify-end">
              <button
                className="small-blue-button mx-5"
                onClick={() => setShowAccept(!showAccept)}
              >
                Phê duyệt
              </button>
              <button
                className="small-gray-button"
                onClick={() => setShowReject(!showReject)}
              >
                Từ chối
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
          {showReject && (
            <Image
              src="/assets/icons/reject_icon.svg"
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
