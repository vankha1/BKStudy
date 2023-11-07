import Image from 'next/image';
import Link from 'next/link';

import FilterSearch from '@components/FilterSearch';

const COURSES = [
    {
        course_name: 'Cấu trúc dữ liệu và giải thuật',
        number_register: '1000',
        image: '/assets/images/course_image.jpg',
        href: '/dsa'
    },
    {
        course_name: 'Cấu trúc dữ liệu và giải thuật',
        number_register: '1000',
        image: '/assets/images/course_image.jpg',
        href: '/dsa'
    },
    {
        course_name: 'Cấu trúc dữ liệu và giải thuật',
        number_register: '1000',
        image: '/assets/images/course_image.jpg',
        href: '/dsa'
    },
    {
        course_name: 'Cấu trúc dữ liệu và giải thuật',
        number_register: '1000',
        image: '/assets/images/course_image.jpg',
        href: '/dsa'
    }
]

const ManageCourses = () => {

    return (
        <div className='relative w-full mt-4'>
            <div className='w-full flex flex-col'>
                <div className='text-xl font-bold top-0 left-0 mb-2'>KHÓA HỌC ĐANG GIẢNG DẠY</div>
                <FilterSearch />
                <Link href='add-course' className='w-full relative mt-4'>
                    <button className='medium-blue-button float-right'>Thêm khóa học</button>
                </Link>
            </div>
            <div className='w-full flex flex-col'>
                {COURSES.map((course, index) => (
                    <Link href={course.href} className='px-8 py-4 rounded-lg shadow-lg mb-8 cursor-pointer transfrom-action flex flex-row'>
                    <Image
                        className="rounded-xl py-2"
                        src={course.image}
                        alt="Courses Picture"
                        width={140}
                        height={64}
                        priority
                    />
                    <div className='pl-4 '>
                        <h3 className='text-3xl font-medium mb-2'>{course.course_name}</h3>
                        <p className='text-base font-normal'>Số lượng sinh viên đăng kí: {course.number_register}</p>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ManageCourses;