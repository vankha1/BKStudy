"use-client";
import Image from "next/image";
import Message from "./Messages/Message";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import mongoose from "mongoose";

const ConverDeatil = ({ onClick, conversation }) => {
  const socket = useRef();

  const token = localStorage.getItem("JWT");
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const userId = user._id;

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const chattingRef = useRef(null);
  const scrollRef = useRef();
  console.log("clientId", userId);
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      console.log("This is from the socket", data.senderId);
      setArrivalMessage({
        conversationId: conversation._id,
        sendFrom: data.senderId,
        message: data.message,
        createdAt: Date.now(),
      });
    });
    console.log(111111);
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    console.log(arrivalMessage, "-------------------");
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.emit("addUser", new mongoose.Types.ObjectId(userId));
  }, [user]);

  // console.log(socket);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/v1/message/${conversation._id.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((messages) => {
        console.log(messages, "stupid thing");
        setMessages(messages.data);
      })
      .catch((error) => console.error(error));
  }, [conversation]);

  const handleSelect = (emojiObject, event) => {
    // console.log(chattingRef.current.value);
    if (chattingRef.current) {
      chattingRef.current.value += emojiObject.emoji;
    }
    setIsOpenEmoji(false);
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const receiverId =
      userId === conversation.senderId._id
        ? conversation.receiverId._id
        : conversation.senderId._id;
    
    // console.log("Receiver: ", userId === conversation.senderId._id);

    const content = {
      conversationId: conversation._id,
      sendFrom: userId,
      sendTo: receiverId,
      message: chattingRef.current.value,
    };

    socket.current.emit("sendMessage", {
      senderId: new mongoose.Types.ObjectId(userId),
      receiverId: new mongoose.Types.ObjectId(receiverId),
      message: chattingRef.current.value,
    });

    axios
      .post("http://localhost:8080/api/v1/message", content, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((message) => {
        console.log(message);
        setMessages([...messages, message.data]);
        chattingRef.current.value = "";
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  // console.log(messages);

  return (
    <div className="fixed top-[55px] w-[300px] z-30 max-h-full">
      <div className="absolute bottom-[100px] right-[20px] z-50">
        {isOpenEmoji && (
          <EmojiPicker width={300} height={400} onEmojiClick={handleSelect} />
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
          <p>
            {conversation.senderId._id === userId
              ? conversation.receiverId.fullname
              : conversation.senderId.fullname}
          </p>
        </div>
        <Image
          src="/assets/icons/option.png"
          alt="option icon"
          width={20}
          height={20}
        />
      </div>

      <div className="h-[570px] border border-borderline overflow-y-auto overflow-x-hidden bg-neutral-200">
        <div className="px-[10px] mb-[10px]">
          {messages?.map((message, index) => {
            return (
              <div ref={scrollRef}>
                <Message
                  own={message.sendFrom._id === userId}
                  key={index}
                  message={message}
                />
              </div>
            );
          })}
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
          <div
            onClick={handleSubmitMessage}
            className="w-[100%] py-2 cursor-pointer hover:bg-neutral-200 hover:rounded-full "
          >
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
