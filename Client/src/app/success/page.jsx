"use client";

import React, { useEffect } from "react";
import { useSearchParams , useRouter } from "next/navigation";
import axios from "axios";

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
    <div>
      Payment successful. You are being redirected to the orders page. Please do
      not close the page
    </div>
  );
};

export default Success;
