"use client"

import StudentCourseCard from "@components/StudentCourseCard";
import FilterSearch from "@components/FilterSearch";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "@app/contexts/auth";

const StudentCourses = () => {
  const { token } = useAuthContext();
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = () => {
      axios.get('http://localhost:8080' + '/api/v1/user/courses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        if (response.statusText === 'OK') {
          setCourses(response.data.courses);
          console.log(response.data.courses)
        }
      })
    }

    fetchCourses();
  }, [])

  return (
    <section className="w-full">
      <FilterSearch title="KHÓA HỌC ĐÃ ĐĂNG KÝ"/>
      {courses.map((course) => (
        <div key={course.title} className="w-full flex-center">
          <StudentCourseCard
            tittle={course.title}
            author={course.createdBy}
            image={course.imageUrl}
          />
        </div>
      ))}
    </section>
  );
};

export default StudentCourses;
