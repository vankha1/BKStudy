"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@app/contexts/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
import useDebounce from "@utilities/useDebounce";

import Conversation from "./Conversation/Conversation";
import ConverDeatil from "./Conversation/ConverDeatil";

const Navbar = () => {
  const token = localStorage.getItem("JWT")
  const [showMessage, setShowMessage] = useState(false);

  const [showConversation, setShowConversation] = useState(false);
  const [conversation, setConversation] = useState({});
  const [conversations, setConversations] = useState([]);

  const [showNotification, setShowNotification] = useState(false);

  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const { isLogin, setIsLogin } = useAuthContext();
  const [coursesFounded, setCoursesFounded] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const searchData = useDebounce(searchValue, 500);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("userInfo"))
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  }, [isLogin]);

  const handleLogout = () => {
    localStorage.removeItem("JWT");
    localStorage.removeItem("userInfo");
    setIsLogin(false);
    setUserInfo(null);
    router.push("/");
  };

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:8080/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          localStorage.setItem("JWT", resObject.user.token);
          localStorage.setItem("userInfo", JSON.stringify(resObject.user));
          setUserInfo(resObject.user);
          setIsLogin(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  const handleShowOneConversation = (conversation) => {
    setShowMessage(false);
    setShowConversation(true);
    setConversation(conversation);
  };

  const handleClickBackward = () => {
    setShowMessage(true);
    setShowConversation(false);
  };

  const handleShowConversations = () => {
    setShowMessage(!showMessage);
    setShowConversation(false);
    const token = localStorage.getItem("JWT");
    const userId = JSON.parse(localStorage.getItem("userInfo"))._id;

    axios
      .get(`http://localhost:8080/api/v1/conversation/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((conversations) => {
        // dispatch(
        //   conversationInfo({
        //     id: conversations.data._id,
        //     senderId: conversations.data.senderId,
        //     receiverId: conversations.data.receiverId,
        //   })
        // );

        console.log(conversations);
        setConversations(conversations.data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <nav className="fixed z-50 w-full bg-white px-8 py-1 flex-between flex-row border-b border-borderline">
      <Link href="/" className="flex-center flex-row gap-1">
        <Image
          alt="logo"
          src="/assets/icons/bk_logo.svg"
          width={48}
          height={48}
          className=""
        />
        <h2 className="font-semibold text-2xl leading-10">BKStudy</h2>
      </Link>

      <div className="flex-between flex-row relative justify-between w-[400px] h-[35px] border rounded-3xl border-borderline">
        <input
          type="text"
          className="w-full ml-5 outline-none"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <button className="mr-5">
          <Image
            src="/assets/icons/find_icon.svg"
            alt="Search"
            width={20}
            height={20}
          />
        </button>
        {searchData ? (
          <div className="absolute w-full z-50 top-[55px] bg-slate-100 rounded-lg">
            {coursesFounded &&
              coursesFounded.map((course) => (
                <Link
                  key={course._id}
                  href={`coursepage/${course._id}`}
                  className="px-4 py-2 rounded-lg shadow-lg cursor-pointer transfrom-action flex flex-row"
                >
                  <div className="w-[100px] relative h-[60px]">
                    <Image
                      className="rounded-lg py-1"
                      src={"http://localhost:8080/" + course.imageUrl}
                      alt="Courses Picture"
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <div className="pl-4 pt-2 w-[300px]">
                    <h3 className="text-base font-medium">{course.title}</h3>
                    <h3 className="text-base font-normal">
                      Giá tiền: {course.price} vnd
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <></>
        )}
      </div>

      {userInfo?.userType === "STUDENT" || userInfo?.userType === "LECTURER" ? (
        <div className="flex-center flex-row gap-4">
          <div>
            {userInfo?.userType === "STUDENT" ? (
              <Link href="/student-courses" className="">
                <Image
                  src="/assets/icons/book_icon.svg"
                  alt="Course"
                  width={30}
                  height={30}
                />
              </Link>
            ) : (
              <Link href="/lecturer-manage" className="">
                <Image
                  src="/assets/icons/book_icon.svg"
                  alt="Course"
                  width={30}
                  height={30}
                />
              </Link>
            )}
          </div>
          <div className="flex-center">
            <button onClick={handleShowConversations}>
              <Image
                src="/assets/icons/msg_icon.svg"
                alt="Message"
                width={30}
                height={30}
              />
            </button>
            {showMessage && (
              <div className="absolute right-[80px] top-[55px] w-[300px] border border-borderline rounded-[5px] overflow-hidden z-20 bg-white">
                <h2 className="text-[24px] text-center my-[10px] mx-0 font-medium">
                  Tin nhắn
                </h2>
                {conversations?.map((conversation, index) => {
                  return (
                    <Conversation
                      key={index}
                      avatar={
                        conversation.senderId._id === userInfo?._id
                          ? conversation.receiverId.avatar
                          : conversation.senderId.avatar
                      }
                      fullname={
                        conversation.senderId._id === userInfo?._id
                          ? conversation.receiverId.fullname
                          : conversation.senderId.fullname
                      }
                      onclick={() => handleShowOneConversation(conversation)}
                    />
                  );
                })}
              </div>
            )}

            {showConversation && (
              <ConverDeatil
                onClick={handleClickBackward}
                conversation={conversation}
              />
            )}
          </div>
          <div className="flex-center">
            <button onClick={() => setShowNotification(!showNotification)}>
              <Image
                src="/assets/icons/noti_icon.svg"
                alt="Notification icon"
                width={30}
                height={30}
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
          <div className="z-50 flex-center relative">
            <button onClick={() => setShowAvatarDropdown(!showAvatarDropdown)}>
              <Image
                src={
                  userInfo?.avatar
                    ? userInfo?.avatar.includes("https")
                      ? userInfo?.avatar
                      : `http://localhost:8080/${userInfo.avatar}`
                    : "/assets/images/avatar.svg"
                }
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </button>
            {showAvatarDropdown && (
              <div
                id="userDropdown"
                className="z-10 absolute right-0 top-12 border border-slate-200 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-40 flex-center flex-col"
              >
                <ul className="py-2 text-sm text-gray-700 w-full" onClick={() => setShowAvatarDropdown(!showAvatarDropdown)}>
                  <li>
                    <div
                      onClick={() => {
                        router.push("/profile");
                      }}
                      className="px-4 py-2 hover:bg-gray-100 block text-center cursor-pointer"
                    >
                      Trang cá nhân
                    </div>
                  </li>
                  <li>
                    <Link
                      href={`/reset-password`}
                      className="px-4 py-2 hover:bg-gray-100 w-full block text-center"
                    >
                      Đổi mật khẩu
                    </Link>
                  </li>
                </ul>
                <div className="py-1 w-full">
                  <button
                    onClick={() => handleLogout()}
                    className="px-4 py-2 text-sm hover:bg-gray-100 w-full block text-center"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : userInfo?.userType === "ADMIN" ? (
        <div className="items-center">
          <Link
            href="/admin-manage-user"
            className="font-semibold text-lg mr-5"
          >
            Người dùng
          </Link>
          <Link
            href="admin-manage-course"
            className="font-semibold text-lg mr-5"
          >
            Phê duyệt
          </Link>
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
    </nav>
  );
};

export default Navbar;
