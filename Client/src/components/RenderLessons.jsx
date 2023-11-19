'use client';
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";

import React from 'react'

const RenderLessons = ({ course, courseId }) => {
    const [displayChapter, setDisplayChapter] = useState([]);
    const [isAddChapter, setIsAddChapter] = useState(false);
    const [newChapter, setNewChapter] = useState('');
    const [coursesInfo, setCourseInfo] = useState([course]);
    useEffect(() => {
        const initialDisplayArray = new Array(coursesInfo.length).fill(false);
        displayChapter ? setDisplayChapter([...displayChapter, false]) : setDisplayChapter(initialDisplayArray);
    }, [coursesInfo]);

    const handleToggleClick = (index) => {
        const newData = [...displayChapter];
        newData[index] = !newData[index];
        setDisplayChapter(newData);
    }

    const handleAddNewChapter = () => {
        setIsAddChapter(true);
    }

    const handleSaveChapter = () => {
        setIsAddChapter(false);
    }

    const handleInputChange = (value) => {
        setNewChapter(value);
    };

    const handleUpdateCourse = () => {
        const newData = [...coursesInfo];
        newData[0].push({chapter: newChapter});
        setCourseInfo(newData);
        setIsAddChapter(false);

        const token = localStorage.getItem("JWT");
        const formData = new FormData();

        formData.append("name", newData)
        axios.post('http://localhost:8080' + `/api/v1/chapter/create?courseId=${courseId}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            // if (response.statusText === 'OK') {
            //     successNotifi('Xóa khóa học thành công!.');
            // }
            // else {
            //     errorNotifi('Xóa khóa học thất bại!.');
            // }
            // setTimeout(() => {
            //     router.push('/lecturer-manage');
            // }, 4000);
            console.log(courseId);
            console.log(response);
        }).catch((error) => console.log(error))

    }

    return (
        <div className='w-full'>
            <div className='w-full mt-8'>
                <button className='float-right medium-blue-button' onClick={handleAddNewChapter}>Thêm chương mới</button>
                <div className="opacity-0">!!!</div>
            </div>
            <div className='mt-12'>
                {
                    course && course.map((chapter, indexChapter) => (
                        <div key={indexChapter} className='w-full'>
                            <div className="w-full flex-between">
                                <div className='w-full flex mb-4 cursor-pointer'>
                                    <Image
                                        className={displayChapter[indexChapter] ? 'rotate-right-action' : 'rotate-left-action'}
                                        src='/assets/icons/downward.svg'
                                        alt="Downward"
                                        width={30}
                                        height={30}
                                        priority
                                        onClick={() => handleToggleClick(indexChapter)}
                                    />
                                    <h3 className='text-xl font-medium'>{chapter.chapter}</h3>
                                </div>
                            </div>
                            <div className={displayChapter[indexChapter] ? 'hidden-action' : ''}>
                                <Link href='/add-lessons' className="flex-center small-blue-button mb-4 ml-4">
                                    Thêm bài học
                                </Link>
                                {
                                    chapter && chapter.content && chapter.content.map((item, index) => (
                                        <Link key={index} href={item.link} className='w-full flex mb-8 rounded-lg p-2 border border-solid border-grayflex-between'>
                                            <div className='w-1/2 flex'>
                                                <Image
                                                    className=""
                                                    src={`/assets/images/${item.fileType}.png`}
                                                    alt="FileType Picture"
                                                    width={70}
                                                    height={70}
                                                    priority
                                                />
                                                <h2 className='font-medium text-xl pl-4 mt-2'>{item.title}</h2>
                                            </div>
                                            <div className='w-1/2'>
                                                <button className='w-28 bg-blue-200 font-semibold py-[5px] rounded-md hover:bg-blue-300 text-black float-right mr-4 mt-4'>Chỉnh sửa</button>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
                <>
                    {
                        isAddChapter ? (
                            <div className="w-full flex-between">
                                <div className='w-3/4 flex mb-4 cursor-pointer'>
                                    <Image
                                        className='rotate-left-action'
                                        src='/assets/icons/downward.svg'
                                        alt="Downward"
                                        width={30}
                                        height={30}
                                        priority
                                    />
                                    <input
                                        type='text'
                                        className='w-[600px] text-xl font-medium border px-1'
                                        value={newChapter}
                                        onChange={(e) => handleInputChange(e.target.value)}
                                    />
                                </div>
                                <div className='w-1/4 flex'>
                                    <button className="flex-center small-gray-button mb-4 ml-4" onClick={handleSaveChapter}>Hủy</button>
                                    <button className="flex-center small-blue-button mb-4 ml-4" onClick={handleUpdateCourse}>Xác nhận</button>
                                </div>
                            </div>
                        ) : (
                            <>
                            </>
                        )
                    }
                </>
            </div>
        </div>
    )
}

export default RenderLessons
