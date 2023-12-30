import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "./SideBar";
import { Box } from "@mui/material";
import { MdDeleteOutline } from "react-icons/md";
import { MdLaunch } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  fetchAllOrderForAdmin,
} from "../../features/order/orderSlice";

const AllOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(allOrders);
  console.log(orders);
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "status",
      headerName: "status",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "orderIteam",
      headerName: "orderIteam",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "orderPrice",
      headerName: "orderPrice",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "userId",
      headerName: "userId",
      minWidth: 100,
      flex: 0.3,
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
          <>
            <Link
              to={`/admin/order/${params.row.id}`}
              className="text-xl mr-[10px] hover:text-blue-600 "
            >
              <MdLaunch />
            </Link>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchAllOrderForAdmin());
  }, []);
  const rows = [];

  orders?.orders &&
    orders?.orders?.map((item) => {
      rows.push({
        id: item?._id,
        orderPrice: item?.totalPrice,
        orderIteam: item?.orderItems?.length,
        name: item?.name,
        userId: item?.user,
        status: item?.orderStatus,
      });
    });

  return (
    <>
      {" "}
      <div className="   flex   font-serif   ">
        <div className="w-[20%] max-[800px]:w-[30%] bg-[#1C2536]  ">
          <Sidebar />
        </div>
        <div className=" w-[80%]  max-[800px]:w-[70%] bg-gray-200   p-[20px]">
          <h4 className="myOrdersHeading text-center  uppercase text-gray-300   bg-white text-3xl max-[500px]:text-base font-semibold mb-4 ">
            All orders
          </h4>
          <Box sx={{ width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              disableSelectionOnClick
              className="myOrdersTable font-sans  bg-white shadow-md rounded-md"
              // autoHeight
            />
          </Box>
        </div>
      </div>
    </>
  );
};

export default AllOrders;
