import Image from "next/image";
import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled, RxDot } from 'react-icons/rx';

const slides = [
    {
      url: '/assets/images/hcmut2.jpg',
    },
    {
        url: '/assets/images/hcmut3.jpg',
      },
      {
        url: '/assets/images/hcmut4.png',
      },
  ];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    // Auto-advance to the next slide every 3 seconds
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div className="max-w-[1400px] h-[480px] w-full py-8 px-4 relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500 flex-center flex-col"
      >
        <div className="backdrop-blur-[2px] p-5 rounded-lg">
        <p className=" font-bold text-7xl bg-gradient-to-r from-yellow-400 via-amber-300 to-amber-400 inline-block text-transparent bg-clip-text">BKStudy - Qua môn eazy</p>
        <p className="font-semibold text-amber-200 text-xl mt-2">BKStudy là nền tảng cung cấp khóa học chất lượng nhất dành cho sinh viên Bách Khoa</p>
        </div>
        
      </div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            {(currentIndex==slideIndex ? (<RxDotFilled/>) : (<RxDot />))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
