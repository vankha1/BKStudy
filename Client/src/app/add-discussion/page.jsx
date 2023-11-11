import Link from "next/link";
import Image from "next/image";

import React from 'react'
import AddActions from "@components/AddActions";
import FilterSearch from "@components/FilterSearch";

const discusion = [
    {
        title: 'Tiêu đề thảo luận',
        value: '',
        placeholders: 'Nhập tiêu đề thảo luận vào đây',
        className: 'mb-4 w-full',
        input_className: 'w-full h-[36px] text-base font-normal border border-solid p-1 align-top'
    },
    {
        title: 'Nội dung của thảo luận',
        value: '',
        placeholders: 'Nhập nội dung của thảo luận vào đây',
        className: 'mb-4 w-full h-60 ',
        input_className: 'w-full h-4/5 text-base font-normal border border-solid p-1 align-top'
    },

]

const AddDiscussion = () => {

    return (
        <div className='w-full mt-4'>
            <div className='w-full flex flex-col'>
                <FilterSearch title="KHÓA HỌC ĐANG GIẢNG DẠY" />
            </div>
            <div className='mx-32 mt-10'>
                <h2 className='text-xl font-medium'>Thêm chủ đề thảo luận</h2>
                <div className='border border-solid border-black'>
                    <div className='px-8 bg-white'>
                        <div className='w-full mt-4'>
                            <AddActions infos={discusion} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDiscussion