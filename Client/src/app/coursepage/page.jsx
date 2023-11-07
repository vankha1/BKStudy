import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const CoursePage = () => {
  return (
    <div className="coursepage">
        <div className="w-screen h-[200px] bg-[#001453] text-white px-[100px] py-[12px]">
            <div className="description w-[600px]">
                <h1 className="text-3xl font-bold mb-[10px]">Cấu trúc dữ liệu & giải thuật</h1>
                <p className="text-xs font-light mb-[20px]">Tìm hiểu về các cấu trúc dữ liệu cơ bản và những giải thuật liên quan</p>
                <div className="flex mb-[5px]">
                    <span className="mr-[100px]">
                        <span className="font-medium">Đánh giá: </span>
                        <span className="font-semibold text-yellow-500">4,5</span>
                        <span>/5</span>
                    </span>
                    <span>
                        <span className="font-medium">Đã tham gia: </span>
                        <span>10.000</span>
                    </span>
                </div>
                <div className="mb-[5px]">
                    <span className="font-light">Giáo viên: </span>
                    <Link href="\" className="font-semibold underline ">Nguyễn Văn A</Link>
                </div>
                <div className="font-light">
                    <span>Cập nhật lần cuối vào </span>
                    <span>9/2023</span>
                </div>
            </div>

            <div className="video absolute bg-white h-[480px] w-[350px] right-[80px] top-4 border border-[#cacaca] rounded-[20px] text-black">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/T9DSBhBR_I4?si=VGLFIMLh8zU5A4wo" title="YouTube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen 
                className="w-[340px] h-[180px] m-auto mt-1 mb-[10px] rounded-[18px] border border-[#cacaca]"></iframe>
                <h1 className="font-bold text-center text-3xl mb-[10px]">500.000đ</h1>
                <div className="flex mb-[30px]">
                    <button className="primary-button w-[150px] h-[50px] m-auto text-xl font-semibold rounded-[30px]">
                        Đăng ký học
                    </button>
                </div>
                <div className="ml-[70px]">
                    <div className="flex mb-2">
                        <Image src="/assets/document.png" alt="" width={48} height={48} className="w-[25px] h-[25px] mr-4"></Image>
                        Tổng số 
                        <span className="font-semibold mx-1">31</span>
                        khóa học
                    </div>
                    <div className="flex mb-2">
                        <Image src="/assets/video.png" alt="" width={48} height={48} className="w-[25px] h-[25px] mr-4"></Image>
                        Bao gồm
                        <span className="font-semibold mx-1"> 20 </span>
                        video
                    </div>
                    <div className="flex mb-2">
                        <Image src="/assets/clock.png" alt="" width={20} height={20} className="w-[25px] h-[25px] mr-4"></Image>
                        Thời lượng hơn 
                        <span className="font-semibold mx-1"> 30 </span>
                        giờ
                    </div>
                    <div className="flex mb-2">
                        <Image src="/assets/cup.png" alt="" width={48} height={48} className="w-[25px] h-[25px] mr-4"></Image>
                        Giấy chứng nhận hoàn thành
                    </div>
                </div>
            </div>

            <div className="outcome mt-[80px] w-[600px] h-[240px] px-8 py-5 text-black border border-[#cacaca] rounded-[20px]">
                <h2 className="text-2xl font-semibold mb-5">Kết thúc khóa học</h2>
                <div className="flex">
                    <div   className="mr-[50px]">
                        <div className="flex mb-2">
                            <Image src="/assets/check.png" alt="" width={25} height={20}></Image>
                            <p className="ml-2">Biết về cấu trúc dữ liệu ...</p>
                        </div>
                        <div className="flex mb-2">
                            <Image src="/assets/check.png" alt="" width={25} height={20}></Image>
                            <p className="ml-2">Biết về cấu trúc dữ liệu ...</p>
                        </div>
                        <div className="flex mb-2">
                            <Image src="/assets/check.png" alt="" width={25} height={20}></Image>
                            <p className="ml-2">Biết về cấu trúc dữ liệu ...</p>
                        </div>
                        <div className="flex mb-2">
                            <Image src="/assets/check.png" alt="" width={25} height={20}></Image>
                            <p className="ml-2">Biết về cấu trúc dữ liệu ...</p>
                        </div>
                    </div>

                    <div>
                        <div className="flex mb-2">
                            <Image src="/assets/check.png" alt="" width={25} height={20}></Image>
                            <p className="ml-2">Biết về giải thuật ...</p>
                        </div>
                        <div className="flex mb-2">
                            <Image src="/assets/check.png" alt="" width={25} height={20}></Image>
                            <p className="ml-2">Biết về giải thuật ...</p>
                        </div>
                        <div className="flex mb-2">
                            <Image src="/assets/check.png" alt="" width={25} height={20}></Image>
                            <p className="ml-2">Biết về giải thuật ...</p>
                        </div>
                        <div className="flex mb-2">
                            <Image src="/assets/check.png" alt="" width={25} height={20}></Image>
                            <p className="ml-2">Biết về giải thuật ...</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="coursecontent text-black px-8 mt-[40px]">
                <h2 className="text-2xl font-semibold">Nội dung khóa học</h2>
            </div>
        </div>
    </div>
  )
}

export default CoursePage