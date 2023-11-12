'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

import FilterSearch from '@components/FilterSearch';

const COURSES = [
    {
        course_name: 'Cấu trúc dữ liệu và giải thuật',
        number_register: '1000',
        image: '/assets/images/course_image.jpg',
        href: '/dsa'
    },
    {
        course_name: 'Cấu trúc dữ liệu và giải thuật',
        number_register: '1000',
        image: '/assets/images/course_image.jpg',
        href: '/dsa'
    },
    {
        course_name: 'Cấu trúc dữ liệu và giải thuật',
        number_register: '1000',
        image: '/assets/images/course_image.jpg',
        href: '/dsa'
    },
    {
        course_name: 'Cấu trúc dữ liệu và giải thuật',
        number_register: '1000',
        image: '/assets/images/course_image.jpg',
        href: '/dsa'
    }
]

const ManageCourses = () => {
    // const [courses, setCourses] = useState();
    // const [loading, setLoading] = useState(true);
    
    // useEffect(() => {
    //     const token = localStorage.getItem("JWT");
    //     axios
    //         .get("http://localhost:8080/api/v1/user/courses", {
    //             headers: { Authorization: `Bearer ${token}` }
    //         })
    //         .then((response) => {
    //             const data = response.data;
    //             console.log(data)
    //             const courseData = data.data;

    //             setCourses(courseData);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error(`Error when call API: ${error}`);
    //             setLoading(false);
    //         });
    // }, []);

    // if (loading) {
    //     return <p>Đang tải...</p>;
    // }

    return (
        <div className='relative w-full mt-4'>
            <div className='w-full flex flex-col'>
                <FilterSearch title="KHÓA HỌC ĐANG GIẢNG DẠY" />
                <Link href='add-course' className='w-full relative mt-4'>
                    <button className='medium-blue-button float-right'>Thêm khóa học</button>
                </Link>
            </div>
            <div className='w-full flex flex-col'>
                {COURSES.map((course, index) => (
                    <Link key={index} href={course.href} className='px-8 py-4 rounded-lg shadow-lg mb-8 cursor-pointer transfrom-action flex flex-row'>
                        <Image
                            className="rounded-xl py-2"
                            src={course.image}
                            alt="Courses Picture"
                            width={140}
                            height={64}
                            priority
                        />
                        <div className='pl-4 '>
                            <h3 className='text-3xl font-medium mb-2'>{course.course_name}</h3>
                            <p className='text-base font-normal'>Số lượng sinh viên đăng kí: {course.number_register}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ManageCourses;