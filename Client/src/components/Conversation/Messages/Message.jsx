import Image from "next/image";
import { format } from "timeago.js";

function Message({ className, message, own }) {
  // const [socket, setSocket] = useState(null);

  const userId = JSON.parse(localStorage.getItem("userInfo"))._id;

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
          own
            ? "bg-stone-300 end-0 rounded-br-none"
            : "bg-white rounded-bl-none"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              className="rounded-full object-cover"
              width={32}
              height={32}
              src={
                message.sendFrom.avatar
                  ? message.sendFrom.avatar.includes("https")
                    ? message.sendFrom.avatar
                    : `http://localhost:8080/${message.sendFrom.avatar}`
                  : "/assets/images/avatar.svg"
              }
              alt="avatar"
            />
            <div>
              {userId === message.sendFrom._id
                ? "You"
                : message.sendFrom.fullname}
            </div>
          </div>
          <div className="text-xs p-[10px] text-yellow-700">
            {format(message.createdAt)}
          </div>
        </div>
        <p
          className={`mt-[5px] px-[5px] py-[5px] rounded-xl  max-w-80 text-wrap break-words ${
            own ? "" : ""
          }`}
        >
          {message.message}
        </p>
      </div>
    </div>
  );
}

export default Message;
