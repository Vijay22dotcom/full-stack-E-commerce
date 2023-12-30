import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  fetchAllproducts,
  fetchProductsForAdmin,
  productForAdmin,
} from "../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "./SideBar";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Box } from "@mui/material";

const ProductsAdmin = () => {
  const dispatch = useDispatch();

  const products = useSelector(productForAdmin);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 250,
      flex: 0.3,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 50,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.stock === 0 ? "text-[red]" : "";
      },
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 200,
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
              to={`/admin/product/${params.row.id}`}
              className="text-xl mr-[10px] hover:text-blue-600 "
            >
              {<CiEdit />}
            </Link>
            <button>
              <MdDeleteOutline className="text-xl hover:text-[red]" />
            </button>
          </>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.map((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  useEffect(() => {
    dispatch(fetchProductsForAdmin());
  }, []);
  return (
    <div className="   flex   font-serif   ">
      <div className="w-[20%] max-[800px]:w-[30%] bg-[#1C2536]  ">
        <Sidebar />
      </div>
      <div className=" w-[80%]  max-[800px]:w-[70%] bg-gray-200   p-[20px]">
        <h4 className="myOrdersHeading text-center uppercase  text-gray-300   bg-white text-3xl max-[500px]:text-base font-semibold mb-4 ">
          All Products
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
  );
};

export default ProductsAdmin;
