'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import EditData from '../../components/EditInfoUser';
import UploadImage from '@components/UploadFile';

const USER_INFO = {
  info: [
    {
      title: 'Quyền truy cập',
      data: 'Giáo viên'
    },
    {
      title: 'Email',
      data: 'nguyenvana@gmail.com'
    },
    {
      title: 'Họ tên',
      data: 'Nguyễn Văn A'
    },
    {
      title: 'Ngày tháng năm sinh',
      data: '20/12/2000'
    },
    {
      title: 'Số điện thoại',
      data: '0123456789'
    },
  ],
  courses: [
    {
      course_name: 'Cấu trúc dữ liệu và giải thuật',
      description: 'Khóa học giúp rèn luyện tư duy về cấu trúc dữ liệu và các loại giải thuật, giúp sinh viên có thể giải quyết nhiều vấn đề khác nhau.',
      image: '/assets/images/course_image.jpg',
      href: '/dsa'
    },
    {
      course_name: 'Cấu trúc dữ liệu và giải thuật',
      description: 'Khóa học giúp rèn luyện tư duy về cấu trúc dữ liệu và các loại giải thuật, giúp sinh viên có thể giải quyết nhiều vấn đề khác nhau.',
      image: '/assets/images/course_image.jpg',
      href: '/dsa'
    },
    {
      course_name: 'Cấu trúc dữ liệu và giải thuật',
      description: 'Khóa học giúp rèn luyện tư duy về cấu trúc dữ liệu và các loại giải thuật, giúp sinh viên có thể giải quyết nhiều vấn đề khác nhau.',
      image: '/assets/images/course_image.jpg',
      href: '/dsa'
    },
    {
      course_name: 'Cấu trúc dữ liệu và giải thuật',
      description: 'Khóa học giúp rèn luyện tư duy về cấu trúc dữ liệu và các loại giải thuật, giúp sinh viên có thể giải quyết nhiều vấn đề khác nhau.',
      image: '/assets/images/course_image.jpg',
      href: '/dsa'
    }
  ]
}

const Profile = () => {

  return (
    <div className='w-full'>
      <div className='relative w-full h-80 mt-4'>
        <div className='h-72 mx-8 rounded-3xl bg-blue-300'>
        </div>
        <div className='absolute bottom-0 left-40 flex justify-between'>
          <div className='w-40 h-40 rounded-full flex-center bg-white'>
            <Image
              className=""
              src="/assets/images/avatar.svg"
              alt="Profile Picture"
              width={130}
              height={130}
              priority
            />
          </div>
          <h2 className='pl-8 mt-20 text-3xl font-medium'>
            {USER_INFO.info.find((item) => item.title == 'Họ tên').data.toUpperCase()}
          </h2>
        </div>
        <div className='absolute bottom-12 right-20 flex-between cursor-pointer'>
          <Image
            className=""
            src='/assets/icons/upload.svg'
            alt="Profile Picture"
            width={30}
            height={30}
            priority
          />
          <UploadImage title='Đổi ảnh bìa' className='text-xl ml-2 font-normal' />
        </div>
      </div>
      <div className='flex justify-between mx-16'>
        <div className='relative flex-col pt-8'>
          <div className='px-16 py-4 rounded-lg shadow-lg mb-8'>
            <h3 className='text-xl font-medium mb-3 border-b border-solid border-black'>Quyền truy cập</h3>
            <p className='text-base font-normal'>{USER_INFO.info.find((item) => item.title == 'Quyền truy cập').data}</p>
          </div>
          <div className='w-full px-16 py-4 rounded-lg shadow-lg mb-8'>
            <h3 className='w-52 text-xl font-medium mb-3 border-b border-solid border-black'>Thông tin tài khoản</h3>
            <div className='mb-4'>
              <h4 className='text-lg font-medium mb-1'>{USER_INFO.info.find((item) => item.title == 'Email').title}</h4>
              <input
                type="text"
                className='text-base font-normal p-[0.3125rem] bg-white'
                value={USER_INFO.info.find((item) => item.title == 'Email').data}
                disabled
              />
            </div>
            <EditData infos={USER_INFO.info} />
          </div>
        </div>
        <div className='w-3/5 flex-col px-8 py-4'>
          <h4 className='w-72 text-2xl font-medium mb-3 border-b border-solid border-black'>Các khóa học đang học</h4>
          {USER_INFO.courses.map((course, index) => (
            <Link href={course.href} className='flex-between px-8 py-4 rounded-lg shadow-lg mb-8 cursor-pointer transfrom-action'>
              <Image
                className="rounded-2xl py-2"
                src={course.image}
                alt="Courses Picture"
                width={200}
                height={84}
                priority
              />
              <div className='pl-4 '>
                <h3 className='text-xl font-medium mb-2'>{course.course_name}</h3>
                <p className='text-base font-normal'>{course.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>

  )
}

export default Profile