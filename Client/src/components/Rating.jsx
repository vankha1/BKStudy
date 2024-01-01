"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import Notification, { warningNotifi, errorNotifi, successNotifi } from "@components/Notification";

const Rating = ({ name, id, closePopUp, server }) => {
  const [ratingScore, setRatingScore] = useState(0);
  const [cmt, setCmt] = useState("")
  const a = [1, 2, 3, 4, 5]

  const handleRating = async () => {
    const token = localStorage.getItem("JWT");
    await axios.post(server + "/api/v1/course/rating", {
      rate: ratingScore,
      desc: cmt,
      courseId: id,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response)
      if (response.statusText == "OK") {successNotifi("Đánh giá thành công!")}
    }).catch((error) => {errorNotifi("Có lỗi xảy ra"); console.log(error)})
  }

  return (
    <div class="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm' py-6 flex flex-col justify-center sm:py-12">
      <div class="py-3 sm:max-w-xl sm:mx-auto">
        <div class="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
          <div class="px-12 py-5">
            <h2 class="text-gray-800 text-3xl font-semibold">
              Hãy để lại đánh giá của bạn
            </h2>
          </div>
          <div class="bg-gray-200 w-full flex flex-col items-center">
            <div class="flex flex-col items-center py-6 space-y-3">
              <span class="text-lg text-gray-800">
                Chất lượng khóa học trên thang điểm 5
              </span>
              <div class="flex space-x-3">
                <div class="text-center">
                  <span class="flex flex-row-reverse">
                    {(ratingScore > 0) ? (
                      a.map((i) => ((i>=ratingScore) ? (<svg
                        class="text-yellow-400"
                        width="40"
                        height="40"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        tabIndex={0}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        ></path>
                      </svg>) : (<svg
                        class="text-gray-600 duration-100"
                        width="40"
                        height="40"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        tabIndex={0}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        ></path>
                      </svg>)))
                    ) : (
                      a.map((i) => (<svg
                        class="text-gray-600 cursor-pointer peer peer-hover:text-yellow-400 hover:text-yellow-400 peer-focus:text-yellow-400 focus:text-yellow-400 duration-100"
                        width="40"
                        height="40"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        tabIndex={0}
                        onClick={() => {setRatingScore(i)}}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        ></path>
                      </svg>))
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div class="w-3/4 flex flex-col">
              <textarea
                rows="3"
                class="p-4 text-gray-500 rounded-xl resize-none"
                placeholder="Để lại nhận xét của bạn về khóa học"
                value={cmt}
                onChange={(e) => {setCmt(e.target.value)}}
              >
              </textarea>
              <button onClick={() => {handleRating()}} class="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">
                Rate now
              </button>
            </div>
          </div>
          <div class="h-20 flex items-center justify-center">
            <a
              onClick={() => {
                closePopUp();
              }}
              href="#"
              class="text-gray-600"
            >
              Maybe later
            </a>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default Rating;
