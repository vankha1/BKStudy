'use client';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import EditData from '@components/EditInfoUser';
import LoadingState from '@components/LoadingState';

const User = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({})
  const [imageSelected, setImageSelected] = useState('');
  const [userInfo, setUserInfo] = useState([
    {
      title: 'Email',
      data: '',
    },
    {
      title: 'Họ tên',
      data: ''
    },
    {
      title: 'Ngày sinh',
      data: ''
    },
    {
      title: 'Ngày tham gia',
      data: ''
    },
    {
      title: 'Số điện thoại',
      data: ''
    },
  ])
  const [viewAvatar, setViewAvatar] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("JWT");
    axios
      .get('http://localhost:8080' + `/api/v1/user/profile/${params?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        let user = data.data.user;
        console.log(data)
        handleDataUSer(user);
        setUserProfile(user);
      })
      .catch(error => {
        console.log('error')
      });
    setLoading(false);
  }, []);

  const handleImageSelected = (imageURL) => {
    setImageSelected(imageURL);
  }

  const handleDataUSer = (user) => {
    if (user) {
      const newDataInfo = [...userInfo];
      newDataInfo[0].data = user.email;
      newDataInfo[1].data = user.fullname;
      newDataInfo[2].data = user.dateOfBirth.slice(0, 10);
      newDataInfo[3].data = user.joinedDate.slice(0, 10);
      newDataInfo[4].data = user.phoneNumber;
      setUserInfo(newDataInfo);
    }
  }

  const openExternalImage = (imageURL) => {
    const externalImagePath = imageURL.includes('https') ? imageURL : `http://localhost:8080/${imageURL}`;
    const newWindow = window.open();
    newWindow.location.href = externalImagePath;
  };

  return (
    <div>
      {
        loading ? (
          <LoadingState title='Đang tải...' />
        ) : (
          <div className='w-full'>
            <div className='relative w-full h-80 mt-4'>
              <div className='h-72 mx-8 rounded-3xl bg-blue-300'>
              </div>
              <div className='absolute bottom-0 left-40 flex justify-between'>
                <div className='w-40 h-40 relative rounded-full flex-center bg-white cursor-pointer' onClick={() => setViewAvatar(!viewAvatar)}>
                  <Image
                    className="w-32 h-32 rounded-full"
                    src={userProfile.avatar ? (userProfile.avatar.includes('https') ? userProfile.avatar : `http://localhost:8080/${userProfile.avatar}`) : '/assets/images/avatar.svg'}
                    alt="Profile Picture"
                    width={130}
                    height={130}
                    onClick={() => setViewAvatar(!viewAvatar)}
                    priority
                  />
                  {
                    viewAvatar ? (
                      <div className='z-10 absolute top-40 border border-slate-200 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-48 flex-center flex-col'>
                        <ul className="py-2 text-base text-gray-700 w-full">
                          <li>
                            <div
                              onClick={() => userProfile.avatar && openExternalImage(userProfile.avatar)}
                              className="px-4 py-2 hover:bg-gray-100 block text-center cursor-pointer"
                            >
                              Xem ảnh đại diện
                            </div>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <></>
                    )
                  }
                </div>
                <h2 className='pl-8 mt-20 text-3xl font-medium'>
                  {userProfile.fullname}
                </h2>
              </div>
            </div>
            <div className='flex justify-between mx-16'>
              <div className='relative flex-col pt-8'>
                <div className='px-16 py-4 rounded-lg shadow-lg mb-8'>
                  <h3 className='text-xl font-medium mb-3 border-b border-solid border-black'>Quyền truy cập</h3>
                  <p className='text-base font-normal'>
                    {userProfile ? (
                      userProfile.isAdmin ? "Admin" : (
                        userProfile.userType === "LECTURER" ? "Giáo viên" : (
                          userProfile.userType === "STUDENT" ? "Sinh viên" : "Không xác định"
                        )
                      )
                    ) : null}
                  </p>
                </div>
                <div className='w-full px-16 py-4 rounded-lg shadow-lg mb-8'>
                  <h3 className='w-52 text-xl font-medium mb-3 border-b border-solid border-black'>Thông tin tài khoản</h3>
                  <EditData infos={userInfo} onlyView={true} />
                </div>
              </div>
              <div className='w-3/5 flex-col px-8 py-4'>
                <h4 className='w-72 text-2xl font-medium mb-3 border-b border-solid border-black'>
                  {userProfile.userType === "LECTURER" ? "Các khóa học đang dạy" : (
                    userProfile.userType === "STUDENT" ? "Các khóa học đang học" : " "
                  )}
                </h4>
                {userProfile && userProfile.courses && userProfile.courses.filter((course) => (course.courseId != null)).slice(0, 3).map((course, index) => (
                  <Link href={`/coursepage/${course?.courseId?._id}`} key={course?.courseId?._id} className='flex-between px-8 py-4 rounded-lg shadow-lg mb-8 cursor-pointer transfrom-action'>
                    <div className='w-[200px] relative h-[160px]'>
                      <Image
                        className="rounded-2xl py-2"
                        src={course.courseId ? `http://localhost:8080/${course.courseId.imageUrl}` : '/assets/images/course_image.jpg'}
                        alt="Courses Picture"
                        fill
                        objectFit="cover"
                      />
                    </div>
                    <div className='pl-4 w-[280px] h-[160px]'>
                      <h3 className='w-full h-[30px] overflow-hidden text-xl font-medium mb-2'>{course.courseId.title}</h3>
                      <p className='w-full h-[120px] overflow-hidden text-base font-normal'>{course.courseId.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default User