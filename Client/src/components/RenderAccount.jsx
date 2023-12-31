'use client';
import Link from "next/link";
import Image from "next/image";
import React, { useState } from 'react';

const RenderAccount = ({ accounts, courseId }) => {
    const [pageSize, setPageSize] = useState(10);
    const [pagingInfo, setPagingInfo] = useState({
        maxPage: Math.ceil(accounts.length / pageSize) - 1,
        curPage: 0
    })

    return (
        <div className='w-full'>
            <h2 className='text-lg font-medium px-2 py-4'>Danh sách thành viên tham gia khóa học</h2>
            <div className={`h-[${40 * pageSize + 40}px]`}>
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
                                    <th className='font-normal py-2'>{account.fullname}</th>
                                    <th className='font-normal py-2'>{account.username}</th>
                                    <th className='font-normal py-2'>Đã tham gia vào ngày {account.joinedDate.slice(0, 10)}</th>
                                    <th className='font-normal py-2'>
                                        <Link href={`profile/${account._id}`} className="hover:opacity-70">
                                            Xem thêm
                                        </Link>
                                    </th>
                                </tr>
                            </tbody>
                        ))
                    }
                </table>
            </div>
            <div className='w-full flex-between'>
                <div className='opacity-0'>!!!</div>
                <div className='mt-4 flex-between'>
                    <div className='flex-between ml-4'>
                        <Image
                            className={pagingInfo.curPage == 0 ? 'cursor-pointer transform rotate-[90deg] opacity-50' : 'cursor-pointer transform rotate-[90deg]'}
                            src='/assets/icons/downward.svg'
                            alt="Downward"
                            width={24}
                            height={24}
                            priority
                            onClick={() => {
                                if (pagingInfo.curPage != 0) {
                                    setPagingInfo({ ...pagingInfo, curPage: pagingInfo.curPage - 1 })
                                }
                            }}
                        />
                        <div className='py-1 px-2 mx-2 bg-blue-700 text-white rounded-md'>
                            {pagingInfo.curPage}
                        </div>
                        <Image
                            className={pagingInfo.curPage == pagingInfo.maxPage ? 'cursor-pointer transform rotate-[-90deg] opacity-50' : 'cursor-pointer transform rotate-[-90deg]'}
                            src='/assets/icons/downward.svg'
                            alt="Downward"
                            width={24}
                            height={24}
                            priority
                            onClick={() => {
                                if (pagingInfo.curPage != pagingInfo.maxPage) {
                                    setPagingInfo({ ...pagingInfo, curPage: pagingInfo.curPage + 1 })
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RenderAccount;