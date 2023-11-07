import StudentCourseCard from "@components/StudentCourseCard"

const data = {
    title: "Giải tích 1",
    createdBy: "Nguyễn Văn A",
    imageUrl: "/course_image.jpg"
}

const StudentCourses = () => {
  return (
    <>
        <section className="w-full flex-center flex-col">
            <StudentCourseCard tittle={data.title} author={data.createdBy} image={data.imageUrl}/>
        </section>
    </>
  )
}

export default StudentCourses