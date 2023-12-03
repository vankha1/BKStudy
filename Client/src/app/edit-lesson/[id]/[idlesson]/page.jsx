"use client"; // This is a client component
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from "next/navigation"
import AddCourses from '@components/AddActions';

import Notification, { errorNotifi, successNotifi, warningNotifi } from '@components/Notification';

const EditLesson = ({ params }) => {
    const [infos, setInfos] = useState([
        {
            title: 'Chỉnh sửa tiêu đề bài giảng',
            data: '',
            placeholders: 'Nhập tiêu đề bài giảng vào đây',
            className: 'mb-4 w-full',
            input_className: 'w-full h-[36px] text-base font-normal border border-solid p-1'
        },
        {
            title: 'Chỉnh sửa bài đọc',
            data: '',
            placeholders: 'Nhập bài học tại đây',
            className: 'mb-4 w-full h-60 ',
            input_className: 'w-full h-4/5 text-base font-normal border border-solid p-1 align-top'
        },
        {
            title: 'Chỉnh sửa video',
            data: '',
            placeholders: 'Đường dẫn video',
            button_title: 'Tải lên',
            className: 'mb-4 w-full',
            input_className: 'w-3/4 h-[36px] text-base font-normal border border-solid p-1'
        },
        {
            title: 'Các tập tin kèm theo',
            data: null,
            placeholders: 'Tải lên tập tin kèm theo',
            button_title: 'Tải lên',
            fileType: '*',
            className: 'mb-12 w-full',
            input_className: 'w-3/4 h-[36px] text-base font-normal border border-solid p-1'
        },
    ])
    const [lesson, setLesson] = useState();
    const router = useRouter();
    const searchParams = useSearchParams()
    const courseName = searchParams.get('course');
    const [infoLesson, setInfoLesson] = useState({
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
            .then((responses) => {
                setLesson(responses.data.lesson);
                const newInfos = [...infos];
                newInfos[0].data = responses.data.lesson.title,
                newInfos[1].data = responses.data.lesson.contents,
                newInfos[2].data = responses.data.lesson.videoURL,
                newInfos[3].data = responses.data.lesson.attachedFiles
                setInfos(newInfos);
            })
            .catch(error => {
                console.log(error)
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("JWT");
        const filepath = 'D:/STUDY/HK231/Đồ án/Coding/BKStudy/Server/files/1700893113290.pdf';
        axios
            .get('http://localhost:8080' + `/api/v1/lesson/file/${encodeURIComponent(filepath)}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/pdf'
                },
            })
            .then((responses) => {
                console.log(responses)
            })
            .catch(error => {
                console.log(error)
            });
    }, [])

    const handleDeleteLesson = () => {
        const token = localStorage.getItem("JWT");
        axios.delete('http://localhost:8080' + `/api/v1/lesson/delete?courseId=${params?.id}&lessonId=${params?.idlesson}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.statusText === 'OK') {
                successNotifi('Xóa bài học thành công!.');
            }
            else {
                errorNotifi('Xóa bài học thất bại!.');
            }
            router.push(`edit-course/${params?.id}`)
        }).catch((error) => errorNotifi('Có lỗi xảy ra, vui lòng thử lại!.'))
    }

    const handleCallAPI = (data) => {
        const token = localStorage.getItem("JWT")
        const formData = new FormData()

        formData.append("title", data.title)
        formData.append("contents", data.contents)
        formData.append("videoURL", data.videoURL)
        formData.append("files", data.files)
        // formData.append("chapter", params?.index)
        console.log('api', data);
        axios.put('http://localhost:8080' + `/api/v1/lesson/update?courseId=${params?.id}&lessonId=${params?.idlesson}`, formData, {
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
            console.log(error);
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
                    <button className='medium-red-button mb-2' onClick={handleDeleteLesson}>Xóa bài giảng</button>
                </div>
                <div className='border border-solid border-black'>
                    <div className='px-8 bg-white'>
                        <div className='w-full mt-4'>
                            <AddCourses infos={infos} infoCourse={infoLesson} setInfoCourse={setInfoLesson} handlGetDataForAPI={handleCallAPI} />
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    )
}

export default EditLesson