"use client";
import React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

function ResetPassword() {
  const [password, setPassword] = useState();
  const router = useRouter();
  const params = useSearchParams();
  const token = localStorage.getItem("JWT") ? localStorage.getItem("JWT") : params?.token;
  const userId = JSON.parse(localStorage.getItem("userInfo")) ? JSON.parse(localStorage.getItem("userInfo"))._id : params?.userId;
  // console.log("Token:);",token, "userId:" ,userId)

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/v1/auth/reset-password/${userId}/${token}`, {
        password,
      })
      .then((res) => {
        console.log(res)
        if (res.data.Status === "Success") {
          router.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex-center flex-col drop-shadow-md m-auto px-8 py-5 bg-white rounded-md">
      <div className="bg-white p-3 rounded w-15">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="text-md">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="input min-w-[10rem]"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="big-blue-button mt-2">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
