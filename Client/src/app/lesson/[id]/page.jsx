"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "@app/contexts/auth";
import Image from "next/image";
import YouTube from "react-youtube";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LessonPage = ({ params }) => {
  const { SERVER_URL } = useAuthContext();
  const [lessonList, setLessonList] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [curLesson, setCurLesson] = useState({});
  const token = localStorage.getItem("JWT");
  const [isDropdown, setIsDropdown] = useState([]);
  const [done, setDone] = useState(false);
  const [note, setNote] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      await axios
        .get(SERVER_URL + `/api/v1/lesson/course/${params?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.statusText === "OK") {
            setLessonList(response.data.chapters);
            setCourseName(response.data.courseName);
            setIsDropdown(new Array(response.data.chapters.length).fill(false));
            console.log(response.data.chapters);
            setCurLesson(response.data.chapters[0].lessons[0].lessonId);
            setDone(true);
          }
        });
    };

    fetchLesson();
  }, []);

  const handleToggleClick = (index) => {
    const newData = [...isDropdown];
    newData[index] = !newData[index];
    setIsDropdown(newData);
  };

  return !done ? (
    <Skeleton />
  ) : (
    <section className="flex-center flex-col p-3 w-[1400px]">
      <p className="font-bold text-3xl mb-3">{courseName}</p>
      <div className="flex-start flex-row gap-2 w-full">
        <div className="border border-border p-3 rounded-lg w-3/12 flex-center flex-col">
          <p className="font-bold text-2xl">Nội dung</p>
          {lessonList.map((chapter, indexChapter) => (
            <div key={indexChapter} className="w-full">
              <div
                className="w-7/8 flex cursor-pointer p-2 hover:bg-slate-100"
                onClick={() => handleToggleClick(indexChapter)}
              >
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
              <div className={isDropdown[indexChapter] ? "hidden-action" : ""}>
                {chapter.lessons.map((lesson, lessonIndex) => (
                  <div
                    onClick={() => {
                      setCurLesson(
                        lessonList[indexChapter].lessons[lessonIndex].lessonId
                      );
                    }}
                    className="flex-start flex-row cursor-pointer p-2 hover:bg-slate-100"
                  >
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
        <div className="border border-border p-3 rounded-lg w-9/12 flex-center flex-col">
          <p className="font-bold text-2xl mb-3">{curLesson.title}</p>
          <iframe width="854" height="480" src="https://www.youtube.com/embed/cikO_P9dH-c?si=BsMl2LfRYEEIZZzU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          <div className="flex-between flex-row w-full py-1 px-3">
            <p>Cập nhật lần cuối: {curLesson.updatedAt}</p>
            <div className="flex-center flex-row gap-2">
                <button className="rounded-lg text-blue-400 hover:bg-slate-100 text-lg p-2 cursor-pointer">Diễn đàn</button>
                <button className="rounded-lg text-blue-400 hover:bg-slate-100 text-lg p-2 cursor-pointer">Ghi chú</button>
                <button className="rounded-lg text-blue-400 hover:bg-slate-100 text-lg p-2 cursor-pointer">Học viên</button>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonPage;
