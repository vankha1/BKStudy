"use client"; // This is a client component

import FilterSearch from '@components/FilterSearch';
import AddCourses from '@components/AddActions';

const AddLessons = () => {
    const infos = [
        {
            title: 'Thêm bài đọc',
            value: '',
            placeholders: 'Nhập bài học tại đây',
            className: 'mb-4 w-full h-60 ',
            input_className: 'w-full h-4/5 text-base font-normal border border-solid p-1 align-top'
        },
        {
            title: 'Thêm video',
            value: '',
            placeholders: 'Đường dẫn video',
            button_title: 'Tải lên',
            fileType: 'video',
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

    return (
        <div className='relative w-full mt-4'>
            <div className='w-full flex flex-col'>
                <div className='text-2xl font-bold top-0 left-0 mb-2 border-b border-solid border-black'>GIẢI TÍCH 1</div>
            </div>
            <div className='mx-32 mt-10'>
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

export default AddLessons