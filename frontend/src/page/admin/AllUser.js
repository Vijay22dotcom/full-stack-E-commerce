import React, { useEffect } from "react";
import Sidebar from "./SideBar";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MdLaunch } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { allusers, fetchAllUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "./grid-data.css";

const AllUser = () => {
  const dispatch = useDispatch();

  const { users } = useSelector(allusers);
  console.log(users);

  useEffect(() => {
    dispatch(fetchAllUser());
  }, []);
  const columns = [
    { field: "id", headerName: " User ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "name",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "email",
      headerName: "email",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "role",
      minWidth: 50,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.role === "admin" ? "text-indigo-500" : "";
      },
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
              to={`/admin/user/${params.row.id}`}
              className="text-xl mr-[10px] hover:text-blue-600 "
            >
              <MdLaunch />
            </Link>
            {/* <button>
              <MdDeleteOutline className="text-xl hover:text-[red]" />
            </button> */}
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users?.map((user) => {
      rows.push({
        id: user?._id,
        email: user.email,
        role: user.role,
        name: user?.name,
      });
    });

  return (
    <>
      <div className="flex">
        <div className="w-[20%]   max-[800px]:w-[30%]  bg-[#1C2536]  ">
          <Sidebar />
        </div>
        <div className="w-[80%] max-[800px]:w-[70%] bg-gray-200 p-[10px] font-sans  ">
          <h4 className="myOrdersHeading text-center  uppercase  text-gray-300   bg-white text-3xl max-[500px]:text-base font-semibold mb-4 ">
            All User
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

export default AllUser;
