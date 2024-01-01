"use client"; // This is a client component
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from "next/navigation"
import AddCourses from '@components/AddActions';

import Notification, { errorNotifi, successNotifi, warningNotifi } from '@components/Notification';
import LoadingState from '@components/LoadingState';

const EditLesson = ({ params }) => {
    const [infos, setInfos] = useState([
        {
            title: 'Chỉnh sửa tiêu đề bài giảng',
            data: '',
            placeholders: 'Nhập tiêu đề bài giảng vào đây',
            className: 'mb-4 w-full',
            input_className: 'w-full h-[36px] text-base font-normal border border-solid p-1 rounded-lg'
        },
        {
            title: 'Chỉnh sửa bài đọc',
            data: '',
            placeholders: 'Nhập bài học tại đây',
            className: 'mb-4 w-full h-60 ',
            input_className: 'w-full h-4/5 text-base font-normal border border-solid p-1 align-top rounded-lg'
        },
        {
            title: 'Chỉnh sửa video',
            data: '',
            placeholders: 'Đường dẫn video',
            button_title: 'Tải lên',
            className: 'mb-4 w-full',
            input_className: 'w-3/4 h-[36px] text-base font-normal border border-solid p-1 rounded-lg'
        },
        {
            title: 'Các tập tin kèm theo',
            data: null,
            placeholders: 'Tải lên tập tin kèm theo',
            button_title: 'Tải lên',
            fileType: '*',
            type: 'mutil-file',
            className: 'mb-12 w-full',
            input_className: 'w-3/4 h-[36px] text-base font-normal border border-solid p-1 rounded-lg'
        },
    ])
    const [oldInfos, setOldInfos] = useState([
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
    const indexChpater = searchParams.get('chapter');
    const [infoLesson, setInfoLesson] = useState({
        title: " ",
        contents: " ",
        videoURL: " ",
        files: " ",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("JWT");
        axios
            .get('http://localhost:8080' + `/api/v1/lesson/course?courseId=${params?.id}&lessonId=${params?.idlesson}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((responses) => {
                setLesson(responses.data.lesson);
                const newInfos = [...infos];
                newInfos[0].data = responses.data.lesson.title;
                newInfos[1].data = responses.data.lesson.contents;
                newInfos[2].data = responses.data.lesson.videoURL;
                newInfos[3].data = responses.data.lesson && responses.data.lesson.attachedFiles ? responses.data.lesson.attachedFiles : '';
                setInfos(_.cloneDeep(newInfos));
                setOldInfos(_.cloneDeep(newInfos));
            })
            .catch(error => {
                console.log(error)
            });
        setLoading(false);
    }, []);

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
            setTimeout(() => {
                router.push(`/edit-course/${params?.id}`);
            }, 1000);
        }).catch((error) => errorNotifi('Có lỗi xảy ra, vui lòng thử lại!.'))
    }

    const handleCallAPI = (data) => {
        const token = localStorage.getItem("JWT")
        const formData = new FormData()
        let oldFiles = []
        data.title == oldInfos[0].data ? null : formData.append("title", data.title);
        data.contents == oldInfos[1].data ? null : formData.append("contents", data.contents);
        data.videoURL == oldInfos[2].data ? null : formData.append("videoURL", data.videoURL);

        if (JSON.stringify(data.files) === JSON.stringify(oldInfos[3].data)) {
            
        } else {
            let isAddNewFile = false;
            for (let i in data.files) {
                if (data.files[i].filename) {

                } else {
                    isAddNewFile = true
                }
            }
            if (isAddNewFile) {
                for (let i in data.files) {
                    data.files[i].filename ? oldFiles.push(data.files[i]) : formData.append("files", data.files[i]);;
                }
            } else {
                oldFiles = data.files;
            }
        }

        oldFiles.length ? formData.append("oldFiles", JSON.stringify(oldFiles)) : null;

        data.title != ' ' ? null : warningNotifi('Bạn chưa nhập tiêu đề bài giảng!.');
        data.contents != ' ' ? null : warningNotifi('Bạn chưa nhập nội dung bài giảng!.');

        if (data.title != ' ' && data.contents != ' ') {
            axios.put('http://localhost:8080' + `/api/v1/lesson/update?courseId=${params?.id}&chapter=${indexChpater}&lessonId=${params?.idlesson}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": `multipart/form-data`,
                }
            }).then((response) => {
                console.log(response);
                if (response.statusText === 'Accepted') {
                    successNotifi('Chỉnh sửa bài giảng thành công!.');
                    console.log(response);
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
    }

    return (
        <div>
            {
                loading ? (
                    <LoadingState title='Đang tải...' />
                ) : (
                    <div className='relative w-full mt-4'>
                        <div className='w-full flex flex-col'>
                            <div className='text-2xl font-bold top-0 left-0 mb-2 border-b border-solid border-black'>{courseName.toUpperCase()}</div>
                        </div>
                        <div className='mx-32 mt-10'>
                            <div className='flex flex-between'>
                                <h2 className='text-2xl font-semibold mb-4'>CHỈNH SỬA BÀI GIẢNG</h2>
                                <button className='medium-red-button mb-4' onClick={handleDeleteLesson}>Xóa bài giảng</button>
                            </div>
                            <div className='border border-solid border-black rounded-lg px-1 pb-2'>
                                <div className='px-8 bg-white'>
                                    <div className='w-full mt-4'>
                                        <AddCourses infos={infos} infoCourse={infoLesson} setInfoCourse={setInfoLesson} handlGetDataForAPI={handleCallAPI} path={`/edit-course/${params?.id}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Notification />
                    </div>
                )
            }
        </div>
    )
}

export default EditLesson