"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import LoadingState from "@components/LoadingState";

const Success = () => {
  const router = useRouter();
  const params = useSearchParams();
  const payment_intent = params.get("payment_intent");

  const token = localStorage.getItem("JWT");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await axios.put(
          "http://localhost:8080/api/v1/order",
          {
            payment_intent,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        );
        setTimeout(() => {
          router.push("/student-courses");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <div className="w-full">
      <div className="w-[25rem] mx-auto my-24">
        <Image
          className=""
          src='/assets/images/successful_image.jpg'
          alt="Successful Picture"
          width={400}
          height={280}
          priority
        />
        <div className="flex-between">
          <LoadingState width={60} height={60}/>
          <div className="text-xl">
            Payment successful. You are being redirected to the orders page. Please do
            not close the page.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
