import Image from "next/image";
import { format } from "timeago.js";

function Message({ className, message, own }) {
  // const [socket, setSocket] = useState(null);

  const userId = JSON.parse(localStorage.getItem("userInfo"))._id;

  // console.log("this is from message component", message);

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
              className="object-cover h-8 rounded-full"
              width={30}
              height={20}
              src={
                message.senderAvatar
                  ? message.senderAvatar.includes("https")
                    ? message.senderAvatar
                    : `http://localhost:8080/${message.senderAvatar}`
                  : "/assets/images/avatar.svg"
              }
              alt="avatar"
            />
            <div>{own ? "You" : message.senderName}</div>
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
