import Image from "next/image";

const Conversation = ({ onClick }) => {
  return (
    <div>
      <div className="absolute right-[80px] top-[55px] w-[300px] border border-borderline rounded-[5px] overflow-hidden z-20 bg-white" onClick={onClick}>
        <h2 className="text-[24px] text-center my-[10px] mx-0 font-medium">
          Tin nhắn
        </h2>
        <ul className="navbar__user-message-list">
          <li className="flex items-center border-t border-borderline h-[60px] hover:cursor-pointer hover:bg-[#cacaca]">
            <div>
              <Image
                src="/assets/avatar.png"
                alt="Avatar"
                width={48}
                height={48}
                className="w-[40px] my-0 mx-[10px] rounded-full"
              />
            </div>
            <div className="my-0 mx-[10px]">
              <h2 className="font-semibold text-base">Nguyễn Văn A</h2>
              <h3 className="text-sm">Thông báo về việc có một gì đó ...</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Conversation;
