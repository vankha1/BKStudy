'use client';
import Link from "next/link";
import Image from "next/image";

import React from 'react'

const RenderLessons = ({ course }) => {
    return (
        <div className='w-full'>
            <div className='w-full my-8'>
                <button className='float-right medium-blue-button'>Thêm bài giảng</button>
            </div>
            {
                course.map((chapter, indexChapter) => (
                    <div key={indexChapter} className='w-full'>
                        <div className='w-full flex mb-4'>
                            <Image
                                className=""
                                src='assets/icons/downward.svg'
                                alt="FileType Picture"
                                width={30}
                                height={30}
                                priority
                            />
                            <h3 className='text-xl font-medium'>{chapter.chapter}</h3>
                        </div>
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
                ))
            }
        </div>
    )
}

export default RenderLessons