import React from 'react'

const Footer = () => {
  return (
    <div className="footer mt-20 px-[100px] flex justify-between border border-t-[#cacaca] bg-[#001453] h-fit text-white">
        <div>
            <Link href="/" className="logo flex w-fit my-[10px]">
                <Image alt="logo" src="/assets/logo.png" width={48} height={48} className="w-[30px] h-[30px] relative top-1"/>
                <h2 className="font-semibold text-2xl leading-10 ml-1">BKStudy</h2>
            </Link>
            <h3>Điện thoại: 0123456789</h3>
            <h3>Email: bkstudy@bk.edu.vn</h3>
            <h3>Địa chỉ: số 173, đường Tân Hòa, Linh Trung, Thủ Đức, thành phố Hồ Chí Minh</h3>
        </div>

        <div className="w-[300px]">
            <h2 className="text-2xl font-semibold my-[10px]">Kênh truyền thông</h2>
            <div className="flex">
                <Link href="#" className="block mr-6">
                    <Image src="/assets/facebook.png" alt="Facebook" width={48} height={48}></Image>
                </Link>
                
                <Link href="#" className="block mr-6">
                    <Image src="/assets/youtube.png" alt="Youtube" width={48} height={48} className="w-[55px]"></Image>
                </Link>

                <Link href="#" className="block mr-6">
                    <Image src="/assets/twitter.png" alt="Twitter" width={48} height={48}></Image>
                </Link>
            </div>
            <div className="flex my-[10px]">
                <Image src="/assets/circleC.png" alt="" width={48} height={48} className="w-6 mr-3"></Image>
                <h4 className="text-xs font-semibold leading-6">2023 BKStudy, nền tảng học tập cho sinh viên</h4>
            </div>
        </div>
    </div>
  )
}

export default Footer