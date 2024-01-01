'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

import FilterSearch from '@components/FilterSearch';
import LoadingState from '@components/LoadingState';

const ManageCourses = () => {
    const [courses, setCourses] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem("JWT");
        axios
            .get("http://localhost:8080/api/v1/user/courses", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                const data = response.data.courses;
                const courseData = data;
                setCourses(courseData);
            })
            .catch((error) => {
                console.error(`Error when call API: ${error}`);
            });
        setLoading(false);
    }, []);

    return (
        <div className='relative w-full mt-4'>
            {
                loading ? (
                    <LoadingState title='Đang tải khóa học...' />
                ) : (
                    <>
                        <div className='w-full flex flex-col'>
                            <FilterSearch title="KHÓA HỌC ĐANG GIẢNG DẠY" />
                            <Link href='/add-course' className='w-full relative mt-4'>
                                <button className='medium-blue-button float-right'>Thêm khóa học</button>
                            </Link>
                        </div>
                        <div className='w-full flex flex-col'>
                            {courses && courses.map((course, index) => (
                                <div key={index}>
                                    {
                                        course.courseId != null ? (
                                            <Link key={index} href={`/edit-course/${course.courseId._id}`} className='px-8 py-4 rounded-lg shadow-lg mb-8 cursor-pointer transfrom-action flex flex-row'>
                                                <div className='w-[180px] relative h-[140px]'>
                                                    <Image
                                                        className="rounded-2xl py-2"
                                                        src={'http://localhost:8080/' + course.courseId.imageUrl}
                                                        alt="Courses Picture"
                                                        fill
                                                        objectFit="cover"
                                                    />
                                                </div>
                                                <div className='pl-4 pt-2 w-[55.625rem]'>
                                                    <h3 className='text-2xl font-medium mb-2'>{course.courseId.title}</h3>
                                                    <p className='text-base font-normal'>Số lượng sinh viên đăng kí: {course.courseId.numberOfStudent}</p>
                                                </div>
                                            </Link>
                                        ) : (
                                            <>
                                            </>
                                        )
                                    }
                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ManageCourses;