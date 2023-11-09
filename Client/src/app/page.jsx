"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";


const HomePage = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("JWT")
      axios
        .get("http://localhost:8080/api/v1/user/profile",{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(async (response) => {
          if (response.statusText == "OK") {
            console.log(response);
            localStorage.setItem("userInfo", JSON.stringify(response.data.user))
            console.log(JSON.parse(localStorage.getItem("userInfo")));
          }
        })
        .catch((error) => {
          alert(error);
        });
  }, []);

  return (
    <div className="homepage min-h-[535px]">
      <div className="welcome w-[1000px] h-[200px] bg-[#9ccaff] rounded-[15px] px-[60px] py-[20px] mt-[20px]">
        <h1 className="text-3xl font-bold pb-[50px]">
          Chào mừng đến với BKStudy
        </h1>
        <p className="w-[400px]">
          BKStudy là trang web cung cấp khóa học phù hợp dành riêng cho sinh
          viên Đại học Bách Khoa Thành phố Hồ Chí Minh
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mt-[40px] px-[60px]">
          Khóa học hàng đầu
        </h2>
        <div className="w-[1000px] flex justify-around px-[5px]">
          <Link href="/coursepage" className="mt-[20px]">
            <div className="course">
              <Image
                src="/assets/course_avt.jpg"
                alt="Course"
                width={200}
                height={200}
                className="w-[220px] rounded-[10px] border border-[#cacaca]"
              />
              <div className="flex justify-between px-[10px] my-[5px]">
                <div>
                  <h3 className="font-semibold">DSA</h3>
                  <h2>500.000đ</h2>
                </div>
                <div>
                  <span className="text-yellow-500 font-bold">4.5</span>/
                  <span>5</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/" className="mt-[20px]">
            <div className="course">
              <Image
                src="/assets/course_avt.jpg"
                alt="Course"
                width={200}
                height={200}
                className="w-[220px] rounded-[10px] border border-[#cacaca]"
              />
              <div className="flex justify-between px-[10px] my-[5px]">
                <div>
                  <h3 className="font-semibold">Giải tích 1</h3>
                  <h2>500.000đ</h2>
                </div>
                <div>
                  <span className="text-yellow-500 font-bold">4.5</span>/
                  <span>5</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/" className="mt-[20px]">
            <div className="course">
              <Image
                src="/assets/course_avt.jpg"
                alt="Course"
                width={200}
                height={200}
                className="w-[220px] rounded-[10px] border border-[#cacaca]"
              />
              <div className="flex justify-between px-[10px] my-[5px]">
                <div>
                  <h3 className="font-semibold">Giải tích 1</h3>
                  <h2>500.000đ</h2>
                </div>
                <div>
                  <span className="text-yellow-500 font-bold">4.5</span>/
                  <span>5</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
