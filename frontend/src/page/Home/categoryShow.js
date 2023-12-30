import React, { useEffect, useState } from "react";
import "./carousel.css";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryList,
  fetchProductsCategoryList,
} from "../../features/product/productSlice";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const CategoryShowBlock = () => {
  const productCategory = useSelector(categoryList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsCategoryList());
  }, [dispatch]);
  return (
    <div className=" bg-white p-[20px] mt-[-20px]">
      <Carousel
        autoPlay={false}
        responsive={responsive}
        draggable={true}
        keyBoardControl={true}
        swipeable={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {productCategory?.map((iteam, i) => (
          <Link
            to={`/category/${iteam}`}
            key={iteam}
            className=" bg-gray-100 text-center"
          >
            <h2 className=" text-xs title-font font-medium text-gray-400 mb-1">
              {iteam}
            </h2>
            <h1 className=" sm:text-2xl capitalize text-[20px]   font-medium text-gray-900      mb-[20px]">
              {iteam}
            </h1>

            <div className="text-indigo-500 inline-flex items-center  w-[100%] justify-center cursor-pointer">
              Show More
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default CategoryShowBlock;
