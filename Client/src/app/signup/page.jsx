import Image from "next/image"

const SignUpPage = () => {
  return (
    <section className='flex-center flex-col drop-shadow-md mt-3 px-8 py-5 bg-white rounded-md'>
      <h1 className='text-3xl font-bold'>Đăng ký</h1>
      <form className="flex-center flex-col w-full">
        <div className="w-full flex-start flex-col mt-5 mb-3">
          <label className="text-xs font-semibold mb-1">USERNAME</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            className="input min-w-[20rem]"
            placeholder="abc123@gmail.com"
          />
        </div>
        <div className="w-full flex-start flex-col mt-1 mb-3">
          <label className="text-xs font-semibold mb-1">EMAIL</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            className="input min-w-[20rem]"
            placeholder="abc123@gmail.com"
          />
        </div>
        <div className="w-full flex-start flex-col mt-1 mb-3">
          <label className="text-xs font-semibold mb-1">PASSWORD</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            className="input min-w-[20rem]"
            placeholder="••••••••"
          />
        </div>
        <div className="w-full flex-start flex-col mt-1 mb-3">
          <label className="text-xs font-semibold mb-1">Vai trò</label>
          <select id="role" className="input min-w-[20rem] text-sm text-slate-500">
            <option selected>Chọn vai trò của bạn</option>
            <option>Sinh viên</option>
            <option>Giáo viên</option>
          </select>
        </div>
      </form>
      <button type="submit" className="big-blue-button mt-6">Đăng ký</button>
      <div className="w-full flex-center flex-row py-4">
        <span className="w-full border bg-slate-400" />
        <div className="text-slate-400 text-xs px-2">or</div>
        <span className="w-full border bg-slate-400" />
      </div>
      <button className="big-white-button mb-4 inline-flex items-center">
        <Image 
          src="/assets/icons/google_icon.svg"
          alt="google icon"
          width={20}
          height={20}
          className="ml-4 mr-10"
        />
        <span>Tiếp tục bằng Google</span>
        </button>
      <button className="big-white-button inline-flex items-center"><Image 
          src="/assets/icons/fb_icon.svg"
          alt="facebook icon"
          width={20}
          height={20}
          className="ml-4 mr-10"
        />
        <span>Tiếp tục bằng Facebook</span>
        </button>
    </section>
  )
}

export default SignUpPage