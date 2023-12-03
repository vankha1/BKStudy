'use client';
import Link from "next/link";
import React from 'react';

const RenderAccount = ({ accounts, courseId }) => {

    return (
        <div className='w-full'>
            <h2 className='text-lg font-medium px-2 py-4'>Danh sách thành viên tham gia khóa học</h2>
            <table className='w-full'>
                <tbody>
                    <tr className='border-b border-solid border-black'>
                        <th>Tên</th>
                        <th>Username</th>
                        <th>Chi tiết</th>
                        <th>Xem thêm</th>
                    </tr>
                </tbody>
                {
                    accounts.map((account, index) => (
                        <tbody key={index}>
                            <tr className='border-b border-solid border-gray-500'>
                                <th className='font-medium py-2'>{account.fullname}</th>
                                <th className='font-medium py-2'>{account.username}</th>
                                <th className='font-medium py-2'>Đã tham gia vào ngày {account.joinedDate.slice(0, 10)}</th>
                                <th className='font-medium py-2'>
                                    <Link href={`/user/${courseId}/${account._id}`}>
                                        Xem thêm
                                    </Link>
                                </th>
                            </tr>
                        </tbody>
                    ))
                }
            </table>
        </div>
    )
}

export default RenderAccount;