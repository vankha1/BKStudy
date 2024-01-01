"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import _ from "lodash";

import React from "react";

import RenderAccount from "@components/RenderAccount";
import RenderDiscussion from "@components/RenderDiscussion";
import Notification, {
  warningNotifi,
  errorNotifi,
  successNotifi,
} from "@components/Notification";
import LoadingState from "@components/LoadingState";
import { useSearchParams } from "next/navigation";

const CourseInfoPage = ({ params }) => {
  const searchParams = useSearchParams();
  const isForum = searchParams.get("forum");
  const [buttonStates, setButtonStates] = useState(
    isForum==="true" ? [false, true] : [true, false]
  );
  const [listUsers, setListUsers] = useState([]);
  const [titelCourse, setTitleCourse] = useState("");
  const router = useRouter();
  const [discussions, setDiscussions] = useState();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {const token = localStorage.getItem("JWT");
    await axios
      .get("http://localhost:8080" + `/api/v1/discussion/${params?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((responses) => {
        setDiscussions(responses.data.discussions);
        console.log(responses.data.discussions)
        axios
          .get(
            "http://localhost:8080" + `/api/v1/course/students/${params?.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((responses) => {
            const newDataUsers = responses.data.users;
            setListUsers(newDataUsers);
          })
          .catch((error) => {
            console.log("error");
          });
      })
      .catch((error) => {
        console.log("error");
      });
    setLoading(false);}
    fetchData();
  }, []);
  const handleButtonClick = (index) => {
    const newButtonStates = buttonStates.map((state, i) => i === index);
    setButtonStates(newButtonStates);
  };

  const handleAddNewDiscussion = (
    dataAddDiscussion,
    setIsAddDiscussion,
    setDataAddDiscussion
  ) => {
    const token = localStorage.getItem("JWT");
    const data = {
      title: dataAddDiscussion.title,
      content: dataAddDiscussion.content,
    };
    const date = new Date();
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    };
    const newData = {
      title: dataAddDiscussion.title,
      content: dataAddDiscussion.content,
      createdBy: {
        fullname: userInfo ? userInfo.fullname : undefined,
      },
      createdAt: formatDate(date),
      updatedAt: formatDate(date),
    };
    setDiscussions([...discussions, newData]);
    axios
      .post(
        "http://localhost:8080" + `/api/v1/discussion/${params?.id}/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((responses) => {
        console.log(responses);
        successNotifi("Thêm thảo luận thành công!.");
      })
      .catch((error) => {
        errorNotifi("Thêm thảo luận thất bại");
      });

    setDataAddDiscussion({
      title: "",
      content: "",
    });
    setIsAddDiscussion(false);
  };

  return (
    <div className="w-full">
      {loading ? (
        <LoadingState title="Đang tải..." />
      ) : (
        <div className="w-full">
          <div className="relative w-full mt-4 flex-between border-b border-solid border-black">
            <div className="w-1/2">
              <h1 className="text-3xl font-semibold">
                {titelCourse && titelCourse.toUpperCase()}
              </h1>
              <p className="text-lg font-medium">Tổng quan khóa học</p>
            </div>
          </div>
          <div className="w-full mt-2 border-b border-solid border-black">
            <button
              className={`px-4 font-medium ${
                buttonStates[0] ? "text-blue-500" : ""
              }`}
              onClick={() => {
                handleButtonClick(0);
              }}
            >
              Danh sách học viên
            </button>
            <button
              className={`px-4 font-medium ${
                buttonStates[1] ? "text-blue-500" : ""
              }`}
              onClick={() => {
                handleButtonClick(1);
              }}
            >
              Diễn đàn khóa học
            </button>
          </div>
          <div className="w-full mt-8">
            {buttonStates[0] ? (
              <RenderAccount accounts={listUsers} courseId={params?.id} />
            ) : (
              ""
            )}
            {buttonStates[1] ? (
              <RenderDiscussion
                courseId={params?.id}
                discussions={discussions}
                handleAddNewDiscussion={handleAddNewDiscussion}
              />
            ) : (
              ""
            )}
          </div>
          <Notification />
        </div>
      )}
    </div>
  );
};

export default CourseInfoPage;
