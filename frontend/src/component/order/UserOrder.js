import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { MdLaunch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../features/auth/authSlice";
import {
  isLoading,
  myOrder,
  orderDetail,
} from "../../features/order/orderSlice";
import Loading from "../Loader/Loader";

const UserOrder = () => {
  const user = useSelector(userData);
  const orders = useSelector(orderDetail);

  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "processing"
          ? "text-[red]"
          : "text-[green]";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 200,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // console.log(params);
        return (
          <Link to={`/order/${params.row.id}`}>
            <MdLaunch />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders?.success &&
    orders?.orders?.map((iteam) => {
      rows.push({
        itemsQty: iteam.orderItems.length,
        amount: iteam.totalPrice,
        id: iteam._id,
        status: iteam.orderStatus,
      });
    });

  useEffect(() => {
    dispatch(myOrder());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="myOrdersPage h-[100vh]  font-serif  p-6 bg-gray-100">
          <h4 className="myOrdersHeading text-center  bg-slate-800 text-gray-300  w-[100%]  text-3xl max-[500px]:text-base font-semibold mb-4 ">
            {user?.user?.name}'s Orders
          </h4>
          <DataGrid
            sx={{}}
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable font-sans  bg-white shadow-md rounded-md"
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default UserOrder;
