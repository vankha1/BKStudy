import Link from "next/link"
import Image from "next/image";
import StarRating from "./StarRating";

const CourseCard = ({ courseId, title, imageUrl, price, desc, rating }) => {
  const priceFormat = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

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
            <p className="text-sm mt-2 font-semibold text-orange-400">{priceFormat.format(price)}</p>
          </div>
          <div>
            {(rating===0) ? (<p className="text-orange-700">NEW!</p>) : (<StarRating rating={rating} />)}
          </div>
        </div>
        <div className="w-full max-h-16 truncate p-2">
          {desc}
        </div>
    </Link>
  );
};

export default CourseCard;
