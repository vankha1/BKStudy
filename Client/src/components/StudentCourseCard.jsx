import Image from "next/image";

const StudentCourseCard = ({ id, tittle, author, image }) => {
  return (
    <div className="w-full flex-between px-8 py-4 rounded-lg shadow-lg mb-8 transfrom-action">
      <div className="flex-center flex-row w-full ">
        <div className="w-1/5 relative mr-8"><Image src={image} sizes="10rem" fill objectFit="cover" alt="Course image"/></div>
        <div className="flex-start flex-col gap-2 grow w-4/5 mr-2">
          <p className="text-3xl font-bold w-full lg:truncate h-18 overflow-hidden">{tittle}</p>
          <p className="text-sm">Giáo viên: {author}</p>
        </div>
        <button className="medium-blue-button">Vào học ngay</button>
      </div>
    </div>
  );
};

export default StudentCourseCard;
