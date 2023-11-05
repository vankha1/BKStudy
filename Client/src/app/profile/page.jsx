import React from 'react'
import Image from 'next/image'

const USER_INFO = {
  role: 'Giáo viên',
  start_date: '20/10/2023',
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@gmail.com',
  phone_number: '0123456789',
  courses: [
    {
      course_name: 'Cấu trúc dữ liệu và giải thuật',
      description: 'Khóa học giúp rèn luyện tư duy về cấu trúc dữ liệu và các loại giải thuật, giúp sinh viên có thể giải quyết nhiều vấn đề khác nhau.',
      images: '/course_images.jpg'
    },
    {
      course_name: 'Cấu trúc dữ liệu và giải thuật',
      description: 'Khóa học giúp rèn luyện tư duy về cấu trúc dữ liệu và các loại giải thuật, giúp sinh viên có thể giải quyết nhiều vấn đề khác nhau.',
      images: '/course_images.jpg'
    },
    {
      course_name: 'Cấu trúc dữ liệu và giải thuật',
      description: 'Khóa học giúp rèn luyện tư duy về cấu trúc dữ liệu và các loại giải thuật, giúp sinh viên có thể giải quyết nhiều vấn đề khác nhau.',
      images: '/course_images.jpg'
    },
    {
      course_name: 'Cấu trúc dữ liệu và giải thuật',
      description: 'Khóa học giúp rèn luyện tư duy về cấu trúc dữ liệu và các loại giải thuật, giúp sinh viên có thể giải quyết nhiều vấn đề khác nhau.',
      images: '/course_images.jpg'
    }
  ]
}

const Profile = () => {
  return (
    <div className='w-full'>
      <div className='relative w-full h-80 mt-4'>
        <div className='h-64 mx-32 rounded-3xl bg-blue-300'>
        </div>
        <div className='absolute bottom-0 left-60 flex-between'>
          <div className='w-40 h-40 rounded-full flex-center bg-white'>
            <Image
              className=""
              src="/avatar.svg"
              alt="Profile Picture"
              width={130}
              height={130}
              priority
            />
          </div>
          <h2 className='pl-8 mb-8 text-3xl font-medium'>NGUYỄN VĂN A</h2>
        </div>
        <div className='absolute bottom-20 right-40 flex-between'>
          <Image
            className=""
            src="/upload.svg"
            alt="Profile Picture"
            width={30}
            height={30}
            priority
          />
          <button className='text-xl ml-2 font-normal'>Đổi ảnh bìa</button>
        </div>
      </div>
      <div className='flex justify-between mx-48'>
        <div className='relative flex-col pt-8'>
          <div className='pb-8'>
            <h3 className='text-xl font-medium mb-2'>Giới thiệu</h3>
            <h4 className='text-lg font-normal mb-1'>Bắt đầu tham gia khóa học vào ngày:</h4>
            <p className='text-base font-normal'>20/10/2023</p>
          </div>
          <div className='pb-8'>
            <h3 className='text-xl font-medium mb-2'>Quyền truy cập</h3>
            <p className='text-base font-normal'>Giáo viên</p>
          </div>
          <div className='w-full pb-8'>
            <h3 className='w-52 text-xl font-medium mb-3 border-b border-solid border-black'>Thông tin tài khoản</h3>
            <div className='mb-4'>
              <h4 className='text-lg font-medium mb-1'>Họ tên</h4>
              <p className='text-base font-normal'>Nguyễn Văn A</p>
            </div>
            <div className='mb-4'>
              <h4 className='text-lg font-medium mb-1'>Email</h4>
              <p className='text-base font-normal'>nguyenvana@gmail.com</p>
            </div>
            <div className='mb-4'>
              <h4 className='text-lg font-medium mb-1'>SĐT</h4>
              <p className='text-base font-normal'>0123456789</p>
            </div>
            <button>Chỉnh sửa thông tin</button>
          </div>
        </div>
        <div className='w-1/2 flex-col pt-8'>
          <h4 className='w-72 text-2xl font-medium mb-3 border-b border-solid border-black'>Các khóa học đang học</h4>
          <div className='flex-between mb-8'>
            <Image
              className="rounded-2xl"
              src="/course_images.jpg"
              alt="Courses Picture"
              width={200}
              height={100}
              priority
            />
            <div className='pl-4'>
              <h3 className='text-xl font-medium mb-2'>Cấu trúc dữ liệu và giải thuật</h3>
              <p className='text-base font-normal'>Khóa học giúp rèn luyện tư duy về cấu trúc dữ liệu và các loại giải thuật, giúp sinh viên có thể giải quyết nhiều vấn đề khác nhau.</p>
            </div>
          </div>
          <div className='flex-between mb-8'>
            <Image
              className="rounded-2xl"
              src="/course_images.jpg"
              alt="Courses Picture"
              width={200}
              height={100}
              priority
            />
            <div className='pl-4'>
              <h3 className='text-xl font-medium mb-2'>Cấu trúc dữ liệu và giải thuật</h3>
              <p className='text-base font-normal'>Khóa học giúp rèn luyện tư duy về cấu trúc dữ liệu và các loại giải thuật, giúp sinh viên có thể giải quyết nhiều vấn đề khác nhau.</p>
            </div>
          </div>
          <div className='flex-between mb-8'>
            <Image
              className="rounded-2xl"
              src="/course_images.jpg"
              alt="Courses Picture"
              width={200}
              height={100}
              priority
            />
            <div className='pl-4'>
              <h3 className='text-xl font-medium mb-2'>Cấu trúc dữ liệu và giải thuật</h3>
              <p className='text-base font-normal'>Khóa học giúp rèn luyện tư duy về cấu trúc dữ liệu và các loại giải thuật, giúp sinh viên có thể giải quyết nhiều vấn đề khác nhau.</p>
            </div>
          </div>
          <div className='flex-between mb-8'>
            <Image
              className="rounded-2xl"
              src="/course_images.jpg"
              alt="Courses Picture"
              width={200}
              height={100}
              priority
            />
            <div className='pl-4'>
              <h3 className='text-xl font-medium mb-2'>Cấu trúc dữ liệu và giải thuật</h3>
              <p className='text-base font-normal'>Khóa học giúp rèn luyện tư duy về cấu trúc dữ liệu và các loại giải thuật, giúp sinh viên có thể giải quyết nhiều vấn đề khác nhau.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Profile
