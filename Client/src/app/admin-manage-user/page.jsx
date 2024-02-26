"use client";

import React, { useEffect } from "react";
import FilterSearch from "@components/FilterSearch";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

const AdminUserPage = () => {
  const [users, setUsers] = useState();
  
  useEffect(() => {
    const token = localStorage.getItem("JWT");
    axios
      .get("http://localhost:8080/api/v1/admin/users", {
          headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        const data = response.data.users;
        const userData = data;

        setUsers(userData);
      }
      )
      .catch((error) => {
        console.error(`Error when call API: ${error}`);
      });
  }, []);

  return (
    <div className="w-full mt-[55px]">
      <div>
        <Link href='\admin-manage-course' className="absolute right-16 text-footer font-semibold text-xl hover:text-primary">Phê duyệt khóa học</Link>
        <FilterSearch title="TẤT CẢ NGƯỜI DÙNG" />
        <div>
          <div className="flex font-semibold pb-2 mb-4 border-b-2 border-black">
            <div className="w-96 pl-10">Tên</div>
            <div className="w-80 pl-10">Username</div>
            <div className="w-96 text-center">Ngày tham gia</div>
            <div className="w-60 text-center">Xem thêm</div>
          </div>

          {users && users.map((user, index) => (
            <div key={index}>
              {
                user != null ?
                (<div key={index} className="flex pb-2 mb-4 border-b border-borderline">
                  <div className="w-96 font-semibold pl-10">{user.fullname}</div>
                  <div className="w-80 pl-10">{user.username}</div>
                  <div className="w-96 text-center">
                    {user.joinedDate.slice(0,10)}
                  </div>
                  <div className="w-60 text-center">
                    <Link
                      href={`/profile/${user._id}`}
                      className="text-primary font-semibold hover:text-blue-300"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>) : (
                  <>
                  </>
                )
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUserPage;
