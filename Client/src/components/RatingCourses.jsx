import Link from "next/link";
import Image from "next/image";

import React from 'react'

import StarRating from './StarRating';

const RatingCourses = ({ ratingCourse }) => {
    console.log(ratingCourse);
    return (
        <div className='w-full'>
            <div className='mb-4'>
                <h2 className='text-2xl font-medium'>Đánh giá chung</h2>
                {
                    ratingCourse && ratingCourse.avgRating ? (
                        <StarRating rating={ratingCourse.avgRating} />
                    ) : (
                        <div>Chưa có đánh giá</div>
                    )
                }
            </div>
            <div>
                <h2 className='text-2xl font-medium'>Đánh giá cá nhân</h2>
                {
                    ratingCourse && ratingCourse.rates ? (
                        <div className='w-full flex-between flex-wrap'>
                            {
                                ratingCourse.rates && ratingCourse.rates.map((user, index) => (
                                    <div key={index} className='w-2/5 flex-start rounded-lg border border-solid border-gray-500 p-2 mx-12 my-8'>
                                        <Image
                                            className="rounded-2xl p-2"
                                            src='/assets/images/avatar.svg'
                                            alt="Courses Picture"
                                            width={60}
                                            height={60}
                                            priority
                                        />
                                        <div className='pl-2'>
                                            <h2 className='text-xl font-medium'>Đánh giá</h2>
                                            <div className='flex'>
                                                <h3 className='text-base'>bởi</h3>
                                                <h3 className='text-base text-blue-600 pl-1'> {user.userId?.fullname}</h3>
                                            </div>
                                            <div>
                                                <StarRating rating={user.rate} />
                                            </div>
                                            <p className='text-base font-normal'>{user.desc}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div>Chưa có đánh giá</div>
                    )
                }
            </div>
        </div>
    )
}

export default RatingCourses