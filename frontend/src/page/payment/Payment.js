import React, { useState, useRef } from "react";
import StepForOrder from "../../component/step/StepForOrder";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  injectStripe,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../features/auth/authSlice";
import { createrOrder } from "../../features/order/orderSlice";

const Payment = () => {
  const [paymentError, setPaymentError] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const stripe = useStripe();
  const elements = useElements();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const shippingInfo = JSON.parse(localStorage.getItem("shippinginfo"));
  const cart = JSON.parse(localStorage.getItem("cart"));
  const user = useSelector(userData);
  // console.log(orderInfo, shippingInfo, user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const payBtn = useRef(null);

  const paymentData = {
    amount: Math.round(orderInfo.grandTotal * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cart,
    iteamPrice: orderInfo.subtotal,
    taxPrice: orderInfo.totalTax,
    shippingPrice: orderInfo.shippingCharge,
    totalPrice: orderInfo.grandTotal,
  };
  console.log(order);
  const submitHandlerForCard = async (e) => {
    e.preventDefault();
    console.log("ok");

    payBtn.current.disabled = true;

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/payment/process",
        paymentData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.user.name,
            email: user.user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,

              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          await dispatch(createrOrder(order));
          navigate("/payment/success");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
    }
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    // onSelectPaymentMethod(method);
  };
  return (
    <>
      <StepForOrder step={2} />

      <div className="  flex  ">
        <div className="payment-method-selection w-[70%] m-auto max-[800px]:w-[40%] max-[500px]:w-[70%] ">
          <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
          <div className="payment-method-options  ">
            <div>
              <label className="block mb-[10px] ">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={selectedMethod === "card"}
                  onChange={() => handleMethodSelect("card")}
                />
                Credit /ATM / Debit card
              </label>
              {selectedMethod === "card" && (
                <div className="paymentContainer  w-[30%]  ml-[20%] max-[800px]:w-[40%] max-[500px]:w-[70%] ">
                  <form className="paymentForm" onSubmit={submitHandlerForCard}>
                    <div className="mb-4">
                      <label
                        htmlFor="cardNumber"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Card Number
                      </label>
                      <CardNumberElement
                        className="w-full p-2 border rounded"
                        id="cardNumber"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="cardExpiry"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Card Expiry
                      </label>
                      <CardExpiryElement
                        className="w-full p-2 border rounded"
                        id="cardExpiry"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="cardCvc"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Card CVC
                      </label>
                      <CardCvcElement
                        className="w-full p-2 border rounded"
                        id="cardCvc"
                      />
                    </div>
                    <div className="flex justify-center">
                      <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.grandTotal}`}
                        ref={payBtn}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                      />
                    </div>
                  </form>
                </div>
              )}
            </div>
            <label className="block mb-[10px] ">
              <input
                type="radio"
                name="paymentMethod"
                value="cashOnDelivery"
                checked={selectedMethod === "cashOnDelivery"}
                onChange={() => handleMethodSelect("cashOnDelivery")}
              />
              Cash on Delivery
            </label>

            <label className="block mb-[10px] ">
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={selectedMethod === "upi"}
                onChange={() => handleMethodSelect("upi")}
              />
              Upi
            </label>

            <label className="block mb-[10px] ">
              <input
                type="radio"
                name="paymentMethod"
                value="netBanking"
                checked={selectedMethod === "netBanking"}
                onChange={() => handleMethodSelect("netBanking")}
              />
              Net Banking
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
