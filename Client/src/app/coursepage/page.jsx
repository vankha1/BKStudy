'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

const course =
    {
        id: '1',
        title: 'Cấu trúc dữ liệu và giải thuật',
        description: 'Tìm hiểu về các cấu trúc dữ liệu cơ bản và những giải thuật liên quan',
        number_register: '10000',
        price: '500.000đ',
        image: '/assets/images/course_image.jpg',
        href: '/coursepage',
        rate: '4.5',
        lecturer: 'Nguyễn Văn A',
        update_time: '9/2023',
        videoURL: 'https://www.youtube.com/embed/T9DSBhBR_I4?si=VGLFIMLh8zU5A4wo'
    }

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

const CoursePage = () => {
    
    const router = useRouter();
    
    const [registering, setRegistering] = useState(false);

    const Register = (e) => {
        e.preventDefault();
        setRegistering(true);
        
        
        const token = localStorage.getItem("JWT");

        axios.post(`http://localhost:8080/api/v1/user/register/${course.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if(response.statusText === 'OK') {
                console.log(response);
                router.push('/pay');
            } else console.log(response);
        }).catch((error) => {alert(error)}).finally(() => {setRegistering(false)});
    }
  
    return (
    <div className="coursepage">
        <div className="w-screen h-48 bg-footer text-white px-32 py-3">
            <div className="description w-3/5">
                <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
                <p className="text-xs font-light mb-5">{course.description}</p>
                <div className="flex mb-1">
                    <span className="mr-28">
                        <span className="font-medium">Đánh giá: </span>
                        <span className="font-semibold text-yellow-500">{course.rate}</span>
                        <span>/5</span>
                    </span>
                    <span>
                        <span className="font-medium">Đã tham gia: </span>
                        <span>{course.number_register}</span>
                    </span>
                </div>
                <div className="mb-1">
                    <span className="font-light">Giáo viên: </span>
                    <Link href="/" className='font-semibold underline'>{course.lecturer}</Link>
                </div>
                <div className="font-light">
                    <span>Cập nhật lần cuối vào </span>
                    <span>{course.update_time}</span>
                </div>
            </div>

            <div className="video absolute bg-white right-10 top-4 shadow-lg border border-border rounded-2xl text-black">
                <iframe width="560" height="315" src={course.videoURL} title="YouTube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen 
                className="w-80 h-44 m-auto mb-3 rounded-2xl border border-border"></iframe>
                <h1 className="font-bold text-center text-3xl mb-3">{course.price}</h1>
                <div className="flex mb-8">
                    <div className="m-auto">
                        <button onClick={Register} className="small-primary-button rounded-full w-40 h-12 text-xl">
                            Đăng ký học
                        </button>
                    </div>

                </div>
                <div className="ml-14 pb-5">
                    <div className="flex mb-2">
                        <Image src="/assets/document.png" alt="" width={48} height={48} className="w-6 h-6 mr-4"></Image>
                        Tổng số 
                        <span className="font-semibold mx-1">31</span>
                        bài học
                    </div>
                    <div className="flex mb-2">
                        <Image src="/assets/video.png" alt="" width={48} height={48} className="w-6 h-6 mr-4"></Image>
                        Bao gồm
                        <span className="font-semibold mx-1"> 20 </span>
                        video
                    </div>
                    <div className="flex mb-2">
                        <Image src="/assets/clock.png" alt="" width={20} height={20} className="w-6 h-6 mr-4"></Image>
                        Thời lượng hơn 
                        <span className="font-semibold mx-1"> 30 </span>
                        giờ
                    </div>
                    <div className="flex mb-2">
                        <Image src="/assets/cup.png" alt="" width={48} height={48} className="w-6 h-6 mr-4"></Image>
                        Giấy chứng nhận hoàn thành
                    </div>
                </div>
            </div>
        </div>

        <div className="outcome mt-16 ml-32 w-2/5 px-8 py-5 text-black border border-border shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold mb-5">Kết thúc khóa học</h2>
            <div className="flex">
                <div className="mr-12">
                    <div className="flex mb-2">
                        <Image src="/assets/check.png" alt="" width={25} height={20}></Image>
                        <p className="ml-2">Biết về cấu trúc dữ liệu ...</p>
                    </div>
                    <div className="flex mb-2">
                        <Image src="/assets/check.png" alt="" width={25} height={20}></Image>
                        <p className="ml-2">Biết về cấu trúc dữ liệu ...</p>
                    </div>
                    <div className="flex mb-2">
                        <Image src="/assets/check.png" alt="" width={25} height={20}></Image>
                        <p className="ml-2">Biết về cấu trúc dữ liệu ...</p>
                    </div>
                    <div className="flex mb-2">
                        <Image src="/assets/check.png" alt="" width={25} height={20}></Image>
                        <p className="ml-2">Biết về cấu trúc dữ liệu ...</p>
                    </div>
                </div>

                <div>
                    <div className="flex mb-2">
                        <Image src="/assets/check.png" alt="" width={25} height={20}></Image>
                        <p className="ml-2">Biết về giải thuật ...</p>
                    </div>
                    <div className="flex mb-2">
                        <Image src="/assets/check.png" alt="" width={25} height={20}></Image>
                        <p className="ml-2">Biết về giải thuật ...</p>
                    </div>
                    <div className="flex mb-2">
                        <Image src="/assets/check.png" alt="" width={25} height={20}></Image>
                        <p className="ml-2">Biết về giải thuật ...</p>
                    </div>
                    <div className="flex mb-2">
                        <Image src="/assets/check.png" alt="" width={25} height={20}></Image>
                        <p className="ml-2">Biết về giải thuật ...</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="othercourse w-1/3 text-black mt-16 ml-32">
            <h2 className="text-2xl font-semibold mb-5">Các khóa học khác</h2>
            <div className="w-11/12 flex flex-col justify-around">
          {COURSES.map((course, index) => (
            <Link href={course.href} className="mb-5 transfrom-action">
              <div className="flex course rounded-2xl">
                <Image src={course.image} alt="Course" width={200} height={200} className="w-32 mr-5 rounded-xl border border-border"/>
                  <div  className="flex justify-between w-72">
                    <div>
                      <h3 className="font-semibold mb-4">{course.course_name}</h3>
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

export default CoursePage