'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import RenderReply from './RenderReply';

const RenderDiscussion = ({
    courseId,
    discussions,
    handleAddNewDiscussion,
}) => {
    const [isAddDiscussion, setIsAddDiscussion] = useState(false);
    const [dataAddDiscussion, setDataAddDiscussion] = useState({
        title: '',
        content: ''
    });
    const [isShowReply, setIsShowReply] = useState(false);
    const [discussionID, setDiscussionID] = useState();
    const [pageSize, setPageSize] = useState(6);
    const [pagingInfo, setPagingInfo] = useState({
        maxPage: Math.ceil(discussions.length / pageSize) - 1,
        curPage: 0,
    })


    return (
        <div className='w-full'>
            <div className='w-full flex-between'>
                <div className='w-3/5 h-10 rounded-3xl border border-solid border-gray-500 flex-between opacity-0'>
                    <input className='min-w-[20rem] h-8 ml-4 my-1 focus:outline-none focus:border-none' type='text' placeholder='Tìm kiếm chủ đề thảo luận' />
                    <Image
                        className="rounded-2xl py-2 hover:cursor-pointer mr-2"
                        src='/assets/icons/search_icon.svg'
                        alt="Search icon"
                        width={24}
                        height={24}
                    />
                </div>
                <button
                    className='w-36 h-10 bg-primary text-white font-semibold py-[5px] rounded-lg hover:bg-blue-800'
                    onClick={() => setIsAddDiscussion(true)}
                >
                    Thêm thảo luận
                </button>
            </div>
            {
                isAddDiscussion && dataAddDiscussion ? (
                    <div className='mt-8 border border-solid border-gray-300 rounded-xl'>
                        <div className='flex my-4 mx-12'>
                            <div className='w-2/5 mt-2'>Tên chủ đề thảo luận</div>
                            <textarea
                                type='text'
                                className='w-3/5 h-10 border border-solid border-gray-300 focus:border-gray-300 focus:outline-none pl-2 pt-2 rounded-lg'
                                placeholder='Nhập tiêu đề thảo luận'
                                defaultValue={dataAddDiscussion.title}
                                onChange={(e) => {
                                    setDataAddDiscussion({ ...dataAddDiscussion, title: e.target.value });
                                }}
                            />
                        </div>
                        <div className='flex mb-8 mx-12 mt-12'>
                            <div className='w-2/5 mt-2'>Nội dung thảo luận</div>
                            <textarea
                                type='text'
                                className='w-3/5 h-60 border border-solid border-gray-300 focus:border-gray-300 focus:outline-none pl-2 pt-2 rounded-lg'
                                placeholder='Nhập nội dung thảo luận'
                                defaultValue={dataAddDiscussion.content}
                                onChange={(e) => {
                                    setDataAddDiscussion({ ...dataAddDiscussion, content: e.target.value });
                                }}
                            />
                        </div>
                        <div className='w-full mt-8 mb-10 flex-between'>
                            <div className="opacity-0">!!!</div>
                            <div className='flex mr-12'>
                                <button
                                    className='small-gray-button mr-8'
                                    onClick={() => {
                                        setIsAddDiscussion(false);
                                    }}
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    className='small-blue-button'
                                    onClick={() => {
                                        handleAddNewDiscussion(dataAddDiscussion, setIsAddDiscussion, setDataAddDiscussion);
                                    }}
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
            <>
                {
                    isShowReply ? (
                        <button
                            className='font-medium text-lg mt-12 border-b border-black border-1'
                            onClick={() => setIsShowReply(false)}
                        >
                            QUAY LẠI
                        </button>
                    ) : (
                        <h1 className='font-medium text-lg mt-12 mb-4'>DANH SÁCH CÁC THẢO LUẬN</h1>
                    )
                }
            </>
            <>
                {
                    isShowReply ? (
                        <RenderReply iddiscussion={discussionID} courseId={courseId} />
                    ) : (
                        <div className='w-full'>
                            <div className='flex-between h-8 border-b-2 border-solid border-gray-300'>
                                <div className='w-1/4 text-lg font-medium ml-8'>
                                    Tên chủ đề thảo luận
                                </div>
                                <div className='w-1/4 text-lg font-medium '>
                                    Bắt đầu bởi
                                </div>
                                <div className='w-1/4 text-lg font-medium '>
                                    Bắt đầu lúc
                                </div>
                                <div className='w-1/4 text-lg font-medium mr-8'>
                                    Lần cập nhật gần nhất
                                </div>
                            </div>
                            <div className={`h-${12 * pageSize}`}>
                                {
                                    discussions && discussions.slice(pagingInfo.curPage * pageSize, pagingInfo.curPage * pageSize + pageSize).map((discussion) => (
                                        <div
                                            key={discussion._id}
                                            // href={{ pathname: `/discussion/${courseId}/${discussion._id}`, query: { course: courseName } }}
                                            className='flex-between h-12 hover:cursor-pointer hover:bg-gray-100 border-b border-solid border-gray-300'
                                            onClick={() => {
                                                setIsShowReply(true);
                                                setDiscussionID(discussion._id)
                                            }}
                                        >
                                            <div className='w-1/4 ml-8'>
                                                {discussion.title}
                                            </div>
                                            <div className='w-1/4 flex'>
                                                <Image
                                                    className="rounded-2xl mr-2"
                                                    src='/assets/images/avatar.svg'
                                                    alt="Avatar Picture"
                                                    width={30}
                                                    height={30}
                                                />
                                                {discussion.createdBy.fullname}
                                            </div>
                                            <div className='w-1/4 '>
                                                {discussion.createdAt.slice(0, 10)}
                                            </div>
                                            <div className='w-1/4 mr-8'>
                                                {discussion.updatedAt.slice(0, 10)}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='w-full flex-between'>
                                <div className='opacity-0'>!!!</div>
                                <div className='mt-4 flex-between'>
                                    <div className='flex-between'>
                                        <div className='mr-2'>Số dòng:</div>
                                        <div className="">
                                            <select
                                                id="pageSize"
                                                onChange={(e) => {
                                                    setPageSize(e.target.value)
                                                    setPagingInfo({...pagingInfo, maxPage: Math.ceil(discussions.length / e.target.value) - 1})
                                                }}
                                                className="input text-sm text-black"
                                            >
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                            </select>
                                        </div>
                                    </div>
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
            </>
        </div>
    )
}

export default RenderDiscussion