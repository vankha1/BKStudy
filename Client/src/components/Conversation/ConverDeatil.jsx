"use-client";
import Image from "next/image";
import Message from "./Messages/Message";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

const ConverDeatil = ({ onClick }) => {
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const chattingRef = useRef(null);

  useEffect(() => {
    const handleTurnOffEmoji = () => {
      setIsOpenEmoji(false);
    };
  }, []);
  const handleSelect = (emojiObject, event) => {
    console.log(chattingRef.current.value);
    if (chattingRef.current) {
      chattingRef.current.value += emojiObject.emoji;
    }
    setIsOpenEmoji(false);
  };

  return (
    <div className="fixed top-[55px] w-[300px] z-30 max-h-full">
      <div className="absolute bottom-[100px] right-[20px] z-50">
        {isOpenEmoji && (
          <EmojiPicker
            width={300}
            height={400}
            onEmojiClick={handleSelect}
          />
        )}
      </div>
      <div className="flex items-center justify-between max-h-12 bg-neutral-500 p-[10px] rounded-t-[5px] ">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/icons/backward.png"
            alt="backward icon"
            width={20}
            height={20}
            onClick={onClick}
            className="cursor-pointer"
          />
          <p>Nguyen Thi A</p>
        </div>
        <Image
          src="/assets/icons/option.png"
          alt="option icon"
          width={20}
          height={20}
        />
      </div>

      <div className="max-h-[570px] border border-borderline overflow-y-auto overflow-x-hidden bg-neutral-200">
        <div className="px-[10px] mb-[10px]">
          <Message own={1} />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
      </div>

      <div className="flex p-[10px] bg-white border-2 border-t-0 rounded-b-md gap-2">
        <textarea
          ref={chattingRef}
          class="h-full min-h-[80px] w-[85%] resize-none rounded-md bg-transparent px-3 py-1 border text-md transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:shadow-custom focus:shadow-blue-400 focus:border-blue-400 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
          placeholder="Write a message"
        ></textarea>

        <div className="flex flex-1 flex-col justify-between items-center">
          <div className="w-[100%] py-2 cursor-pointer hover:bg-neutral-200 hover:rounded-full text-center">
            <Image
              src="/assets/images/happy.png"
              alt="Smile icon"
              width={20}
              height={20}
              className="m-auto"
              onClick={() => setIsOpenEmoji(!isOpenEmoji)}
            />
          </div>
          <div className="w-[100%] py-2 cursor-pointer hover:bg-neutral-200 hover:rounded-full ">
            <Image
              src="/assets/icons/send_icon.svg"
              alt="Send icon"
              width={20}
              height={20}
              className="m-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConverDeatil;
