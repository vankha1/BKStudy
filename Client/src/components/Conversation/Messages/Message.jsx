import Image from "next/image";

function Message({ className, message, own }) {
  return (
    <div className="relative">
      <div
        className={`w-0 h-0 absolute bottom-0 border-t-[15px] border-t-transparent ${
          own
            ? " right-[-12px] border-l-[15px] border-l-stone-300"
            : " left-[-12px] border-r-[15px] border-r-white"
        }`}
      ></div>

      <div
        className={`${className} flex flex-col mt-[20px] border-none p-[10px] max-w-[300px] rounded-md  ${
          own ? "bg-stone-300 end-0 rounded-br-none" : "bg-white rounded-bl-none"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              className="rounded-full object-cover"
              width={32}
              height={32}
              src="/assets/course_avt.jpg"
              alt="avatar"
            />
            <div>Vo Van Kha</div>
          </div>
          <div className="text-xs p-[10px] text-yellow-700">{123456}</div>
        </div>
        <p
          className={`mt-[5px] px-[5px] py-[5px] rounded-xl  max-w-80 text-wrap break-words ${
            own ? "" : ""
          }`}
        >
          vo van kha de trai vl ra tai sao lai dep trai den the nhi
        </p>
      </div>
    </div>
  );
}

export default Message;
