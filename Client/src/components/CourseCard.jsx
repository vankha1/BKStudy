import Link from "next/link"
import Image from "next/image";

const CourseCard = ({ courseId, title, imageUrl, price, desc }) => {
  return (
    <Link href={`/coursepage/${courseId}`} className="flex-center flex-col transfrom-action bg-white shadow-sm rounded-lg p-1">
        <div className="w-full relative h-40 rounded-md">
          <Image
            src={'http://localhost:8080/' + imageUrl}
            alt="Course thumbnail"
            sizes="40rem"
            fill
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="w-full flex-between flex-row mt-1 p-2">
          <div className="flex-start flex-col w-4/5">
            <p className="font-bold text-xl truncate w-full">{title}</p>
            <p className="text-sm mt-2 font-semibold text-orange-400">{price + ".000 vnd"}</p>
          </div>
          <div>
            <span className="text-yellow-500 font-bold w-1/5">4.5</span>/
            <span>5</span>
          </div>
        </div>
        <div className="w-full max-h-16 truncate p-2">
          {desc}
        </div>
    </Link>
  );
};

export default CourseCard;
