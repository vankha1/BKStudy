"use client"; // This is a client component

import FilterSearch from '@components/FilterSearch';
import AddCourses from '@components/AddActions';

const AddCourse = () => {

    const infos = [
        {
            title: 'Tên khóa học',
            value: '',
            placeholders: 'Nhập tên khóa học vào đây',
            className: 'mb-4 w-3/4',
            input_className: 'w-5/6 h-[36px] text-base font-normal border border-solid p-1'
        },
        {
            title: 'Giá tiền',
            value: '',
            placeholders: 'Giá tiền của khóa học',
            className: 'mb-4 w-1/4',
            input_className: 'w-full h-[36px] text-base font-normal border border-solid p-1'
        },
        {
            title: 'Hình ảnh kèm theo',
            value: '',
            placeholders: 'Đường dẫn hình ảnh',
            button_title: 'Tải lên hình ảnh',
            className: 'mb-4 w-full',
            input_className: 'w-4/5 h-[36px] text-base font-normal border border-solid p-1'
        },
        {
            title: 'Mô tả kèm theo',
            value: '',
            placeholders: 'Nhập mô tả khóa học',
            className: 'mb-4 w-full h-60 ',
            input_className: 'w-full h-4/5 text-base font-normal border border-solid p-1 align-top'
        },
    ]

    return (
        <div className='relative w-full mt-4'>
            <div className='w-full flex flex-col'>
                <FilterSearch title="KHÓA HỌC ĐANG GIẢNG DẠY"/>
            </div>
            <div className='mx-32 mt-10'>
                <h2 className='text-xl font-medium'>Thêm khóa học</h2>
                <div className='border border-solid border-black'>
                    <div className='px-8 bg-white'>
                        <div className='w-full mt-4'>
                            <AddCourses infos={infos} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCourse;