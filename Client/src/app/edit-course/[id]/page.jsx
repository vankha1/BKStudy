'use client';
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import _ from 'lodash';

import React from 'react'

import RenderLessons from "@components/RenderLessons";
import RenderAccount from "@components/RenderAccount";
import RatingCourses from "@components/RatingCourses";
import RenderDiscussion from "@components/RenderDiscussion";
import Notification, { warningNotifi, errorNotifi, successNotifi } from "@components/Notification";
import LoadingState from "@components/LoadingState";

const EditCourse = ({ params }) => {
    const [buttonStates, setButtonStates] = useState([true, false, false, false]);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [titelCourse, setTitleCourse] = useState('');
    const [dataCourse, setDataCourse] = useState([]);
    const [prevChapterName, setPrevChapterName] = useState([]);
    const router = useRouter();
    const [discussions, setDiscussions] = useState();
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
    const [ratingCourse, setRatingCourse] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("JWT");
        axios
            .get('http://localhost:8080' + `/api/v1/lesson/course/${params?.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((responses) => {
                const newDataCourse = responses.data.chapters;
                setTitleCourse(responses.data.courseName);
                setPrevChapterName(_.cloneDeep(newDataCourse));
                setDataCourse(_.cloneDeep(newDataCourse));
            })
            .catch(error => {
                console.log('error');
            });
        setLoading(false);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("JWT");
        axios
            .get('http://localhost:8080' + `/api/v1/discussion/${params?.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then((responses) => {
                setDiscussions(responses.data.discussions);
            })
            .catch(error => {
                console.log('error');
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("JWT");
        axios
            .get('http://localhost:8080' + `/api/v1/course/students/${params?.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((responses) => {
                const newDataUsers = responses.data.users;
                setListUsers(newDataUsers);
            })
            .catch(error => {
                console.log('error');
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("JWT");
        axios
            .get('http://localhost:8080' + `/api/v1/course/rating-statistics/${params?.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((responses) => {
                setRatingCourse(responses.data);
            })
            .catch(error => {
                console.log('error')
            });
    }, [])

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
                router.push(`/edit-course/${params?.id}`)
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
        if (newChapter.length) {
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
                    setPrevChapterName([...prevChapterName, data]);
                    handleSaveChapter();
                }
                else {
                    errorNotifi('Thêm chương mới thất bại!.');
                }
            }).catch((error) => errorNotifi('Có lỗi xảy ra, thử lại sau!.'))
        } else {
            warningNotifi('Bạn chưa nhập tên chương!.');
        }
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
        setDataCourse(dataCourse.filter((course, index) => index != indexChapter));
        setPrevChapterName(prevChapterName.filter((course, index) => index != indexChapter));
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
                if (responses.status === 200 && responses.data.message === 'update chapter successfully') {
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

    const handleAddNewDiscussion = (dataAddDiscussion, setIsAddDiscussion, setDataAddDiscussion) => {
        const token = localStorage.getItem("JWT");
        const data = {
            title: dataAddDiscussion.title,
            content: dataAddDiscussion.content
        }
        const date = new Date();
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');

            return `${year}-${month}-${day}`;
        }
        const newData = {
            title: dataAddDiscussion.title,
            content: dataAddDiscussion.content,
            createdBy: {
                fullname: userInfo ? userInfo.fullname : undefined
            },
            createdAt: formatDate(date),
            updatedAt: formatDate(date),
        }
        setDiscussions([...discussions, newData]);
        axios
            .post('http://localhost:8080' + `/api/v1/discussion/${params?.id}/create`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": 'application/json',
                }
            })
            .then((responses) => {
                successNotifi('Thêm thảo luận thành công!.');
            })
            .catch(error => {
                errorNotifi('Thêm thảo luận thất bại');
            });

        setDataAddDiscussion({
            title: '',
            content: ''
        });
        setIsAddDiscussion(false);
    }

    return (
        <div className="w-full">
            {
                loading ? (
                    <LoadingState title='Đang tải...' />
                ) : (
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
                            <button
                                className={`px-4 font-medium ${buttonStates[0] ? 'text-blue-500' : ''}`}
                                onClick={() => {
                                    handleButtonClick(0)
                                }}
                            >
                                Khóa học
                            </button>
                            <button
                                className={`px-4 font-medium ${buttonStates[1] ? 'text-blue-500' : ''}`}
                                onClick={() => {
                                    handleButtonClick(1);
                                }}
                            >
                                Danh sách học viên
                            </button>
                            <button
                                className={`px-4 font-medium ${buttonStates[2] ? 'text-blue-500' : ''}`}
                                onClick={() => {
                                    handleButtonClick(2);
                                }}
                            >
                                Diễn đàn khóa học
                            </button>
                            <button
                                className={`px-4 font-medium ${buttonStates[3] ? 'text-blue-500' : ''}`}
                                onClick={() => {
                                    handleButtonClick(3)
                                }}
                            >
                                Đánh giá
                            </button>
                        </div>
                        <div className='w-full mt-8'>
                            {buttonStates[0] ? <RenderLessons course={dataCourse} setCourse={setDataCourse} courseId={params?.id} handleAddNewChapter={handleAddNewChapter} handleDeleteChapter={handleDeleteChapter} prevChapterName={prevChapterName} handleEditChapter={handleEditChapter} courseName={titelCourse} /> : ''}
                            {buttonStates[1] ? <RenderAccount accounts={listUsers} courseId={params?.id} /> : ''}
                            {buttonStates[2] ? <RenderDiscussion courseId={params?.id} discussions={discussions} handleAddNewDiscussion={handleAddNewDiscussion} /> : ''}
                            {buttonStates[3] ? <RatingCourses ratingCourse={ratingCourse} /> : ''}
                        </div>
                        <Notification />
                    </div>
                )
            }
        </div>
    )
}

export default EditCourse