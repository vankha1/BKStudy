"use client";

import CourseCard from "@components/CourseCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "@components/Carousel";
import LoadingState from "@components/LoadingState";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080" + "/api/v1/course")
      .then((response) => {
        console.log(response)
        if (response.statusText === "OK") {
          setCourses(response.data.courses);
          setDone(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return !done ? (
    <LoadingState title="Đang tải" width={40} height={40} />
  ) : (
    <div className="flex-center flex-col min-h-[535px] w-full">
      <Carousel/>

      <div className="flex-start flex-col gap-6 mt-16 w-full">
        <h2 className="text-2xl font-bold">Khóa học hàng đầu</h2>
        <div className="w-full grid grid-cols-3 grid-flow-row gap-12">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              courseId={course._id}
              title={course.title}
              imageUrl={course.imageUrl}
              price={course.price}
              desc={course.description}
              rating={course.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
