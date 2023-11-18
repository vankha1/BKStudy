"use client";

import React from "react";
import FilterSearch from "@components/FilterSearch";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const data = [
  {
    fullname: "Nguyễn Văn A",
    username: "nguyenvana",
    joinedDate: "20/10/2023",
  },
  {
    fullname: "Nguyễn Văn A",
    username: "nguyenvana",
    joinedDate: "20/10/2023",
  },
  {
    fullname: "Nguyễn Văn A",
    username: "nguyenvana",
    joinedDate: "20/10/2023",
  },
  {
    fullname: "Nguyễn Văn A",
    username: "nguyenvana",
    joinedDate: "20/10/2023",
  },
  {
    fullname: "Nguyễn Văn A",
    username: "nguyenvana",
    joinedDate: "20/10/2023",
  },
  {
    fullname: "Nguyễn Văn A",
    username: "nguyenvana",
    joinedDate: "20/10/2023",
  },
];

const AdminUserPage = () => {
  const [showApprove, setShowApprove] = useState(false);

  return (
    <div className="w-full">
      <div>
        <FilterSearch title="TẤT CẢ NGƯỜI DÙNG" />
        <div>
          <div className="flex font-semibold pb-2 mb-4 border-b-2 border-black">
            <div className="w-60">Tên</div>
            <div className="w-60">Username</div>
            <div className="w-80">Chi tiết</div>
            <div className="w-48">Xem thêm</div>
            <div>Xóa người dùng</div>
          </div>

          {data.map((student) => (
            <div className="flex pb-2 mb-4 border-b border-borderline">
              <div className="w-60 font-semibold">{student.fullname}</div>
              <div className="w-60">{student.username}</div>
              <div className="w-80">
                Đã tham gia vào ngày {student.joinedDate}
              </div>
              <div className="w-48">
                <Link
                  href="/profile"
                  className="text-primary font-semibold hover:text-blue-300"
                >
                  Xem chi tiết
                </Link>
              </div>
              <div className="w-28 flex justify-center">
                <button
                  className="text-red-600 font-semibold hover:text-red-300"
                  onClick={() => setShowApprove(true)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showApprove && (
        <div className="absolute bg-white top-0 -right-4 w-fit px-5 py-1 border border-borderline rounded-2xl">
          <h1 className="font-semibold">
            Bạn chắc chắn muốn xóa người dùng này?
          </h1>
          <div className="flex mx-16 mt-2">
            <button className="mr-20">
              <Image
                src="/assets/icons/accept_icon.svg"
                width={40}
                height={40}
              ></Image>
            </button>
            <button onClick={() => setShowApprove(false)}>
              <Image
                src="/assets/icons/reject_icon.svg"
                width={40}
                height={40}
              ></Image>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserPage;
