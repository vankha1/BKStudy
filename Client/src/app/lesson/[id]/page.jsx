"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "@app/contexts/auth";
import Image from "next/image";
import YouTube from "react-youtube";
import { useRouter } from "next/navigation";
import Notification, { warningNotifi, errorNotifi, successNotifi } from "@components/Notification";
import LoadingState from "@components/LoadingState";

const LessonPage = ({ params }) => {
  const { SERVER_URL } = useAuthContext();
  const [lessonList, setLessonList] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [curLesson, setCurLesson] = useState({});
  const [isDropdown, setIsDropdown] = useState([]);
  const [done, setDone] = useState(false);
  const [note, setNote] = useState(false);
  const [noteData, setNoteData] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchLesson = async () => {
      const token = localStorage.getItem("JWT");
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
        })
        .catch((error) => console.log(error));
    };

    fetchLesson();
  }, []);

  const handleToggleClick = (index) => {
    const newData = [...isDropdown];
    newData[index] = !newData[index];
    setIsDropdown(newData);
  };

  const handleDownloadFile = async (path, filename) => {
    const token = localStorage.getItem("JWT");
    const temp = path.split("/");
    const data = temp[temp.length-1];
    await axios.get(SERVER_URL + `/api/v1/lesson/download/${encodeURI(data)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${filename}`);
      document.body.appendChild(link);
      link.click();
    }).catch((error) => {errorNotifi("Có lỗi xảy ra"); console.log(error)})
  }

  const handleNote = async () => {
    const token = localStorage.getItem("JWT");
    await axios
      .put(
        SERVER_URL + `/api/v1/lesson/update-note?courseId=${params?.id}&lessonId=${curLesson._id}`,
        {contents: noteData},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.statusText == "Created") {
          setNoteData(response.data.note);
          successNotifi("Thêm ghi chú thành công");
        }
      })
      .catch((error) => {errorNotifi("Có lỗi xảy ra"); console.log(error)});
  }

  const fetchNoteData = async () => {
    const token = localStorage.getItem("JWT");
    await axios
      .get(
        SERVER_URL + `/api/v1/lesson/course?courseId=${params?.id}&lessonId=${curLesson._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.statusText === "OK") {
          let data = JSON.stringify(response.data.note.contents);
          data = data.slice(1, data.length - 1)
          setNoteData(data);
        }
      })
      .catch((error) => console.log(error));
  };

  return !done ? (
    <LoadingState title="Đang tải" width={40} height={40} />
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
          <iframe
            width="854"
            height="480"
            src={curLesson.videoURL}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <div className="flex-between flex-row w-full py-1 px-3">
            <p className="font-light text-sm">
              Cập nhật lần cuối: {curLesson.updatedAt}
            </p>
            <div className="flex-center flex-row gap-2">
              <button
                onClick={() => {
                  router.push(`/course-info/${params?.id}?forum=true`);
                }}
                className="rounded-lg text-blue-400 hover:bg-slate-100 text-lg p-2 cursor-pointer"
              >
                Diễn đàn
              </button>
              <button
                onClick={async () => {
                  if (note === true) {
                    setNote(!note);
                  }
                  else {
                    await fetchNoteData();
                    setNote(!note);
                  }
                }}
                className="rounded-lg text-blue-400 hover:bg-slate-100 text-lg p-2 cursor-pointer"
              >
                Ghi chú
              </button>
              <button
                onClick={() => {
                  router.push(`/course-info/${params?.id}?forum=false`);
                }}
                className="rounded-lg text-blue-400 hover:bg-slate-100 text-lg p-2 cursor-pointer"
              >
                Học viên
              </button>
            </div>
          </div>
          {note ? (
            <div className="flex-end flex-col my-4 mx-12 w-full gap-2">
              <div className="font-semibold">Ghi chú</div>
              <textarea
                type="text"
                className="w-full h-40 border border-solid border-gray-300 focus:border-gray-300 focus:outline-none pl-2 pt-2 rounded-lg"
                placeholder="Nhập tiêu đề thảo luận"
                defaultValue={noteData}
                onChange={(e) => {
                  setNoteData(e.target.value);
                }}
              />
              <button
                className="small-blue-button"
                onClick={() => {
                  handleNote();
                }}
              >
                Xác nhận
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="w-full">
            <div className="flex-start flex-col mx-3">
              <p className="font-bold text-2xl text-start mb-2">Tài liệu</p>
              {
                curLesson.attachedFiles.map((file) => (
                  <div onClick={() => {{handleDownloadFile(file.filepath, file.filename)}}} key={file._id} className="rounded-md hover:bg-slate-200 cursor-pointer font-semibold p-1">
                    {file.filename}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
};

export default LessonPage;
