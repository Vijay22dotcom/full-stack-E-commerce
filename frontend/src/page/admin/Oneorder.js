import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./SideBar";
import {
  getOneOrderDetail,
  orderDetails,
  updateOrder,
} from "../../features/order/orderSlice";
import { isLoadingForUpload } from "../../features/auth/authSlice";
import { useAlert } from "../../contex/alert/AlertContex";

const OneOrder = () => {
  const { id } = useParams();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { order } = useSelector(orderDetails);
  const uploadLoading = useSelector(isLoadingForUpload);

  console.log(order);

  useEffect(() => {
    dispatch(getOneOrderDetail(id));
  }, [dispatch, id]);

  const [newStatus, setNewStatus] = useState("");

  const handleSubmit = async () => {
    const data = {
      status: newStatus,
    };
    const datas = await dispatch(updateOrder({ id, data })).then((result) => {
      return result.payload.data;
    });

    if (datas.success) {
      showAlert("Order Update successfully", "success");
      navigate("/admin/orders");
    } else {
      showAlert("Somthing Went wrong", "error");
    }

    console.log(datas);
  };
  return (
    <div className="flex">
      <div className="w-[20%]   max-[800px]:w-[30%]  bg-[#1C2536]  ">
        <Sidebar />
      </div>
      <div className=" flex items-center justify-center bg-gray-100  w-[80%] p-[20px]">
        <div className="w-[70%] bg-white p-8 rounded-xl shadow-md">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Order ID: {order?._id}
          </div>
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
            Order Status: {order?.orderStatus}
          </h2>
          <p className="mt-2 text-gray-500">
            Order Date: {new Date(order?.createAt).toLocaleString()}
          </p>

          <div className="mt-4  ">
            <h3 className="text-lg font-medium text-gray-900">
              User Address:
              <span className="mt-2 text-gray-600  text-sm ml-[5px] ">
                {order?.shippingInfo.address}, {order?.shippingInfo.city},{" "}
                {order?.shippingInfo.state}, {order?.shippingInfo.country}
              </span>
            </h3>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-900">
              Payment Information:
            </h3>
            <p className="mt-2 text-gray-600">
              Payment ID: {order?.paymentInfo?.id}
            </p>
            <p className="mt-2 text-gray-600">
              Status:
              <span className="ml-[5px] text-[green]  ">
                {order?.paymentInfo?.status}
              </span>
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-900">Order Items:</h3>
            <ul className="mt-2 text-gray-600">
              {order?.orderItems.map((item) => (
                <li key={item?._id} className="flex items-center">
                  <img
                    className="h-[100px] w-[100px] rounded-full object-cover mr-4"
                    src={item?.images[0]?.url}
                    alt="Order Item"
                  />
                  <p className="text-2xl">{item?.name}</p>
                </li>
              ))}
            </ul>
          </div>

          {order?.orderStatus !== "delivered" ? (
            <div className="mt-4 w-[200px] m-auto ">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Change Order Status:
              </label>

              <select
                id="status"
                name="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Chose a Status</option>

                {order?.orderStatus === "processing" && (
                  <option value="shipped">Shipped</option>
                )}
                {order?.orderStatus === "shipped" && (
                  <option value="delivered">Delivered</option>
                )}
              </select>
              <div className="mt-4  w-[200px] m-auto">
                <button
                  onClick={handleSubmit}
                  disabled={newStatus === ""}
                  className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update Order Status
                </button>
              </div>
            </div>
          ) : (
            <p className="block text-2xl font-semibold text-center text-[green]">
              this Order is Aready Delivered
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneOrder;
