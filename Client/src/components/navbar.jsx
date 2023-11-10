"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showUserOption, setShowUserOption] = useState(false);

  return (
    <div className="navbar flex justify-around items-center content-center border border-b-border h-14">
      <Link href="/" className="logo flex">
        <Image
          alt="logo"
          src="/assets/logo.png"
          width={50}
          height={50}
          className="w-8 h-8 relative top-1"
        />
        <h2 className="font-semibold text-2xl leading-10">BKStudy</h2>
      </Link>

      <div className="searchbar flex justify-between w-96 h-9 border rounded-3xl border-border">
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

      <div className="log">
        <Link href="/login">
          <button className="small-primary-button w-28 h-9 rounded-3xl mx-2">
            Đăng nhập
          </button>
        </Link>
        <Link href="/signup">
          <button className="small-secondary-button w-28 h-9 rounded-3xl mx-2">
            Đăng ký
          </button>
        </Link>
      </div>

      <div className="user-choice flex mt-8 hidden">
        <div>
          <Link href="/" className="block mx-2 -my-0.5">
            <Image
              src="/assets/course.png"
              alt="Course"
              width={48}
              height={48}
              className="w-7 cursor-pointer"
            />
          </Link>
        </div>
        <div className="message">
          <button className="mx-2" onClick={() => setShowMessage(!showMessage)}>
            <Image
              src="/assets/message.png"
              alt="Message"
              width={48}
              height={48}
              className="w-6 cursor-pointer"
            />
          </button>
          {showMessage && (
            <div className="absolute right-20 top-14 w-80 border border-border rounded-xl overflow-hidden z-20 bg-white">
              <h2 className="text-2xl text-center my-2 font-medium">
                Tin nhắn
              </h2>
              <ul className="navbar__user-message-list">
                <li className="flex items-center border-t border-border h-14 hover:cursor-pointer hover:bg-border">
                  <div>
                    <Image
                      src="/assets/avatar.png"
                      alt="Avatar"
                      width={48}
                      height={48}
                      className="w-10 mx-3 rounded-full"
                    />
                  </div>
                  <div className="mx-3">
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
            <div className="absolute right-20 top-14 z-2 bg-white z-30 rounded-xl border border-border overflow-hidden">
              <ul>
                <li className="flex items-center justify-between top-20 right-20 w-72 py-1 px-2 border-b border-border hover:cursor-pointer hover:bg-border">
                  <span>
                    <h2 className="text-base font-semibold">Giải tích 1</h2>
                    <h3 className="text-xs">
                      Giải tích 1 đã thêm bài giảng mới
                    </h3>
                  </span>
                  <span className="text-xs">2 giờ trước</span>
                </li>
                <li className="flex items-center justify-between top-20 right-20 w-72 py-1 px-2 border-b border-border hover:cursor-pointer hover:bg-border">
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
        <div className="user relative -top-2.5 -right-2.5">
          <button onClick={() => setShowUserOption(!showUserOption)}>
            <Image
              src="/assets/avatar.png"
              alt="Avatar"
              width={48}
              height={48}
              className="w-11 mb-1 ml-2 cursor-pointer rounded-full"
            />
          </button>
          {showUserOption && <div className="absolute right-0 top-12 w-32 border border-border rounded-lg bg-white z-20 overflow-hidden">
            <a
              href="/profile"
              className="block items-center py-1 px-2 hover:bg-border"
            >
              Trang cá nhân
            </a>
            <a
              href="/"
              className="block items-center py-1 px-2 hover:bg-border"
            >
              Đổi mật khẩu
            </a>
            <a
              href="/"
              className="block items-center py-1 px-2 border border-t-border text-gray-500 hover:bg-border"
            >
              Đăng xuất
            </a>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
