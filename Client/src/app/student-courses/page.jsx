"use client";

import StudentCourseCard from "@components/StudentCourseCard";
import FilterSearch from "@components/FilterSearch";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "@app/contexts/auth";
import Image from "next/image";
import LoadingState from "@components/LoadingState";

const StudentCourses = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const { SERVER_URL } = useAuthContext();

  useEffect(() => {
    const token = localStorage.getItem("JWT");
    axios
      .get(SERVER_URL + "/api/v1/user/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.statusText === "OK") {
          setCourses(response.data.courses.filter((course) => (course.courseId != null)));
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="w-full">
      <FilterSearch title="KHÓA HỌC ĐÃ ĐĂNG KÝ" />
      {!loading ? (
        (courses.length > 0) ? (courses.map((course) => (
          <div key={course.courseId._id} className="w-full flex-center">
            <StudentCourseCard
              id={course.courseId._id}
              tittle={course.courseId.title}
              author={course.courseId.createdBy.fullname}
              image={SERVER_URL + "/" + course.courseId.imageUrl}
            />
          </div>
        ))) : (
          <div className="font-bold text-2xl w-full text-center">Chưa có khóa học nào được đăng ký</div>
        )
      ) : (
        <LoadingState title='Đang tải khóa' />
      )}
    </section>
  );
};

export default StudentCourses;
