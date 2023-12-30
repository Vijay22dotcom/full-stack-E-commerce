import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StepForOrder from "../step/StepForOrder";
import { useSelector } from "react-redux";
import { userData } from "../../features/auth/authSlice";

const OrderConfirm = () => {
  const navigate = useNavigate();

  const cartIteams = useSelector((state) => state.cart);
  console.log(cartIteams);

  const user = useSelector(userData);
  console.log(user);

  const shippinginfo = JSON.parse(localStorage.getItem("shippinginfo")) || [];
  console.log(shippinginfo);

  const address = `${shippinginfo.address},${shippinginfo.city}, ${shippinginfo.state}, ${shippinginfo.country}.`;

  const taxRate = 0.08; // 8%

  // Calculate total for each item
  const calculateItemTotal = (quantity, price) => {
    return quantity * price;
  };

  // Calculate grand total for all items including tax and shipping
  const subtotal = cartIteams.reduce((total, item) => {
    return total + calculateItemTotal(item.quantity, item.price);
  }, 0);

  const shippingCharge = subtotal > 1000 ? 0 : 50;

  const totalTax = taxRate * subtotal;
  const grandTotal = subtotal + totalTax + shippingCharge;

  const procesToPayment = () => {
    const data = {
      subtotal,
      shippingCharge,
      totalTax,
      grandTotal,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/order/payment");
  };

  return (
    <>
      <StepForOrder step={1} />

      <div className=" w-[75%] mx-auto mt-8 p-6 bg-white rounded shadow-md  max-[500px]:w-[100%]  max-[800px]:w-[100%] max-[500px]:p-4 ">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Confirmation Order Details
          </h2>
        </div>

        <div>
          <div className="border p-4 rounded-md bg-gray-100 mb-4">
            <p className="text-gray-700">
              <strong>Name:</strong> {user.user?.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {user.user?.email}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {address}
            </p>
          </div>
        </div>

        {/* Display Item Information */}
        <div className="mb-6">
          <div className=" flex justify-between mb-[20px] ">
            <h3 className=" text-xl font-semibold ">Order iteam</h3>
            <h2 className="text-lg font-semibold ">
              Total iteam: {cartIteams.length}
            </h2>
          </div>
          {/* Display Items Information */}
          <div className="mb-8  flex flex-wrap justify-between  ">
            {cartIteams.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/${item._id}`)}
                className="border  mb-[20px] w-[47%] max-[700px]:w-[49%] p-6 max-[800px]:p-2  rounded-md bg-white shadow-md hover:shadow-lg  cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out  max-[500px]:w-[100%] "
              >
                <div className="flex items-center mb-4">
                  <img
                    src={item.images[0].url}
                    alt={item.itemName}
                    className="w-20 h-20 object-cover mr-6 rounded-md"
                  />
                  <div className=" max-[500px]:text-sm">
                    <p className="text-xl font-semibold text-gray-800 max-[500px]:text-base  max-[700px]:text-[17px] ">
                      {item.name}
                    </p>
                    <p className="text-gray-700">
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p className="text-blue-600">
                      <strong>Price:</strong> ₹{item.price.toFixed(2)}
                    </p>
                    <p className="text-green-600">
                      <strong>Total:</strong> ₹
                      {calculateItemTotal(item.quantity, item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Display Grand Total */}
        <div className="mt-6 bg-gray-100 p-6 rounded-md  mb-[20px]">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-700">Subtotal:</p>
            <p>₹{subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-700">
              Tax ({(taxRate * 100).toFixed(0)}%):
            </p>
            <p className="text-orange-500">₹{totalTax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-700">Shipping Charge:</p>
            <p className="text-blue-500">₹{shippingCharge.toFixed(2)}</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold text-green-600">Grand Total:</p>
            <p className="text-xl font-semibold text-green-600">
              ₹{grandTotal.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="w-[100%] flex justify-center ">
          <button
            onClick={procesToPayment}
            className="bg-blue-500 text-white px-4 py-2 w-[50%] max-[500px]:text-[12px] rounded-full"
          >
            Proceed to payment
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderConfirm;
