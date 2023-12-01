'use client';
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import _ from 'lodash';

import React from 'react'

import RenderLessons from "@components/RenderLessons";
import RenderAccount from "@components/RenderAccount";
import RatingCourses from "@components/RatingCourses";
import Notification, { warningNotifi, errorNotifi, successNotifi } from "@components/Notification";

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
    const [listUsers, setListUsers] = useState([]);
    const [titelCourse, setTitleCourse] = useState('');
    const [dataCourse, setDataCourse] = useState([]);
    const [prevChapterName, setPrevChapterName] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("JWT");
        axios
            .get('http://localhost:8080' + `/api/v1/lesson/course/${params?.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((data) => {
                const newDataCourse = data.data.chapters;
                setTitleCourse(data.data.courseName);
                setPrevChapterName(_.cloneDeep(newDataCourse));
                setDataCourse(_.cloneDeep(newDataCourse));
            })
            .catch(error => {
                console.log('error')
            });
    }, []);

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

    const handleAddNewChapter = (newChapter, handleSaveChapter) => {
        const token = localStorage.getItem("JWT");
        const data = {
            name: newChapter
        }
        const newDataCourse = [...dataCourse];
        newDataCourse.push(data);
        axios.post('http://localhost:8080' + `/api/v1/chapter/create?courseId=${params?.id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.statusText === 'OK') {
                successNotifi('Thêm chương mới thành công!.');
                setDataCourse(newDataCourse);
                handleSaveChapter();
            }
            else {
                errorNotifi('Thêm chương mới thất bại!.');
            }
        }).catch((error) => errorNotifi('Có lỗi xảy ra, thử lại sau!.'))
    }

    const handleDeleteChapter = (indexChapter) => {
        const token = localStorage.getItem("JWT");
        axios.delete('http://localhost:8080' + `/api/v1/chapter/delete?courseId=${params?.id}&chapter=${indexChapter}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((responses) => {
                if (responses.status === 200 && responses.data.message === 'delete chapter successfully') {
                    successNotifi('Xóa chương thành công!.')
                }
                else {
                    errorNotifi('Có lỗi xảy ra!.');
                }
            })
            .catch(error => {
                errorNotifi('Có lỗi xảy ra!.');
            });
        setDataCourse(dataCourse.filter((course, index) => index != indexChapter))
    }

    const handleEditChapter = (indexChapter) => {
        const token = localStorage.getItem("JWT");
        const data = {
            name: dataCourse[indexChapter].name
        }
        axios.put('http://localhost:8080' + `/api/v1/chapter/update?courseId=${params?.id}&chapter=${indexChapter}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((responses) => {
                if (responses.status === 200 && responses.data.message === 'update chapter successfully'){
                    successNotifi('Chỉnh sửa chương thành công!.');
                }
                else {
                    errorNotifi('Chỉnh sửa thất bại!.')
                }
            })
            .catch(error => {
                errorNotifi('Có lỗi xảy ra, thử lại sau.')
            });
    }

    const handleGetUserInfos = () => {
        const token = localStorage.getItem("JWT");
        axios
            .get('http://localhost:8080' + `/api/v1/course/students/${params?.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((data) => {
                const newDataUsers = data.data.users;
                setListUsers(newDataUsers);
            })
            .catch(error => {
                console.log('error');
            });
    }

    return (
        <div className='w-full'>
            <div className='relative w-full mt-4 flex-between border-b border-solid border-black'>
                <div className='w-1/2'>
                    <h1 className='text-3xl font-semibold'>{titelCourse && titelCourse.toUpperCase()}</h1>
                    <p className='text-lg font-medium'>Tổng quan khóa học</p>
                </div>
                <div className='w-1/2'>
                    {
                        confirmDelete ? (
                            <button className='float-right medium-orange-button' onClick={handleDeleteCourse}>Xác nhận xóa</button>
                        ) : (
                            <button className='float-right medium-red-button' onClick={handleConfirmDelete}>Xóa khóa</button>
                        )
                    }
                </div>
            </div>
            <div className='w-full mt-2 border-b border-solid border-black'>
                <button className={`px-4 font-medium ${buttonStates[0] ? 'text-blue-500' : ''}`} onClick={() => handleButtonClick(0)}>Khóa học</button>
                <button
                    className={`px-4 font-medium ${buttonStates[1] ? 'text-blue-500' : ''}`}
                    onClick={() => {
                        handleButtonClick(1);
                        handleGetUserInfos();
                    }}
                >
                    Danh sách học viên
                </button>
                <button
                    className={`px-4 font-medium ${buttonStates[2] ? 'text-blue-500' : ''}`}
                    onClick={() => handleButtonClick(2)}
                >
                    Diễn đàn khóa học
                </button>
                <button className={`px-4 font-medium ${buttonStates[3] ? 'text-blue-500' : ''}`} onClick={() => handleButtonClick(3)}>Đánh giá</button>
            </div>
            <div className='w-full mt-8'>
                {buttonStates[0] ? <RenderLessons course={dataCourse} setCourse={setDataCourse} courseId={params?.id} handleAddNewChapter={handleAddNewChapter} handleDeleteChapter={handleDeleteChapter} prevChapterName={prevChapterName} handleEditChapter={handleEditChapter} courseName={titelCourse} /> : ''}
                {buttonStates[1] ? <RenderAccount accounts={listUsers} /> : ''}
                {buttonStates[2] ? '' : ''}
                {buttonStates[3] ? <RatingCourses users={USERS_RATING} /> : ''}
            </div>
            <Notification />
        </div>
    )
}

export default EditCourse