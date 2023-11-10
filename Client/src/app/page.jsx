import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const COURSES = [
  {
      course_name: 'CTDL & Giải thuật',
      number_register: '1000',
      image: '/assets/images/course_image.jpg',
      href: '/coursepage',
      price: '500.000đ',
      rate: '4.5'
  },
  {
      course_name: 'CTDL & Giải thuật',
      number_register: '1000',
      image: '/assets/images/course_image.jpg',
      href: '/coursepage',
      price: '500.000đ',
      rate: '4.5'
  },
  {
      course_name: 'CTDL & Giải thuật',
      number_register: '1000',
      image: '/assets/images/course_image.jpg',
      href: '/coursepage',
      price: '500.000đ',
      rate: '4.5'
  }
]

const HomePage = () => {
  return (
    <div className="homepage w-full">
      <div className="welcome w-11/12 h-52 bg-secondary rounded-2xl px-16 py-5 mt-5">
        <h1 className="text-3xl font-bold pb-12">Chào mừng đến với BKStudy</h1>
        <p className="w-96">BKStudy là trang web cung cấp khóa học phù hợp dành riêng cho sinh viên Đại học Bách Khoa Thành phố Hồ Chí Minh</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mt-10 px-16">Khóa học hàng đầu</h2>
        <div className="w-11/12 flex justify-around">
          {COURSES.map((course, index) => (
            <Link href={course.href} className="mt-5 transfrom-action">
              <div className="course">
                <Image src={course.image} alt="Course" width={200} height={200} className="w-56 rounded-xl border border-border"/>
                  <div  className="flex justify-between px-1 mt-2">
                    <div>
                      <h3 className="font-semibold">{course.course_name}</h3>
                      <h2>{course.price}</h2>
                    </div>
                    <div>
                      <span className="text-yellow-500 font-bold">{course.rate}</span>
                      /
                      <span>5</span>
                    </div>
                  </div>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage