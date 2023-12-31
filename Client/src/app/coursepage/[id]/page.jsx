"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@app/contexts/auth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import format from "date-fns/format";

const CoursePage = ({ params }) => {
  const [course, setCourse] = useState({});
  const [done, setDone] = useState(false);
  const router = useRouter();
  const { SERVER_URL } = useAuthContext();
  const [isDropdown, setIsDropdown] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      await axios
        .get(SERVER_URL + `/api/v1/course/course-detail/${params?.id}`)
        .then((response) => {
          if (response.statusText === "OK") {
            setCourse(response.data.course);
            setDone(true);
          }
          setIsDropdown(
            new Array(response.data.course.chapters.length).fill(false)
          );
        })
        .catch((error) => {
          alert(error);
        });
    };
    fetchCourse();
  }, [params.id]);

  const handleToggleClick = (index) => {
    const newData = [...isDropdown];
    newData[index] = !newData[index];
    setIsDropdown(newData);
  };

  const handleRegister = () => {
    const token = localStorage.getItem("JWT");
    axios
      .post(
        SERVER_URL + `/api/v1/user/register/${params?.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.statusText === "OK") {
          router.push("/student-courses");
        }
      })
      .catch((error) => alert(error));
  };

  return !done ? (
    <Skeleton />
  ) : (
    <div className="w-[1519px]">
      <div className="w-full h-48 bg-footer text-white px-32 py-3">
        <div className="description w-3/5">
          <h1 className="text-4xl font-bold mb-3">{course.title}</h1>
          <p className="font-semibold mb-5">{course.description}</p>
          <div className="flex mb-1">
            <span className="mr-28">
              <span className="font-medium">Đánh giá: </span>
              <span className="font-semibold text-yellow-500">
                {course.rate}
              </span>
              <span>/5</span>
            </span>
          </div>
          <div className="mb-1">
            <span className="font-light">Giáo viên: </span>
            <Link href="\" className="font-semibold underline ">
              {course.createdBy}
            </Link>
          </div>
          <div className="font-light">
            <span>Cập nhật lần cuối vào: </span>
            <span>{format(new Date(course.updatedAt), "HH:mm:ss dd-MM-yyyy")}</span>
          </div>
        </div>

        <div className="absolute bg-white right-10 top-4 shadow-lg border border-border rounded-2xl text-black">
          <Image
            width={560}
            height={315}
            src={"http://localhost:8080" + `/${course.imageUrl}`}
            className="w-80 h-44 m-auto mb-3 rounded-2xl border border-border"
          />
          <h1 className="font-bold text-center text-3xl mb-3">
            {course.price + " vnd"}
          </h1>
          <div className="flex mb-8">
            <button
              className="m-auto small-primary-button rounded-full w-40 h-12 text-xl"
              onClick={handleRegister}
            >
              Đăng ký học
            </button>
          </div>
          <div className="ml-14 pb-5">
            <div className="flex mb-2">
              <Image
                src="/assets/document.png"
                alt=""
                width={48}
                height={48}
                className="w-6 h-6 mr-4"
              ></Image>
              Tổng số
              <span className="font-semibold mx-1">
                {course.chapters.length}
              </span>
              Chương
            </div>
            <div className="flex mb-2">
              <Image
                src="/assets/video.png"
                alt=""
                width={48}
                height={48}
                className="w-6 h-6 mr-4"
              ></Image>
              Bao gồm
              <span className="font-semibold mx-1"> 20 </span>
              video
            </div>
            <div className="flex mb-2">
              <Image
                src="/assets/clock.png"
                alt=""
                width={20}
                height={20}
                className="w-6 h-6 mr-4"
              ></Image>
              Thời lượng hơn
              <span className="font-semibold mx-1"> 30 </span>
              giờ
            </div>
            <div className="flex mb-2">
              <Image
                src="/assets/cup.png"
                alt=""
                width={48}
                height={48}
                className="w-6 h-6 mr-4"
              ></Image>
              Giấy chứng nhận hoàn thành
            </div>
          </div>
        </div>
      </div>

      <div className="outcome mt-16 ml-32 w-2/5 px-8 py-5 text-black border border-border shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold mb-5">Kết thúc khóa học</h2>
        <div className="flex">
          <div className="mr-12">
            <div className="flex mb-2">
              <Image
                src="/assets/check.png"
                alt=""
                width={25}
                height={20}
              ></Image>
              <p className="ml-2">Hiểu biết về khóa học</p>
            </div>
            <div className="flex mb-2">
              <Image
                src="/assets/check.png"
                alt=""
                width={25}
                height={20}
              ></Image>
              <p className="ml-2">Nhận được tài liệu về khóa học</p>
            </div>
            <div className="flex mb-2">
              <Image
                src="/assets/check.png"
                alt=""
                width={25}
                height={20}
              ></Image>
              <p className="ml-2">Có chứng chỉ về học thuật</p>
            </div>
            <div className="flex mb-2">
              <Image
                src="/assets/check.png"
                alt=""
                width={25}
                height={20}
              ></Image>
              <p className="ml-2">Kết nối với các bạn học khác</p>
            </div>
          </div>

          <div>
            <div className="flex mb-2">
              <Image
                src="/assets/check.png"
                alt=""
                width={25}
                height={20}
              ></Image>
              <p className="ml-2">Giao tiếp với giảng viên</p>
            </div>
            </div>
        </div>
      </div>

      <div className="text-black mt-16 ml-32">
        <h2 className="text-2xl font-semibold mb-5">Nội dung khóa học</h2>
        <div className="w-2/5 border border-border rounded-lg flex-start flex-col shadow-lg">
          {course.chapters.map((chapter, indexChapter) => (
            <div key={indexChapter} className="w-full">
              <div className="w-7/8 flex cursor-pointer p-2 hover:bg-slate-100" onClick={() => handleToggleClick(indexChapter)}>
                <Image
                  className={
                    isDropdown[indexChapter]
                      ? "rotate-right-action"
                      : "rotate-left-action"
                  }
                  src="/assets/icons/downward.svg"
                  alt="Downward"
                  width={30}
                  height={30}
                  priority
                  
                />
                <h3 className="text-xl font-medium p-1">{chapter.name}</h3>
              </div>
              <div
                  className={
                    isDropdown[indexChapter] ? "hidden-action" : ""
                  }
                >
                  {chapter.lessons.map((lesson) => (
                    <div className="flex-start flex-row p-1">
                      <Image 
                        className="ml-5 mr-2 mt-1"
                        src="/assets/icons/video_icon.svg"
                        width={22}
                        height={22}
                      />
                      <p className="text-lg">{lesson.lessonId.title}</p>
                    </div>
                  ))}
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="othercourse w-1/3 text-black mt-16 ml-32">
              <h2 className="text-2xl font-semibold mb-5">Các khóa học khác</h2>
              <div className="w-11/12 flex flex-col justify-around">
            {COURSES.map((course, index) => (
              <Link href={course.href} className="mb-5 transfrom-action">
                <div className="flex course rounded-2xl">
                  <Image src={course.image} alt="Course" width={200} height={200} className="w-32 mr-5 rounded-xl border border-border"/>
                    <div  className="flex justify-between w-72">
                      <div>
                        <h3 className="font-semibold mb-4">{course.course_name}</h3>
                        <h2>{course.price}</h2>
                      </div>
                      <div>
                        <span className="text-yellow-500 font-bold">{course.rate}</span>
                        /
                        <span>5</span>
                      </div>
                    </div>
                  </div>
              </Link>
            ))}
          </div>
          </div> */}
    </div>
  );
};

export default CoursePage;
