"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

import CheckoutForm from "@components/CheckoutForm";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51O9fk9LrBvS01FPJ3coOoxARo82RmeOKyEgj1tezoATjtE3rn9fCaUchADvqRPfPkfQrHUdyiKesmfrxeKJtkAXI00ARuTrbeA"
);

export default function Pay() {
  const [clientSecret, setClientSecret] = useState("");

  const { courseId } = useParams();

  const token = localStorage.getItem("JWT");
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          `http://localhost:8080/api/v1/order/create-payment-intent/${courseId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res, courseId);
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };

    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="w-full flex">
      <div className="w-[28rem] h-[36rem] mx-auto mt-8 bg-gray-100 rounded-2xl">
        <div className="mx-8 mt-4 font-medium text-lg">THANH TOÁN KHÓA HỌC</div>
        <div className="mx-8 my-12">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}
