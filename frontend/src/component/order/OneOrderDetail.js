import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOneOrderDetail,
  isLoading,
  orderDetail,
  orderDetails,
} from "../../features/order/orderSlice";
import Loading from "../Loader/Loader";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const OneOrderDetail = () => {
  const { id } = useParams();
  // console.log(id);
  const dispatch = useDispatch();

  const { order } = useSelector(orderDetails);
  const loading = useSelector(isLoading);
  // console.log(order);
  // console.log(loading);

  const steps = ["processing", "shipping", "delivered"];

  let setStep = 0;
  if (order?.orderStatus === "processing") {
    setStep = 0;
  } else if (order?.orderStatus === "shipped") {
    setStep = 1;
  } else {
    setStep = 3;
  }

  useEffect(() => {
    console.log("ok");
    dispatch(getOneOrderDetail(id));
  }, []);

  return (
    <>
      {!loading && order ? (
        <div className="container mx-auto  p-6 bg-gray-100 rounded-lg">
          <h1 className="text-3xl font-semibold mb-4 text-indigo-700 max-sm:text-[22px]     ">
            Order Details
          </h1>
          <div className="bg-white shadow-md rounded-md p-4 flex flex-col transform transition-transform ease-in-out duration-300 max-sm:text-[14px] ">
            <div className="mb-2 text-gray-700 flex justify-between items-center  ">
              <span className="font-semibold">Order ID:</span> {order?._id}
            </div>
            <div className="mb-2 text-gray-700 flex justify-between items-center">
              <span className="font-semibold">Order Date:</span>
              {new Date(order?.paidAt).toLocaleString()}
            </div>
            <div className="mb-2 text-gray-700 flex justify-between items-center">
              <span className="font-semibold">Order status:</span>{" "}
              {order?.orderStatus}
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2 text-indigo-700">
                Shipping Information
              </h2>
              <div className="text-gray-700 flex justify-between items-center">
                <span className="font-semibold">Address:</span>{" "}
                {order?.shippingInfo?.address}, {order.shippingInfo.city},{" "}
                {order?.shippingInfo?.state}, {order?.shippingInfo?.country}
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2 text-indigo-700">
                Payment Information
              </h2>
              <div className="text-gray-700 max-sm:text-[10px] flex justify-between items-center">
                <span className="font-semibold max-sm:text-[12px] ">
                  Payment ID:
                </span>{" "}
                {order?.paymentInfo?.id}
              </div>
              <div className="text-purple-600 flex justify-between items-center">
                <span className="font-semibold">Payment Status:</span>{" "}
                {order?.paymentInfo?.status}
              </div>
            </div>

            {/* <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2 text-indigo-700">
                Items
              </h2>
              <ul>
                {order?.orderItems?.map((item) => (
                  <li
                    key={item?._id}
                    className="mb-2 text-gray-700 flex justify-center items-center transform transition-transform ease-in-out duration-300 "
                  >
                    <div className="w-[33%]">{item?.name}</div>
                    <div className="text-green-600 flex justify-center w-[33%]">
                      Price: ${item?.price}
                    </div>
                    <div className="w-[33%] flex justify-end ">
                      Quantity: {item?.quantity}
                    </div>
                  </li>
                ))}
              </ul>
            </div> */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2 text-indigo-700">
                Items
              </h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border border-gray-300">
                      Item Name
                    </th>
                    <th className="py-2 px-4 border border-gray-300">Price</th>
                    <th className="py-2 px-4 border border-gray-300">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order?.orderItems?.map((item) => (
                    <tr key={item?._id} className="border border-gray-300">
                      <td className="py-2 px-4">{item?.name}</td>
                      <td className="py-2 px-4 text-center text-green-600">
                        ${item?.price}
                      </td>
                      <td className="py-2 text-center px-4">
                        {item?.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2 text-indigo-700">
                Order Summary
              </h2>
              <div className="text-gray-700 flex justify-between items-center">
                <span className="font-semibold">Subtotal:</span> $
                {order?.iteamPrice}
              </div>
              <div className="text-gray-700 flex justify-between items-center">
                <span className="font-semibold">Shipping Price:</span> $
                {order?.shippingPrice}
              </div>
              <div className="text-gray-700 flex justify-between items-center">
                <span className="font-semibold">Tax Price:</span> $
                {order?.taxPrice}
              </div>
              <div className="text-purple-600 flex justify-between items-center">
                <span className="font-semibold">Total Price:</span> $
                {order?.totalPrice}
              </div>
            </div>
          </div>
          <div className=" mt-[20px] ">
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={setStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>

          {/* <Stepper activeStep={setStep} orientation="vertical"> */}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default OneOrderDetail;
