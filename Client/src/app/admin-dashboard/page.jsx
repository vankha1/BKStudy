'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PieChart from '@components/PieChart'
import axios from 'axios'
import { useEffect, useState } from 'react'


const Dashboard = () => {

    const [course, setCourse] = useState();
    const [user, setUser] = useState();
    const [rate, setRate] = useState();
    const [por1, setPor1] = useState();
    const [por2, setPor2] = useState();
    const [por3, setPor3] = useState();

    useEffect(() => {
      const token = localStorage.getItem("JWT");
      axios
        .get("http://localhost:8080/api/v1/admin/stat-course", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          const data = response.data.allCourseCount;
          const courseData = data;
  
          setRate(response.data.ratingCount);
          setCourse(courseData);
          setPor1(response.data.piePortion1);
          setPor2(response.data.piePortion2);
          setPor3(response.data.piePortion3);
        }
        )
        .catch((error) => {
          console.error(`Error when call API: ${error}`);
        });
        
      axios
        .get("http://localhost:8080/api/v1/admin/stat-user", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          const data = response.data.allUserCount;
          const userData = data;
  
          setUser(userData);
        }
        )
        .catch((error) => {
          console.error(`Error when call API: ${error}`);
        });
    }, []);

  return (
    <div className='w-full'>
        <div className='flex justify-between'>
            <h1 className='pl-2 ml-16 font-semibold text-2xl text-primary mt-8'>Thống kê nổi bật</h1>
            <Link href='/admin-manage-course' className="absolute right-20 top-9 text-white font-semibold text-xl bg-primary hover:bg-footer w-24 h-8 rounded-xl text-center">Trở lại</Link>
        </div>
        <div className='w-full flex justify-evenly mt-8'>
            <div className='w-1/4 h-56 border border-primary rounded-2xl pt-5 text-center'>
                <Image src='/assets/icons/student_icon.svg' alt="" width={45} height={45} className='m-auto'></Image>
                <h1 className='mt-3 font-semibold text-2xl'>Tổng số người dùng</h1>
                <h1 className='mt-6 font-semibold text-5xl text-primary'>{user}</h1>
            </div>
            <div className='w-1/4 h-56 border border-primary rounded-2xl pt-7 text-center'>
                <Image src='/assets/icons/lesson_icon.svg' alt="" width={32} height={32} className='m-auto'></Image>
                <h1 className='mt-4 font-semibold text-2xl'>Tổng số khóa học</h1>
                <h1 className='mt-6 font-semibold text-5xl text-primary'>{course}</h1>
            </div>
            <div className='w-1/4 h-56 border border-primary rounded-2xl pt-7 text-center'>
                <Image src='/assets/icons/star_icon.svg' alt="" width={36} height={36} className='m-auto'></Image>
                <h1 className='mt-3 font-semibold text-2xl'>Tổng số lượt đánh giá</h1>
                <h1 className='mt-6 font-semibold text-5xl text-primary'>{rate}</h1>
            </div>
        </div>

        <div className='flex justify-between mt-10 border border-blue-800 rounded-3xl px-48 py-6'>
            <div className='w-full mt-4'>
                <div className='w-full text-3xl font-semibold text-primary'>Đánh giá khóa học</div>
                <div className='ml-0 mt-10'>
                    <div className='flex'>
                        <div className='w-4 h-4 mt-1 mr-4 bg-[#FF6384]'></div>
                        <h2>Khóa học được đánh giá tốt</h2>
                    </div>
                    <div className='flex mt-8'>
                        <div className='w-4 h-4 mt-1 mr-4 bg-[#36A2EB]'></div>
                        <h2>Khóa học được đánh giá trung bình</h2>
                    </div>
                    <div className='flex mt-8'>
                        <div className='w-4 h-4 mt-1 mr-4 bg-[#FFCE56]'></div>
                        <h2>Khóa học được đánh giá tệ</h2>
                    </div>
                </div>
            </div>
            <PieChart quan1={por1} quan2={por2} quan3={por3}/>
        </div>
    </div>
    
    
  )
}

export default Dashboard