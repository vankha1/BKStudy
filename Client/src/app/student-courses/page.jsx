import StudentCourseCard from "@components/StudentCourseCard";
import FilterSearch from "@components/FilterSearch";

const data = [
  {
    title: "Giải tích 1",
    createdBy: "Nguyễn Văn A",
    imageUrl: "/assets/images/course_image.jpg",
  },
  {
    title: "Giải tích 1",
    createdBy: "Nguyễn Văn A",
    imageUrl: "/assets/images/course_image.jpg",
  },
  {
    title: "Giải tích 1",
    createdBy: "Nguyễn Văn A",
    imageUrl: "/assets/images/course_image.jpg",
  },
  {
    title: "Giải tích 1",
    createdBy: "Nguyễn Văn A",
    imageUrl: "/assets/images/course_image.jpg",
  },
  {
    title: "Giải tích 1",
    createdBy: "Nguyễn Văn A",
    imageUrl: "/assets/images/course_image.jpg",
  },
];

const StudentCourses = () => {
  return (
    <section className="w-full">
      <FilterSearch title="KHÓA HỌC ĐÃ ĐĂNG KÝ"/>
      {data.map((course) => (
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
