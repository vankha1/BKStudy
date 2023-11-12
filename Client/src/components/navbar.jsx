"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState("");

  // useEffect(() => {
  //   setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  //   setToken(localStorage.getItem("JWT"));
  // }, []);
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
      } catch (error) {
        console.error("Error parsing userInfo:", error);
      }
    }
    const storedToken = localStorage.getItem("JWT");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="mb-5 flex justify-around items-center content-center border border-b-[#cacaca] h-[55px]">
      <Link href="/" className="logo flex w-fit my-[10px] mx-[20px]">
        <Image
          alt="logo"
          src="/assets/logo.png"
          width={50}
          height={50}
          className="w-8 h-8 relative top-1"
        />
        <h2 className="font-semibold text-2xl leading-10">BKStudy</h2>
      </Link>

      <div className="flex justify-between w-[400px] h-[35px] border rounded-[20px] border-[#cecece] overflow-hidden">
        <input
          type="text"
          className="ml-5 outline-none"
          placeholder="Search..."
        />
        <button className="mr-5">
          <Image
            src="/assets/search.png"
            alt="Search"
            width={50}
            height={50}
            className="w-6"
          />
        </button>
      </div>

      {userInfo ? (
        <div className="flex mt-[30px]">
          <div>
            <Link href="/" className="block mx-2 my-[-4px]">
              <Image
                src="/assets/course.png"
                alt="Course"
                width={48}
                height={48}
                className="w-[30px] cursor-pointer"
              />
            </Link>
          </div>
          <div className="message">
            <button
              className="mx-2"
              onClick={() => setShowMessage(!showMessage)}
            >
              <Image
                src="/assets/message.png"
                alt="Message"
                width={48}
                height={48}
                className="w-6 cursor-pointer"
              />
            </button>
            {showMessage && (
              <div className="absolute right-[80px] top-[55px] w-[300px] border border-[#cacaca] rounded-[10px] overflow-hidden z-20 bg-white">
                <h2 className="text-[24px] text-center my-[10px] mx-0 font-medium">
                  Tin nhắn
                </h2>
                <ul className="navbar__user-message-list">
                  <li className="flex items-center border-t border-[#cacaca] h-[60px] hover:cursor-pointer hover:bg-[#cacaca]">
                    <div>
                      <Image
                        src="/assets/avatar.png"
                        alt="Avatar"
                        width={48}
                        height={48}
                        className="w-[40px] my-0 mx-[10px] rounded-full"
                      />
                    </div>
                    <div className="my-0 mx-[10px]">
                      <h2 className="font-semibold text-base">Nguyễn Văn A</h2>
                      <h3 className="text-sm">
                        Thông báo về việc có một gì đó ...
                      </h3>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="notification">
            <button
              className="mx-2"
              onClick={() => setShowNotification(!showNotification)}
            >
              <Image
                src="/assets/notification.png"
                alt="Notification"
                width={48}
                height={48}
                className="w-6 cursor-pointer"
              />
            </button>
            {showNotification && (
              <div className="absolute right-[80px] top-[55px] z-2 bg-white z-30">
                <ul className="border border-[#cacaca] rounded-[10px] overflow-hidden">
                  <li className="flex items-center justify-between top-[80px] right-[80px] w-[300px] py-[5px] px-[10px] border-b border-[#cacaca] last:border-b-0">
                    <span>
                      <h2 className="text-base font-semibold">Giải tích 1</h2>
                      <h3 className="text-xs">
                        Giải tích 1 đã thêm bài giảng mới
                      </h3>
                    </span>
                    <span className="text-xs">2 giờ trước</span>
                  </li>
                  <li className="flex items-center justify-between top-[80px] right-[80px] w-[300px] py-[5px] px-[10px] border-b border-[#cacaca] last:border-b-0">
                    <span>
                      <h2 className="text-base font-semibold">Giải tích 1</h2>
                      <h3 className="text-xs">
                        Giải tích 1 đã thêm bài giảng mới
                      </h3>
                    </span>
                    <span className="text-xs">2 giờ trước</span>
                  </li>
                  <li className="flex items-center justify-between top-[80px] right-[80px] w-[300px] py-[5px] px-[10px] border-b border-[#cacaca] last:border-b-0">
                    <span>
                      <h2 className="text-base font-semibold">Giải tích 1</h2>
                      <h3 className="text-xs">
                        Giải tích 1 đã thêm bài giảng mới
                      </h3>
                    </span>
                    <span className="text-xs">2 giờ trước</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="user relative top-[-10px] right-[-10px]">
            <button>
              <Image
                src={"http://localhost:8080/" + userInfo.avatar}
                alt="Avatar"
                width={48}
                height={48}
                className="w-[45px] mb-1 ml-2 cursor-pointer rounded-full"
              />
            </button>
          </div>
        </div>
      ) : (
        <div className="log">
          <Link href="/login">
            <button className="small-primary-button w-[110px] h-[35px] rounded-3xl mx-[10px]">
              Đăng nhập
            </button>
          </Link>
          <Link href="/signup">
            <button className="small-secondary-button w-[110px] h-[35px] rounded-3xl mx-[10px]">
              Đăng ký
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
