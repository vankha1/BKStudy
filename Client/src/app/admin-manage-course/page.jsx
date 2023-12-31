'use client'
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import AdminCourseCard from "@components/AdminCourseCard";
import FilterSearch from "@components/FilterSearch";

const data = [
  {
    title: "Giải tích 1",
    createdBy: "Nguyễn Văn A",
    imageUrl: "/assets/images/course_image.jpg",
    price: "500",
    description: "Học xong 10 chấm",
  },
  {
    title: "Giải tích 1",
    createdBy: "Nguyễn Văn A",
    imageUrl: "/assets/images/course_image.jpg",
    price: "500",
    description: "Học xong 10 chấm",
  },
  {
    title: "Giải tích 1",
    createdBy: "Nguyễn Văn A",
    imageUrl: "/assets/images/course_image.jpg",
    price: "500",
    description: "Học xong 10 chấm",
  },
  {
    title: "Giải tích 1",
    createdBy: "Nguyễn Văn A",
    imageUrl: "/assets/images/course_image.jpg",
    price: "500",
    description: "Học xong 10 chấm",
  },
  {
    title: "Giải tích 1",
    createdBy: "Nguyễn Văn A",
    imageUrl: "/assets/images/course_image.jpg",
    price: "500",
    description: "Học xong 10 chấm",
  },
];

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

        setUsers(courseData);
      }
      )
      .catch((error) => {
        console.error(`Error when call API: ${error}`);
      });
  }, []);

  return (
    <div className="w-full">
      <div>
        <Link href='\admin-manage-user' className="absolute right-16 text-footer font-semibold text-xl hover:text-primary">Quản lý người dùng</Link>
        <FilterSearch title="YÊU CẦU PHÊ DUYỆT" />
        {courses && courses.map((course, index) => (
          <div key={index} className="w-full flex-center">
            <AdminCourseCard
              tittle={course.title}
              author={course.createdBy}
              image={course.imageUrl}
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
