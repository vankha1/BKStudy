"use client";

import CourseCard from "@components/CourseCard";
import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080' + '/api/v1/course').then((response) => {
      if (response.statusText === 'OK') {setCourses(response.data.courses); console.log(response)}
    }).catch((error) => {alert(error)})
  }, [])

  return (
    <div className="min-h-[535px]">
      <div className="w-[1000px] h-[200px] bg-[#9ccaff] rounded-[15px] px-[60px] py-[20px] mt-[20px]">
        <h1 className="text-3xl font-bold pb-[50px]">
          Chào mừng đến với BKStudy
        </h1>
        <p className="w-[400px]">
          BKStudy là trang web cung cấp khóa học phù hợp dành riêng cho sinh
          viên Đại học Bách Khoa Thành phố Hồ Chí Minh
        </p>
      </div>

      <div className="flex-start flex-col gap-6 mt-16 w-full">
        <h2 className="text-2xl font-bold">Khóa học hàng đầu</h2>
        <div className="w-full grid grid-cols-4 grid-flow-row gap-12">
          {courses.map((course) => (
            <CourseCard courseId={course._id} title={course.title} imageUrl={course.imageUrl} price={course.price}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
