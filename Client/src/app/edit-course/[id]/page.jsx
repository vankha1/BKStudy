'use client';
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"

import React from 'react'

import RenderLessons from "@components/RenderLessons";
import RenderAccount from "@components/RenderAccount";
import RatingCourses from "@components/RatingCourses";
import Notification, { warningNotifi, errorNotifi, successNotifi } from "@components/Notification";


const COURSE_INFO = {
    title: 'Giải tích 1',
    course: [
        {
            chapter: 'Giới thiệu môn học',
            content: [
                {
                    title: 'Giới thiệu môn học',
                    fileType: 'video',
                    link: '',
                },
                {
                    title: 'Các chủ đề liên quan trong môn học',
                    fileType: 'file',
                    link: '',
                }
            ]
        },
        {
            chapter: 'Giới thiệu về tích phân',
            content: [
                {
                    title: 'Tích phân là gì',
                    fileType: 'video',
                    link: '',
                },
                {
                    title: 'Các ứng dụng của tích phân',
                    fileType: 'file',
                    link: '',
                },
                {
                    title: 'Tích phân ba lớp',
                    fileType: 'video',
                    link: '',
                }
            ]
        },
        {
            chapter: 'Ứng dụng của tích phân trong việc tính thể tích',
            content: [
                {
                    title: 'Sử dụng tích phân hai lớp',
                    fileType: 'video',
                    link: '',
                },
                {
                    title: 'Sử dụng tích phân ba lớp',
                    fileType: 'file',
                    link: '',
                },
                {
                    title: 'Giới thiệu thêm về một số loại tích phân đặt biệt',
                    fileType: 'video',
                    link: '',
                }
            ]
        }
    ]
}

const LIST_ACCOUNT = [
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
    {
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        startdate: '20/10/2023',
        more: 'Xem chi tiết',
        link: '/',
    },
]

const USERS_RATING = {
    ratingavg: '5',
    ratings: [
        {
            name: 'Nguyễn Văn A',
            content: 'Khóa học này rất bổ ích, mọi người hãy đăng kí học thật nhiều nhá!. Giá rẻ mà cam đoan 10. Giải tích 1 nữa thì còn gì bằng!!!',
            rating: '4',
        },
        {
            name: 'Nguyễn Văn A',
            content: 'Khóa học này rất bổ ích, mọi người hãy đăng kí học thật nhiều nhá!. Giá rẻ mà cam đoan 10. Giải tích 1 nữa thì còn gì bằng!!!',
            rating: '4',
        },
        {
            name: 'Nguyễn Văn A',
            content: 'Khóa học này rất bổ ích, mọi người hãy đăng kí học thật nhiều nhá!. Giá rẻ mà cam đoan 10. Giải tích 1 nữa thì còn gì bằng!!!',
            rating: '4',
        },
        {
            name: 'Nguyễn Văn A',
            content: 'Khóa học này rất bổ ích, mọi người hãy đăng kí học thật nhiều nhá!. Giá rẻ mà cam đoan 10. Giải tích 1 nữa thì còn gì bằng!!!',
            rating: '4',
        },
        {
            name: 'Nguyễn Văn A',
            content: 'Khóa học này rất bổ ích, mọi người hãy đăng kí học thật nhiều nhá!. Giá rẻ mà cam đoan 10. Giải tích 1 nữa thì còn gì bằng!!!',
            rating: '4',
        },
        {
            name: 'Nguyễn Văn A',
            content: 'Khóa học này rất bổ ích, mọi người hãy đăng kí học thật nhiều nhá!. Giá rẻ mà cam đoan 10. Giải tích 1 nữa thì còn gì bằng!!!',
            rating: '4',
        }
    ]
}

const EditCourse = ({ params }) => {
    const [buttonStates, setButtonStates] = useState([true, false, false, false]);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const router = useRouter();

    const handleButtonClick = (index) => {
        const newButtonStates = buttonStates.map((state, i) => i === index);
        setButtonStates(newButtonStates);
    };

    const handleConfirmDelete = () => {
        setConfirmDelete(true);
        setTimeout(() => {
            setConfirmDelete(false);
        }, 4000);
    }

    const handleDeleteCourse = () => {
        const token = localStorage.getItem("JWT");
        axios.delete('http://localhost:8080' + `/api/v1/course/${params?.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.statusText === 'OK') {
                successNotifi('Xóa khóa học thành công!.');
            }
            else {
                errorNotifi('Xóa khóa học thất bại!.');
            }
            setTimeout(() => {
                router.push('/lecturer-manage');
            }, 4000);
        }).catch((error) => errorNotifi('Có lỗi xảy ra, vui lòng thử lại!.'))
    }

    return (
        <div className='w-full'>
            <div className='relative w-full mt-4 flex-between border-b border-solid border-black'>
                <div className='w-1/2'>
                    <h1 className='text-3xl font-semibold'>{COURSE_INFO.title.toUpperCase()}</h1>
                    <p className='text-lg font-medium'>Tổng quan khóa học</p>
                </div>
                <div className='w-1/2'>
                    {
                        confirmDelete ? (
                            <button className='float-right medium-orange-button' >Xác nhận xóa</button>
                        ) : (
                            <button className='float-right medium-red-button' onClick={handleConfirmDelete}>Xóa khóa học</button>
                        )
                    }
                </div>
            </div>
            <div className='w-full mt-2 border-b border-solid border-black'>
                <button className={`px-4 font-medium ${buttonStates[0] ? 'text-gray-500' : ''}`} onClick={() => handleButtonClick(0)}>Khóa học</button>
                <button className={`px-4 font-medium ${buttonStates[1] ? 'text-gray-500' : ''}`} onClick={() => handleButtonClick(1)}>Danh sách học viên</button>
                <button className={`px-4 font-medium ${buttonStates[2] ? 'text-gray-500' : ''}`} onClick={() => handleButtonClick(2)}>Diễn đàn khóa học</button>
                <button className={`px-4 font-medium ${buttonStates[3] ? 'text-gray-500' : ''}`} onClick={() => handleButtonClick(3)}>Đánh giá</button>
            </div>
            <div className='w-full mt-8'>
                {buttonStates[0] ? <RenderLessons course={COURSE_INFO.course} /> : ''}
                {buttonStates[1] ? <RenderAccount accounts={LIST_ACCOUNT} /> : ''}
                {buttonStates[2] ? '' : ''}
                {buttonStates[3] ? <RatingCourses users={USERS_RATING} /> : ''}
            </div>
            <Notification />
        </div>
    )
}

export default EditCourse