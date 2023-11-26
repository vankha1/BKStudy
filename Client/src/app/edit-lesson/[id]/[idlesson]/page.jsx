"use client"; // This is a client component
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from "next/navigation"
import AddCourses from '@components/AddActions';

import Notification, { errorNotifi, successNotifi, warningNotifi } from '@components/Notification';

const EditLesson = ({ params }) => {
    const infos = [
        {
            title: 'Chỉnh sửa tiêu đề bài giảng',
            value: '',
            placeholders: 'Nhập tiêu đề bài giảng vào đây',
            className: 'mb-4 w-full',
            input_className: 'w-full h-[36px] text-base font-normal border border-solid p-1'
        },
        {
            title: 'Chỉnh sửa bài đọc',
            value: '',
            placeholders: 'Nhập bài học tại đây',
            className: 'mb-4 w-full h-60 ',
            input_className: 'w-full h-4/5 text-base font-normal border border-solid p-1 align-top'
        },
        {
            title: 'Chỉnh sửa video',
            value: '',
            placeholders: 'Đường dẫn video',
            button_title: 'Tải lên',
            className: 'mb-4 w-full',
            input_className: 'w-3/4 h-[36px] text-base font-normal border border-solid p-1'
        },
        {
            title: 'Các tập tin kèm theo',
            value: '',
            placeholders: 'Tải lên tập tin kèm theo',
            button_title: 'Tải lên',
            fileType: '*',
            className: 'mb-12 w-full',
            input_className: 'w-3/4 h-[36px] text-base font-normal border border-solid p-1'
        },
    ]

    const router = useRouter();
    const searchParams = useSearchParams()
    const courseName = searchParams.get('course');
    const [infoCourse, setInfoCourse] = useState({
        title: "",
        contents: "",
        videoURL: "",
        files: "",
    })

    useEffect(() => {
        const token = localStorage.getItem("JWT");
        axios
            .get('http://localhost:8080' + `/api/v1/lesson/course?courseId=${params?.id}&lessonId=${params?.idlesson}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((data) => {
                console.log(data)
            })
            .catch(error => {
                console.log('error')
            });
    }, []);
    console.log(params?.idlesson);

    const handleCallAPI = (data) => {
        const token = localStorage.getItem("JWT")
        const formData = new FormData()

        formData.append("title", data.title)
        formData.append("contents", data.contents)
        formData.append("videoURL", data.videoURL)
        formData.append("files", data.files)
        formData.append("chapter", params?.index)

        console.log(data, formData, params?.index);
        axios.post('http://localhost:8080' + `/api/v1/lesson/create/${params?.id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": `multipart/form-data`,
            }
        }).then((response) => {
            console.log(response);
            if (response.statusText === 'Created') {
                successNotifi('Chỉnh sửa bài giảng thành công!.');
            }
            else {
                warningNotifi('Có lỗi xảy ra, thử lại sau!.')
            }
            setTimeout(() => {
                router.push(`/edit-course/${params?.id}`);
            }, 1000);
        }).catch((error) => {
            if (error.response && error.response.status === 401 && error.response.data.message === 'jwt expired') {
                errorNotifi('Vui lòng đăng nhập lại!.');
            } else {
                errorNotifi('Chỉnh sửa bài giảng thất bại!.');
            }
        })
    }

    return (
        <div className='relative w-full mt-4'>
            <div className='w-full flex flex-col'>
                <div className='text-2xl font-bold top-0 left-0 mb-2 border-b border-solid border-black'>{courseName.toUpperCase()}</div>
            </div>
            <div className='mx-32 mt-10'>
                <div className='flex flex-between'>
                <h2 className='text-xl font-semibold mb-2'>CHỈNH SỬA BÀI GIẢNG</h2>
                <button className='medium-red-button mb-2'>Xóa bài giảng</button>
                </div>
                <div className='border border-solid border-black'>
                    <div className='px-8 bg-white'>
                        <div className='w-full mt-4'>
                            <AddCourses infos={infos} infoCourse={infoCourse} setInfoCourse={setInfoCourse} handlGetDataForAPI={handleCallAPI} />
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    )
}

export default EditLesson