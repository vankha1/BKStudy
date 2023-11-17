'use client';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import React from 'react'

const RenderLessons = ({ course }) => {
    const [displayChapter, setDisplayChapter] = useState([]);
    useEffect(() => {
        const initialDisplayArray = new Array(course.length).fill(false);
        setDisplayChapter(initialDisplayArray);
    }, [course]);

    const handleToggleClick = (index) => {
        const newData = [...displayChapter];
        newData[index] = !newData[index];
        setDisplayChapter(newData);
    }


    return (
        <div className='w-full'>
            <div className='w-full mt-8'>
                <button className='float-right medium-blue-button'>Thêm chương mới</button>
                <div className="opacity-0">!!!</div>
            </div>
            <div className='mt-12'>
                {
                    course.map((chapter, indexChapter) => (
                        <div key={indexChapter} className='w-full'>
                            <div className="w-full flex-between">
                                <div className='w-full flex mb-4 cursor-pointer'>
                                    <Image
                                        className={displayChapter[indexChapter] ? 'rotate-right-action' : 'rotate-left-action'}
                                        src='assets/icons/downward.svg'
                                        alt="FileType Picture"
                                        width={30}
                                        height={30}
                                        priority
                                        onClick={() => handleToggleClick(indexChapter)}
                                    />
                                    <h3 className='text-xl font-medium'>{chapter.chapter}</h3>
                                </div>
                                <Link href='/add-lessons' className="flex-center small-blue-button mb-4">
                                    Thêm bài học
                                </Link>
                            </div>
                            <div className={displayChapter[indexChapter] ? 'hidden-action' : ''}>
                                {
                                    chapter.content.map((item, index) => (
                                        <Link key={index} href={item.link} className='w-full flex mb-8 rounded-lg p-2 border border-solid border-gray transfrom-action flex-between'>
                                            <div className='w-1/2 flex'>
                                                <Image
                                                    className=""
                                                    src={`/assets/images/${item.fileType}.png`}
                                                    alt="FileType Picture"
                                                    width={80}
                                                    height={80}
                                                    priority
                                                />
                                                <h2 className='font-normal text-xl pl-4 mt-2'>{item.title}</h2>
                                            </div>
                                            <div className='w-1/2'>
                                                <button className='w-32 bg-blue-200 font-semibold py-[5px] rounded-md hover:bg-blue-300 text-black float-right mr-4'>Chỉnh sửa</button>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RenderLessons
