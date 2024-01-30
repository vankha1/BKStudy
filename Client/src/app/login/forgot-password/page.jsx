"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const router = useRouter();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/v1/auth/forgot-password", { email })
      .then((res) => {
        console.log(res)
        if (res.data.Status === "Success") {
          router.push("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex-center flex-col drop-shadow-md m-auto px-8 py-5 bg-white rounded-md">
      <div className="bg-white p-3 rounded w-25">
        <form onSubmit={handleSubmit}>
          <div className="w-full flex-start flex-col mt-1 mb-3">
            <label className="text-md font-semibold mb-1">EMAIL</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="input min-w-[20rem]"
              placeholder="abc123@gmail.com"
            />
          </div>
          <button type="submit" className="big-blue-button mt-2">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
