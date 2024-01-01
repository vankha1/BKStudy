"use client"; // This is a client component
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation"

import FilterSearch from '@components/FilterSearch';
import AddCourses from '@components/AddActions';
import Notification, { errorNotifi, successNotifi, warningNotifi } from '@components/Notification';

const AddCourse = () => {
    const router = useRouter();
    const infos = [
        {
            title: 'Tên khóa học',
            value: '',
            placeholders: 'Nhập tên khóa học vào đây',
            className: 'mb-4 w-3/4',
            input_className: 'w-5/6 h-[36px] text-base font-normal border border-solid p-1 rounded-lg'
        },
        {
            title: 'Giá tiền',
            value: '',
            placeholders: 'Giá tiền của khóa học',
            className: 'mb-4 w-1/4',
            input_className: 'w-full h-[36px] text-base font-normal border border-solid p-1 rounded-lg'
        },
        {
            title: 'Hình ảnh kèm theo',
            value: '',
            placeholders: 'Đường dẫn hình ảnh',
            button_title: 'Tải lên',
            fileType: 'image',
            type: 'single-file',
            className: 'mb-4 w-full',
            input_className: 'w-4/5 h-[36px] text-base font-normal border border-solid p-1 rounded-lg'
        },
        {
            title: 'Mô tả kèm theo',
            value: '',
            placeholders: 'Nhập mô tả khóa học',
            className: 'mb-4 w-full h-60 ',
            input_className: 'w-full h-4/5 text-base font-normal border border-solid p-1 align-top rounded-lg'
        },
    ]


    const [infoCourse, setInfoCourse] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
    })

    const handleCallAPI = (data) => {
        const token = localStorage.getItem("JWT")
        const formData = new FormData()
        data.title ? formData.append("title", data.title) : warningNotifi('Chưa nhập tên khóa!.');
        data.price ? formData.append("price", Number(data.price)) : warningNotifi('Chưa nhập giá tiền!.');
        data.image ? formData.append("image", data.image, data.image.name) : warningNotifi('Chưa tải lên hình ảnh!.');
        data.description ? formData.append("description", data.description) : warningNotifi('Chưa có mô tả khóa học!.');

        if (data.title && data.image && data.price && data.description) {
            axios.post(`http://localhost:8080/api/v1/course/create`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": `multipart/form-data`,
                }
            }).then((response) => {
                if (response.statusText === 'OK') {
                    successNotifi('Gửi yêu cầu thành công!.');
                }
                else {
                    warningNotifi('Có lỗi xảy ra, thử lại sau!.')
                }
                setTimeout(() => {
                    router.push('/lecturer-manage');
                }, 1000);
            }).catch((error) => {
                if (error.response && error.response.status === 401 && error.response.data.message === 'jwt expired') {
                    errorNotifi('Vui lòng đăng nhập lại!.');
                } else {
                    errorNotifi('Gửi yêu cầu thất bại!.');
                }
            })
        }
    }

    return (
        <div className='relative w-full mt-4'>
            <div className='w-full flex flex-col'>
                <FilterSearch title="KHÓA HỌC ĐANG GIẢNG DẠY" />
            </div>
            <div className='mx-32 mt-10'>
                <h2 className='text-2xl font-medium mb-2'>Thêm khóa học</h2>
                <div className='border border-solid border-black rounded-xl pb-1 px-1'>
                    <div className='px-8 bg-white'>
                        <div className='w-full mt-4'>
                            <AddCourses infos={infos} infoCourse={infoCourse} setInfoCourse={setInfoCourse} handlGetDataForAPI={handleCallAPI} router={router} path='lecturer-manage' />
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    )
}

export default AddCourse;