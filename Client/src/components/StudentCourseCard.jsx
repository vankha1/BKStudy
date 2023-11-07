import Image from "next/image"

const StudentCourseCard = ({tittle, author, image}) => {
  return (
    <div className="flex-between flex-row w-full ">
        <Image 
            src={image}
            width={120}
            height={80}
            alt="Course image"
        />
        <div className="flex-start flex-col">
            <p>{tittle}</p>
            <p>Giáo viên: {author}</p>
        </div>
        <button className="">Vào học ngay</button>
    </div>
  )
}

export default StudentCourseCard