import Image from "next/image";

const StudentCourseCard = ({ tittle, author, image }) => {
  return (
    <div className="w-full flex-between px-8 py-4 rounded-lg shadow-lg mb-8 transfrom-action">
      <div className="flex-center flex-row w-full ">
        <Image src={image} width={160} height={100} alt="Course image" className="mr-8"/>
        <div className="flex-start flex-col gap-2 grow">
          <p className="text-3xl font-bold">{tittle}</p>
          <p className="text-sm">Giáo viên: {author}</p>
        </div>
        <button className="medium-blue-button">Vào học ngay</button>
      </div>
    </div>
  );
};

export default StudentCourseCard;
