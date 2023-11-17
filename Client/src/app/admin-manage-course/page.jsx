import React from "react";
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
  return (
    <div className="w-full">
      <div>
        <FilterSearch title="YÊU CẦU PHÊ DUYỆT" />
        {data.map((course) => (
          <div key={course.title} className="w-full flex-center">
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
