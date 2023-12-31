"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@app/contexts/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
import useDebounce from "@utilities/useDebounce";

const Navbar = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { isLogin, setIsLogin, SERVER_URL } = useAuthContext();
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
          console.log(resObject);
          setUserInfo(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!searchData.trim()) {
      setCoursesFounded([]);
      return;
    }
    const token = localStorage.getItem("JWT");
    axios
      .get(
        "http://localhost:8080" + `/api/v1/course/search?title=${searchData}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setCoursesFounded(response.data.courses);
        console.log(response);
      })
      .catch((error) => {
        console.error(`Error when call API: ${error}`);
      });
  }, [searchData]);

  return (
    <nav className="px-8 py-1 flex-between flex-row border-b border-borderline">
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

      {userInfo ? (
        <div className="flex-center flex-row gap-4">
          {!userInfo.isAdmin ? (
            <div className="flex-center flex-row gap-4">
              <div>
                {userInfo.userType === "STUDENT" ? (
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
                <button onClick={() => setShowMessage(!showMessage)}>
                  <Image
                    src="/assets/icons/msg_icon.svg"
                    alt="Message"
                    width={30}
                    height={30}
                  />
                </button>
                {showMessage && (
                  <div className="absolute right-[80px] top-[55px] w-[300px] border border-borderline rounded-[10px] overflow-hidden z-20 bg-white">
                    <h2 className="text-[24px] text-center my-[10px] mx-0 font-medium">
                      Tin nhắn
                    </h2>
                    <ul className="navbar__user-message-list">
                      <li className="flex items-center border-t border-borderline h-[60px] hover:cursor-pointer hover:bg-[#cacaca]">
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
                          <h2 className="font-semibold text-base">
                            Nguyễn Văn A
                          </h2>
                          <h3 className="text-sm">
                            Thông báo về việc có một gì đó ...
                          </h3>
                        </div>
                      </li>
                    </ul>
                  </div>
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
                  <div className="absolute right-[80px] top-[55px] bg-white z-30">
                    <ul className="border border-[#cacaca] rounded-[10px] overflow-hidden">
                      <li className="flex items-center justify-between top-[80px] right-[80px] w-[300px] py-[5px] px-[10px] border-b border-[#cacaca] last:border-b-0">
                        <span>
                          <h2 className="text-base font-semibold">
                            Giải tích 1
                          </h2>
                          <h3 className="text-xs">
                            Giải tích 1 đã thêm bài giảng mới
                          </h3>
                        </span>
                        <span className="text-xs">2 giờ trước</span>
                      </li>
                      <li className="flex items-center justify-between top-[80px] right-[80px] w-[300px] py-[5px] px-[10px] border-b border-[#cacaca] last:border-b-0">
                        <span>
                          <h2 className="text-base font-semibold">
                            Giải tích 1
                          </h2>
                          <h3 className="text-xs">
                            Giải tích 1 đã thêm bài giảng mới
                          </h3>
                        </span>
                        <span className="text-xs">2 giờ trước</span>
                      </li>
                      <li className="flex items-center justify-between top-[80px] right-[80px] w-[300px] py-[5px] px-[10px] border-b border-[#cacaca] last:border-b-0">
                        <span>
                          <h2 className="text-base font-semibold">
                            Giải tích 1
                          </h2>
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
            </div>
          ) : (
            ""
          )}
          <div className="z-50 flex-center relative">
            <button onClick={() => {setShowAvatarDropdown(!showAvatarDropdown)}}>
              <Image
                src={
                  userInfo.avatar
                    ? userInfo.avatar.includes("https")
                      ? userInfo.avatar
                      : `${SERVER_URL}/${userInfo.avatar}`
                    : "/assets/images/avatar.svg"
                }
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </button>
            
              <div
                className={showAvatarDropdown ? ("hidden-action") : ("z-30 absolute right-0 top-12 border border-slate-200 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-40 flex-center flex-col")}
              >
                <ul className="py-2 text-sm text-gray-700 w-full">
                  <li>
                    <div
                      onClick={() => {
                        setShowAvatarDropdown(!showAvatarDropdown);
                        router.push("/profile");
                      }}
                      className="px-4 py-2 hover:bg-gray-100 block text-center cursor-pointer"
                    >
                      Trang cá nhân
                    </div>
                  </li>
                  
                </ul>
                <div className="py-1 w-full">
                  <button
                    onClick={() => {setShowAvatarDropdown(!showAvatarDropdown); handleLogout()}}
                    className="px-4 py-2 text-sm hover:bg-gray-100 w-full block text-center"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
          
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

      <div className="flex items-center hidden">
        <Link href="/admin-manage-user" className="font-semibold text-lg mr-5">
          Người dùng
        </Link>
        <Link href="admin-manage-course" className="font-semibold text-lg mr-5">
          Phê duyệt
        </Link>
        <div>
          <Image
            src="/assets/avatar.png"
            alt="Avatar"
            width={48}
            height={48}
            className="w-[40px] my-0 mx-[10px] rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
