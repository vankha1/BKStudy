"use client"; // This is a client component
import { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation'
import AddCourses from '@components/AddActions';

import Notification, { errorNotifi, successNotifi, warningNotifi } from '@components/Notification';

const AddLessons = ({ params }) => {
    const infos = [
        {
            title: 'Thêm tiêu đề bài giảng',
            value: '',
            placeholders: 'Nhập tiêu đề bài giảng vào đây',
            className: 'mb-4 w-full',
            input_className: 'w-full h-[36px] text-base font-normal border border-solid p-1 rounded-lg'
        },
        {
            title: 'Thêm bài đọc',
            value: '',
            placeholders: 'Nhập bài học tại đây',
            className: 'mb-4 w-full h-60 ',
            input_className: 'w-full h-4/5 text-base font-normal border border-solid p-1 align-top rounded-lg'
        },
        {
            title: 'Thêm video',
            value: '',
            placeholders: 'Đường dẫn video',
            button_title: 'Tải lên',
            className: 'mb-4 w-full',
            input_className: 'w-3/4 h-[36px] text-base font-normal border border-solid p-1 rounded-lg'
        },
        {
            title: 'Các tập tin kèm theo',
            value: '',
            placeholders: 'Tải lên tập tin kèm theo',
            button_title: 'Tải lên',
            fileType: '*',
            type: 'mutil-file',
            className: 'mb-12 w-full',
            input_className: 'w-3/4 h-[36px] text-base font-normal border border-solid p-1 rounded-lg'
        },
    ]

    const [infoCourse, setInfoCourse] = useState({
        title: "",
        contents: "",
        videoURL: "",
        files: "",
    });

    const router = useRouter();
    const searchParams = useSearchParams();

    const courseName = searchParams.get('course');
    const indexChapter = searchParams.get('chapter');

    const handleCallAPI = (data) => {
        const formData = new FormData();
        const token = localStorage.getItem("JWT")
        data.title ? formData.append("title", data.title) : warningNotifi('Bạn chưa nhập tên bài giảng!.');
        data.contents ? formData.append("contents", data.contents) : warningNotifi('Bạn chưa nhập nội dung bài đọc!.');
        data.videoURL ? formData.append("videoURL", data.videoURL) : null;
        if (data?.files?.length) {
            for (let i = 0; i < data.files.length; i++) {
                formData.append('files', data.files[i]);
            }
        }
        formData.append("chapter", indexChapter);
        if (data.title && data.contents) {
            axios.post('http://localhost:8080' + `/api/v1/lesson/create/${params?.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": `multipart/form-data`,
                }
            }).then((response) => {
                console.log(response)
                if (response.statusText === 'Created') {
                    successNotifi('Tạo bài giảng thành công!.');
                }
                else {
                    warningNotifi('Có lỗi xảy ra, thử lại sau!.');
                }
                setTimeout(() => {
                    router.push(`/edit-course/${params?.id}`);
                }, 1000);
            }).catch((error) => {
                if (error.response && error.response.status === 401 && error.response.data.message === 'jwt expired') {
                    errorNotifi('Vui lòng đăng nhập lại!.');
                } else {
                    errorNotifi('Tạo bài giảng thất bại!.');
                }
            })
        }
    }

    return (
        <div className='relative w-full mt-4'>
            <div className='w-full flex flex-col'>
                <div className='text-2xl font-bold top-0 left-0 mb-2 border-b border-solid border-black'>{courseName.toUpperCase()}</div>
            </div>
            <div className='mx-32 mt-10'>
                <div className='border border-solid border-black pb-2 px-1 rounded-xl'>
                    <div className='px-8 bg-white'>
                        <div className='w-full mt-4'>
                            <AddCourses infos={infos} infoCourse={infoCourse} setInfoCourse={setInfoCourse} handlGetDataForAPI={handleCallAPI} router={router} path={`/edit-course/${params?.id}`} />
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    )
}

export default AddLessons