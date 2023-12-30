import React, { useEffect } from "react";
import Sidebar from "./SideBar";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllproducts,
  fetchProductsForAdmin,
  productForAdmin,
} from "../../features/product/productSlice";
import { FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiBoxUnpacking } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import { LuIndianRupee } from "react-icons/lu";
import { IoBagHandleOutline } from "react-icons/io5";
import {
  allOrders,
  fetchAllOrderForAdmin,
} from "../../features/order/orderSlice";
import { allusers, fetchAllUser } from "../../features/auth/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const products = useSelector(productForAdmin);
  const orders = useSelector(allOrders);
  const { users } = useSelector(allusers);
  console.log(orders);

  let outOfStock = 0;

  products?.map((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  let totalQuantity = 0;

  orders?.orders?.forEach((order) => {
    order?.orderItems?.forEach((item) => {
      totalQuantity += item.quantity;
    });
  });

  console.log("Total Quantity:", totalQuantity);

  const number = 3824268342;

  const forStock = [
    { label: "stock", value: products.length - outOfStock },
    { label: "out of stock", value: outOfStock },
  ];

  useEffect(() => {
    dispatch(fetchProductsForAdmin());
    dispatch(fetchAllOrderForAdmin());
    dispatch(fetchAllUser());
  }, []);

  return (
    <div className="flex">
      <div className="w-[20%]  max-[800px]:w-[30%]  bg-[#1C2536]  ">
        <Sidebar />
      </div>
      <div className="w-[80%] max-[800px]:w-[70%] bg-gray-200 p-[10px] font-sans  ">
        <div className="flex  justify-between    mb-[20px] ">
          <Link
            className="flex items-center w-[180px] px-[10px] py-[20px] border-solid   border-[2px]  rounded-md  bg-white cursor-pointer "
            to={"/admin/products"}
          >
            <span className="text-xl mr-[10px]  p-[5px] bg-blue-500  rounded-full text-white ">
              <LuIndianRupee />
            </span>
            <span>
              <p className=" text-gray-600  font-semibold"> Total Sales</p>
              <span className="text-black font-bold">
                ₹
                {orders?.totalAmount?.toLocaleString("en-IN", {
                  useGrouping: true,
                  minimumFractionDigits: 0,
                })}
              </span>
            </span>
          </Link>

          <Link
            className="flex items-center w-[180px] px-[10px] py-[20px] border-solid   border-[2px]  rounded-md  bg-white cursor-pointer "
            to={"/admin/products"}
          >
            <span className="text-xl mr-[10px]  p-[5px] bg-orange-500 rounded-full text-white ">
              <FaBoxOpen />
            </span>
            <span>
              <p className=" text-gray-600  font-semibold"> Total Product</p>
              <span className="text-black font-bold">{products?.length}</span>
            </span>
          </Link>

          <Link
            className="flex items-center w-[180px] px-[10px] py-[20px] border-solid   border-[2px]  rounded-md  bg-white cursor-pointer "
            to={"/admin/orders"}
          >
            <span className="text-xl mr-[10px] p-[5px] bg-green-500 rounded-full text-white ">
              <GiBoxUnpacking />
            </span>
            <span>
              <p className=" text-gray-600  font-semibold"> Total Orders</p>
              <span className="text-black font-bold">
                {orders?.orders?.length}
              </span>
            </span>
          </Link>

          <Link
            className="flex items-center w-[180px] px-[10px] py-[20px] border-solid   border-[2px]  rounded-md  bg-white cursor-pointer "
            to={"/admin/users"}
          >
            <span className="text-xl mr-[10px]  p-[5px] bg-purple-500 rounded-full text-white ">
              <FaRegUser />
            </span>
            <span>
              <p className=" text-gray-600  font-semibold">Users</p>
              <span className="text-black font-bold">{users?.length}</span>
            </span>
          </Link>

          <Link
            className="flex items-center w-[180px] px-[10px] py-[20px] border-solid   border-[2px]  rounded-md  bg-white cursor-pointer "
            to={"/admin/products"}
          >
            <span className="text-xl mr-[10px]  p-[5px] bg-red-500 rounded-full text-white ">
              <IoBagHandleOutline />
            </span>
            <span>
              <p className=" text-gray-600  font-semibold">Product sold</p>
              <span className="text-black font-bold">{totalQuantity}</span>
            </span>
          </Link>
        </div>
        <div className=" bg-white flex items-center flex-col  ">
          <p className="font-sans  text-xl font-semibold ">Sales Statistics</p>

          <LineChart
            xAxis={[
              {
                data: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                scaleType: "point",
              },
            ]}
            series={[
              {
                data: [10, 20],
              },
            ]}
            // width={800}
            height={400}
          />
        </div>
        <div className="flex justify-center">
          <PieChart
            className=""
            series={[
              {
                data: forStock,
                cx: 150,
                cy: 100,
                innerRadius: 40,
                outerRadius: 80,
              },
            ]}
            height={200}
            width={300}
            slotProps={{
              legend: { hidden: true },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
