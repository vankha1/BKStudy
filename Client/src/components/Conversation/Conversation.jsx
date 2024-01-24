import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const Conversation = ({ avatar, fullname, onclick }) => {
  return (
    <div>
      <div
        className="flex items-center border-t border-borderline h-[60px] hover:cursor-pointer hover:bg-[#cacaca]"
        onClick={onclick}
      >
        <div>
          <Image
            src={
              avatar
                ? avatar.includes("https")
                  ? avatar
                  : `http://localhost:8080/${avatar}`
                : "/assets/images/avatar.svg"
            }
            alt="Avatar"
            width={48}
            height={48}
            className="w-[40px] my-0 mx-[10px] rounded-full"
          />
        </div>
        <div className="my-0 mx-[10px]">
          <h2 className="font-semibold text-base">{fullname}</h2>
        </div>
      </div>
    </div>
  );
};
export default Conversation;
