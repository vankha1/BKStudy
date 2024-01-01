'use client';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

import EditData from '../../components/EditInfoUser';
import UploadImage from '@components/UploadFile';
import Notification, { errorNotifi, successNotifi } from '@components/Notification';
import LoadingState from '@components/LoadingState';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({})
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
  const [showAvatarOption, setShowAvatarOption] = useState(false);
  const [imageSelected, setImageSelected] = useState();

  useEffect(() => {
    const token = localStorage.getItem("JWT");
    axios
      .get("http://localhost:8080/api/v1/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        let user = data.data.user;
        handleDataUSer(user);
        setUserProfile(user);
      })
      .catch(error => {
        console.log(error)
      });
    setLoading(false);
  }, []);

  const handleImageSelected = (fileUrl, selectedFile) => {
    const formData = new FormData()
    const token = localStorage.getItem("JWT")
    formData.append("image", selectedFile, selectedFile.name)
    axios
      .put("http://localhost:8080/api/v1/user/update-profile", formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": `multipart/form-data`
        }
      })
      .then((reponse) => {
        setUserProfile({ ...userProfile, avatar: reponse.data.user.avatar })
        setShowAvatarOption(false);
        successNotifi('Đổi ảnh đại diện thành công!.');
      })
      .catch(error => {
        errorNotifi('Đổi ảnh đại diện thất bại!.');
      });
  }

  const handleDataUSer = (user) => {
    if (user) {
      const newDataInfo = [...userInfo];
      newDataInfo[0].data = user.email;
      newDataInfo[1].data = user.fullname;
      newDataInfo[2].data = user.dateOfBirth ? user.dateOfBirth : '';
      newDataInfo[3].data = user.joinedDate.slice(0, 10);
      newDataInfo[4].data = user.phoneNumber;
      setUserInfo(newDataInfo);
    }
  }

  const handleChangeInfoUser = (infos) => {
    const token = localStorage.getItem("JWT");
    const data = {
      fullname: infos[1].data,
      dateOfBirth: infos[2].data,
      phoneNumber: infos[4].data,
    }
    console.log(data);
    axios
      .put("http://localhost:8080/api/v1/user/update-profile", data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": `application/json`,
      },
      })
      .then((reponse) => {
        successNotifi('Đổi thông tin thành công!.');
      })
      .catch(error => {
        errorNotifi('Đổi thông tin thất bại!.')
      });
  }

  const openExternalImage = (imageURL) => {
    const externalImagePath = imageURL.includes('https') ? imageURL : `http://localhost:8080/${imageURL}`;
    const newWindow = window.open();
    newWindow.location.href = externalImagePath;
  };

  return (
    <div className='w-full'>
      {
        loading ? (
          <LoadingState title='Đang tải...' />
        ) : (
          <>
            <div className='relative w-full h-80 mt-4'>
              <div className='h-72 mx-8 rounded-3xl bg-blue-300'>
              </div>
              <div className='absolute bottom-0 left-40 flex justify-between'>
                <div className='w-40 h-40 relative rounded-full flex-center bg-white cursor-pointer'>
                  <Image
                    className="w-32 h-32 rounded-full"
                    src={userProfile.avatar ? (userProfile.avatar.includes('https') ? userProfile.avatar : `http://localhost:8080/${userProfile.avatar}`) : '/assets/images/avatar.svg'}
                    alt="Profile Picture"
                    width={130}
                    height={130}
                    onClick={() => setShowAvatarOption(!showAvatarOption)}
                    priority
                  />
                  {
                    showAvatarOption ? (
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
                          <li>
                            <div
                              className="px-4 py-2 hover:bg-gray-100 w-full block text-center"
                            >
                              <UploadImage
                                title='Đổi ảnh đại diện'
                                fileType='image'
                                onFileSelected={(fileUrl, selectedFile) => {
                                  handleImageSelected(fileUrl, selectedFile);
                                }}
                              />
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
              <div className='absolute bottom-12 right-20 flex-between cursor-pointer'>
                {/* <Image
                className=""
                src='/assets/icons/upload.svg'
                alt="Profile Picture"
                width={30}
                height={30}
                priority
              /> */}
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
                  <EditData infos={userInfo} onlyView={false} handleChangeInfoUser={handleChangeInfoUser} />
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
                        src={'http://localhost:8080/' + course.courseId.imageUrl}
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
          </>
        )
      }
      <Notification />
    </div>

  )
}

export default Profile