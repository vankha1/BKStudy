"use client";

import StudentCourseCard from "@components/StudentCourseCard";
import FilterSearch from "@components/FilterSearch";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "@app/contexts/auth";

const StudentCourses = () => {
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
          setCourses(response.data.courses);
        }
        console.log(response)
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="w-full">
      <FilterSearch title="KHÓA HỌC ĐÃ ĐĂNG KÝ" />
      {courses.map((course) => (
        <div key={course.courseId._id} className="w-full flex-center">
          <StudentCourseCard
            id={course.courseId._id}
            tittle={course.courseId.title}
            author={course.courseId.createdBy}
            image={SERVER_URL + "/" + course.courseId.imageUrl}
          />
        </div>
      ))}
    </section>
  );
};

export default StudentCourses;
