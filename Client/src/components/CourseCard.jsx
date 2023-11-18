import Link from "next/link"
import Image from "next/image";

const CourseCard = ({ courseId, title, imageUrl, price }) => {
  return (
    <Link href={`/coursepage/${courseId}`} className="flex-center flex-col transfrom-action bg-white shadow-sm rounded-lg">
        <div className="w-full relative h-28">
          <Image
            src={'http://localhost:8080/' + imageUrl}
            alt="Course thumbnail"
            fill
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="w-full flex-between flex-row mt-2 px-2 pb-2">
          <div className="flex-start flex-col">
            <p className="font-bold text-lg">{title}</p>
            <p>{price + ".000 vnd"}</p>
          </div>
          <div>
            <span className="text-yellow-500 font-bold">4.5</span>/
            <span>5</span>
          </div>
        </div>
    </Link>
  );
};

export default CourseCard;
