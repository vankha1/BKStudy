import Image from "next/image";
import Link from "next/link";

const StudentCourseCard = ({ id, tittle, author, authorId, image , handleRating }) => {
  return (
    <div className="w-full flex-center flex-row px-8 py-4 rounded-lg shadow-lg mb-8 transfrom-action">
        <div className="w-2/12 h-32 relative mr-8"><Image src={image} sizes="20rem" fill objectFit="cover" alt="Course image"/></div>
        <div className="flex-start flex-col gap-2 grow mr-2 w-8/12">
          <p className="text-3xl w-full font-bold truncate">{tittle}</p>
          <p className="text-sm">Giáo viên: <Link href={`/profile/` + authorId} className="text-blue-500">{author}</Link></p>
        </div>
        <div className="flex-center flex-col">
          <Link href={"/lesson/" + id}><button className="medium-blue-button w-2/12">Vào học ngay</button></Link>
          <button className="text-blue-500 hover:text-blue-800 mt-2 text-sm underline" onClick={() => {handleRating(tittle, id)}}>Đánh giá khóa học</button>
        </div>
    </div>
  );
};

export default StudentCourseCard;
