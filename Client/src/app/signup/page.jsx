"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthContext } from "@app/contexts/auth";

const SignUpPage = () => {
  const router = useRouter();
  const { setIsLogin } = useAuthContext();

  const [submitting, setSubmitting] = useState(false);
  const [account, setAccount] = useState({
    username: "",
    email: "",
    password: "",
    userType: "",
  });

  const signUp = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    axios
      .put("http://localhost:8080/api/v1/auth/signup", account)
      .then((response) => {
        if (response.statusText === "OK") {
          axios
            .post("http://localhost:8080/api/v1/auth/login", {email: account.email, password: account.password})
            .then((response) => {
              if (response.statusText == "OK") {
                if (response.data.message == "Wrong password")
                  alert("Wrong password");
                else {
                  localStorage.setItem("JWT", response.data.token);
                  router.push("/add-profile");
                }
              } else alert("Something wrong is happening");
            })
            .catch((error) => {
              alert(error);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <section className="flex-center flex-col drop-shadow-md mt-3 px-8 py-5 bg-white rounded-md mt-[55px]">
      <h1 className="text-3xl font-bold">Đăng ký</h1>
      <form onSubmit={signUp} className="flex-center flex-col w-full">
        <div className="w-full flex-start flex-col mt-5 mb-3">
          <label className="text-xs font-semibold mb-1">USERNAME</label>
          <input
            type="username"
            name="username"
            id="username"
            value={account.username}
            onChange={(e) => {
              setAccount({ ...account, username: e.target.value });
            }}
            className="input min-w-[20rem]"
            placeholder="abc123@gmail.com"
          />
        </div>
        <div className="w-full flex-start flex-col mt-1 mb-3">
          <label className="text-xs font-semibold mb-1">EMAIL</label>
          <input
            type="email"
            name="email"
            id="email"
            value={account.email}
            onChange={(e) => {
              setAccount({ ...account, email: e.target.value });
            }}
            className="input min-w-[20rem]"
            placeholder="abc123@gmail.com"
          />
        </div>
        <div className="w-full flex-start flex-col mt-1 mb-3">
          <label className="text-xs font-semibold mb-1">PASSWORD</label>
          <input
            type="password"
            name="password"
            id="password"
            value={account.password}
            onChange={(e) => {
              setAccount({ ...account, password: e.target.value });
            }}
            className="input min-w-[20rem]"
            placeholder="••••••••"
          />
        </div>
        <div className="w-full flex-start flex-col mt-1 mb-3">
          <label className="text-xs font-semibold mb-1">Vai trò</label>
          <select
            id="role"
            onChange={(e) => {
              setAccount({ ...account, userType: e.target.value });
            }}
            className="input min-w-[20rem] text-sm text-slate-500"
          >
            <option>Chọn vai trò của bạn</option>
            <option value="STUDENT">Sinh viên</option>
            <option value="LECTURER">Giáo viên</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="big-blue-button mt-6"
        >
          Đăng ký
        </button>
      </form>
      <div className="w-full flex-center flex-row py-4">
        <span className="w-full border bg-slate-400" />
        <div className="text-slate-400 text-xs px-2">or</div>
        <span className="w-full border bg-slate-400" />
      </div>
      <button className="big-white-button mb-4 inline-flex items-center">
        <Image
          src="/assets/icons/google_icon.svg"
          alt="google icon"
          width={20}
          height={20}
          className="ml-4 mr-10"
        />
        <span>Tiếp tục bằng Google</span>
      </button>
      <button className="big-white-button inline-flex items-center">
        <Image
          src="/assets/icons/fb_icon.svg"
          alt="facebook icon"
          width={20}
          height={20}
          className="ml-4 mr-10"
        />
        <span>Tiếp tục bằng Facebook</span>
      </button>
    </section>
  );
};

export default SignUpPage;
