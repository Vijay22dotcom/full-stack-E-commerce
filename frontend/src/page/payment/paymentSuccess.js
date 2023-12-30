import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div>
      <div className="payment-success-page bg-green-100 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-green-600 mb-6">
          Payment Successful!
        </h2>
        <p className="text-lg text-gray-800">
          Your order has been placed successfully.
        </p>

        {/* Display Order Details */}
        <div className="order-details mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Order Details
          </h3>
          <ul>
            <li className="text-gray-800">
              <strong>Order ID:</strong>
            </li>
            <li className="text-gray-800">
              <strong>Total Amount:</strong> ₹
            </li>
            {/* Add more order details as needed */}
          </ul>
        </div>

        <p className="mt-8 text-gray-800">
          Thank you for shopping with us! You can view your order{" "}
          <Link to={`/orders`} className="text-blue-500 underline">
            here
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
