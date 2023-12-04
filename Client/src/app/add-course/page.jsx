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
            title_className: 'w-1/3',
            value: '',
            placeholders: 'Nhập tên khóa học vào đây',
            className: 'mb-4 w-full flex-between',
            input_className: 'w-2/3 h-[36px] text-base font-normal border border-solid border-gray-400 p-1'
        },
        {
            title: 'Giá tiền',
            title_className: 'w-1/3',
            value: '',
            placeholders: 'Giá tiền của khóa học',
            className: 'mb-4 w-full flex-between',
            input_className: 'w-2/3 h-[36px] text-base font-normal border border-solid border-gray-400 p-1'
        },
        {
            title: 'Hình ảnh kèm theo',
            title_className: 'w-1/3',
            value: '',
            placeholders: 'Tải lên hình ảnh của bạn',
            button_title: 'Tải lên',
            fileType: 'image',
            className: 'mb-4 w-full h-40 flex justify-between',
            input_className: 'w-2/3 h-4/5 text-base font-normal border border-solid border-gray-400 p-1'
        },
        {
            title: 'Mô tả kèm theo',
            title_className: 'w-1/3',
            value: '',
            placeholders: 'Nhập mô tả khóa học',
            className: 'mb-4 w-full flex justify-between h-60 ',
            input_className: 'w-2/3 h-4/5 text-base font-normal border border-solid border-gray-400 p-1 align-top'
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

        formData.append("title", data.title)
        formData.append("price", Number(data.price))
        formData.append("image", data.image, data.image.name)
        formData.append("description", data.description)

        axios.post(`http://localhost:8080/api/v1/course/create`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": `multipart/form-data`,
            }
        }).then((response) => {
            if (response.statusText === 'OK') {
                successNotifi('Tạo khóa học thành công!.');
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
                errorNotifi('Tạo khóa học thất bại!.');
            }
        })
    }

    return (
        <div className='relative w-full mt-4'>
            <div className='w-full flex flex-col'>
                <FilterSearch title="KHÓA HỌC ĐANG GIẢNG DẠY" />
            </div>
            <div className='mx-12 mt-10'>
                <h2 className='text-xl font-medium mb-2'>Thêm khóa học</h2>
                <div className='border border-solid border-gray-400 rounded-lg'>
                    <div className='px-8 bg-white mb-2'>
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