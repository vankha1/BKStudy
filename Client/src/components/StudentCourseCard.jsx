import Image from "next/image";
import Link from "next/link";

const StudentCourseCard = ({ id, tittle, author, image }) => {
  return (
    <div className="w-full flex-center flex-row px-8 py-4 rounded-lg shadow-lg mb-8 transfrom-action">
        <div className="w-2/12 h-32 relative mr-8"><Image src={image} sizes="20rem" fill objectFit="cover" alt="Course image"/></div>
        <div className="flex-start flex-col gap-2 grow mr-2 w-8/12">
          <p className="text-3xl w-full font-bold truncate">{tittle}</p>
          <p className="text-sm">Giáo viên: {author}</p>
        </div>
        <Link href={"/lesson/" + id}><button className="medium-blue-button w-2/12">Vào học ngay</button></Link>
    </div>
  );
};

export default StudentCourseCard;
