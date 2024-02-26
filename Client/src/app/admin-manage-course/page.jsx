'use client'
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import AdminCourseCard from "@components/AdminCourseCard";
import FilterSearch from "@components/FilterSearch";


const AdminPage = () => {
  const [courses, setCourses] = useState();

  useEffect(() => {
    const token = localStorage.getItem("JWT");
    axios
      .get("http://localhost:8080/api/v1/admin/courses", {
          headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        const data = response.data.courses;
        const courseData = data;

        setCourses(courseData);
      }
      )
      .catch((error) => {
        console.error(`Error when call API: ${error}`);
      });
  }, []);

  console.log(courses)

  return (
    <div className="w-full mt-[55px]">
      <div>
        <div className="absolute right-16">
          <Link href='\admin-manage-user' className="text-footer font-semibold text-xl hover:text-primary mr-10">Quản lý người dùng</Link>
          <Link href='\admin-dashboard' className="text-footer font-semibold text-xl hover:text-primary">Thống kê</Link>
        </div>
        <FilterSearch title="YÊU CẦU PHÊ DUYỆT" />
        {courses && courses.map((course, index) => (
          <div key={index} className="w-full flex-center">
            <AdminCourseCard
              _id={course._id}
              tittle={course.title}
              author={course.createdBy.fullname}
              image={'http://localhost:8080/' + course.imageUrl}
              price={course.price}
              description={course.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
