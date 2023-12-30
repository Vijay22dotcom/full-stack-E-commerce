import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviewsforProduct,
  productReviews,
} from "../../features/product/productSlice";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Review = () => {
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();
  const reviews = useSelector(productReviews);
  console.log(reviews);

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(fetchReviewsforProduct(productId));
    }
  }, [dispatch]);

  const handleSubmit = () => {
    console.log(productId);
    dispatch(fetchReviewsforProduct(productId));
  };
  const columns = [
    { field: "id", headerName: " User ID", minWidth: 200, flex: 0.5 },
    {
      field: "review",
      headerName: "review",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "rating",
      headerName: "rating",
      minWidth: 50,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.rating >= 3 ? "text-indigo-500" : "text-[red]";
      },
    },
    {
      field: "name",
      headerName: "name",
      minWidth: 100,
      flex: 0.3,
    },

    ,
  ];

  const rows = [];

  if (reviews?.success) {
    reviews?.reviews?.map((review) => {
      rows.push({
        id: review.user,
        review: review.comment,
        rating: review.rating,
        name: review.name,
      });
    });
  }

  return (
    <>
      <div className="flex">
        <div className="w-[20%]   max-[800px]:w-[30%]  bg-[#1C2536]  ">
          <Sidebar />
        </div>
        <div className="w-[80%] max-[800px]:w-[70%] bg-gray-200 p-[10px] font-sans  ">
          <h4 className="myOrdersHeading text-center  uppercase  text-gray-300   bg-white text-3xl max-[500px]:text-base font-semibold mb-4 ">
            Reviews
          </h4>
          <div class=" text-gray-600  flex  flex-col items-center ">
            <input
              type="text"
              name="search"
              placeholder="Search..."
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              class="bg-white block w-[40%] h-10 px-5 pr-10 rounded-full text-base focus:outline-none mb-[20px] "
            />
            <button
              type="submit"
              onClick={handleSubmit}
              class="bg-indigo-500 w-[20%]  text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {" "}
              Search
            </button>
          </div>
          <div className="mt-[20px]">
            {reviews?.reviews?.length > 0 ? (
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
            ) : (
              <h3 className="text-[30px] p-[10px] text-center bg-white ">
                {" "}
                no product review found{" "}
              </h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
