'use client';
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import FilterSearch from "@components/FilterSearch";
import Notification, { errorNotifi, successNotifi } from "@components/Notification";

const RenderReply = ({ id, iddiscussion }) => {
    const [discussion, setDiscussion] = useState();
    const [isReply, setIsReply] = useState(false);
    const [reply, setReply] = useState('');
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
    
    useEffect(() => {
        const token = localStorage.getItem("JWT");
        axios
            .get('http://localhost:8080' + `/api/v1/discussion/${id}/${iddiscussion}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then((responses) => {
                if (responses.data && responses.data.discussion) {
                    setDiscussion(responses.data.discussion);
                } else {
                    console.log('Invalid response format');
                }
            })
            .catch(error => {
                console.log('error');
            });
    }, [])

    const handleAddNewReply = () => {
        const token = localStorage.getItem("JWT");
        const data = {
            content: reply
        }
        const date = new Date();
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');

            return `${year}-${month}-${day}`;
        }
        const newData = {
            content: reply,
            createdBy: {
                fullname: userInfo ? userInfo.fullname : undefined,
                _id: userInfo._id
            },
            createdAt: formatDate(date),
        }

        axios
            .post('http://localhost:8080' + `/api/v1/discussion/${id}/${iddiscussion}/createReply`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((responses) => {
                successNotifi('Thêm bình luận thành công!.');
            })
            .catch(error => {
                errorNotifi('Thêm bình luận thất bại!.');
            });

        const existingReplies = discussion ? discussion.replies : [];
        setDiscussion({
            ...discussion,
            replies: [...existingReplies, newData],
        });
        setReply('');
    }

    const handleDeleteReply = (discussionId, id) => {
        const token = localStorage.getItem("JWT");
        axios
            .delete('http://localhost:8080' + `/api/v1/discussion/${id}/${discussionId}/deleteReply/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then((responses) => {
                const newData = discussion.replies.filter(item => item._id !== id);
                setDiscussion({...discussion, replies: newData});
                successNotifi('Xóa bình luận thành công!.');
            })
            .catch(error => {
                console.log(error);
                errorNotifi('Xóa bình luận thất bại!.');
            });
    }

    return (
        <div className='w-full mt-4'>
            <div className='w-full mt-10 border border-solid border-gray-200 rounded-lg hover:bg-gray-100'>
                <div className="flex-start mt-4 mx-4">
                    <Image
                        className="rounded-2xl py-2 hover:cursor-pointer mr-2"
                        src='/assets/images/avatar.svg'
                        alt="Avatar User"
                        width={60}
                        height={60}
                    />
                    <div className="w-full mt-2 ml-2 mb-4">
                        <h1 className="font-medium text-xl">{discussion && discussion.title}</h1>
                        <div className="flex">
                            <h2 className="text-base pr-1">Được tạo bởi</h2>
                            <h2 className="text-base text-blue-500 pr-1">{discussion && discussion.createdBy.fullname}</h2>
                            <h2 className="text-base pr-1">vào lúc</h2>
                            <h2 className="text-base text-blue-500 pr-1">{discussion && discussion.createdAt.slice(0, 10)}</h2>
                        </div>
                        <div className="w-full flex-between">
                            <h2 className="w-4/5 text-base mt-4">{discussion && discussion.content}</h2>
                            <div className="flex">
                                <button
                                    className="small-light-blue-button"
                                    onClick={() => setIsReply(true)}
                                >
                                    Trả lời
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <>
                {
                    isReply ? (
                        <div className="mt-4 border border-solid border-gray-200 rounded-lg">
                            <div className="flex-between mx-4 my-4">
                                <textarea
                                    type='text'
                                    className='w-full h-28 border border-solid border-gray-300 focus:border-gray-300 focus:outline-none pl-2 pt-2 rounded-lg'
                                    placeholder='Nhập câu trả lời'
                                    defaultValue={reply}
                                    onChange={(e) => {
                                        setReply(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex-between mb-4">
                                <div className="opacity-0">!!!</div>
                                <div className='flex mr-4'>
                                    <button
                                        className='small-gray-button mr-8'
                                        onClick={() => {
                                            setIsReply(false);
                                        }}
                                    >
                                        Hủy bỏ
                                    </button>
                                    <button
                                        className='small-blue-button'
                                        onClick={() => {
                                            handleAddNewReply();
                                            setIsReply(false);
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
            </>
            <>
                {
                    discussion && discussion.replies.map((item, index) => (
                        <div key={item._id || index} className='mt-8 ml-16 border border-solid border-gray-200 rounded-lg hover:bg-gray-100'>
                            <div className="flex-start mt-4 mx-4">
                                <Image
                                    className="rounded-2xl py-2 hover:cursor-pointer mr-2"
                                    src='/assets/images/avatar.svg'
                                    alt="Avatar User"
                                    width={40}
                                    height={40}
                                />
                                <div className="w-full mt-1 ml-2 mb-2">
                                    <div className="flex">
                                        <h1 className="font-medium text-lg pr-1">Trả lời</h1>
                                        <h1 className="font-medium text-lg text-blue-500">{discussion && discussion.title}</h1>
                                    </div>
                                    <div className="flex">
                                        <h2 className="text-sm pr-1">Được tạo bởi</h2>
                                        <h2 className="text-sm text-blue-500 pr-1">{item.createdBy.fullname}</h2>
                                        <h2 className="text-sm pr-1">vào lúc</h2>
                                        <h2 className="text-sm text-blue-500 pr-1">{item.createdAt.slice(0, 10)}</h2>
                                    </div>
                                    <div className="w-full flex-between">
                                        <h2 className="w-4/5 text-sm mt-2">{item.content}</h2>
                                        {
                                            userInfo && userInfo._id === item.createdBy._id ? (
                                                <button
                                                    className="w-28 bg-gray-300 text-sm text-black font-semibold py-[4px] rounded-md hover:bg-gray-400"
                                                    onClick={() => {
                                                        handleDeleteReply(discussion._id, item._id)
                                                    }}
                                                >
                                                    Xóa bình luận
                                                </button>
                                            ) : (
                                                <></>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </>
            <Notification />
        </div>
    )
}

export default RenderReply