import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Metadata from "../../component/metadata/Metadata";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import img1 from "../../images/hero-ection-2.webp";
import img2 from "../../images/hero2.jpeg";
import img3 from "../../images/hero-ection-2.webp";
import {
  categoryList,
  fetchProductsCategoryList,
} from "../../features/product/productSlice";

const Home = () => {
  const images = [img1, img2, img3];
  const productCategory = useSelector(categoryList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsCategoryList());
  }, [dispatch]);

  return (
    <>
      <Metadata title="Ecommerce" />
      <div className="bg-gray-200  p-[20px] ">
        <Carousel className="  w-[100%] " autoPlay={true}>
          {images.map((item, i) => (
            <img
              className=" w-[100%] h-[250px] object-cover  rounded"
              key={i}
              src={item}
              alt={`${i} Slide`}
            />
          ))}
        </Carousel>
        <div className="bg-white rounded-md ">
          <p className="text-[20px] p-[15px] font-semibold">
            Product By category{" "}
          </p>
          <div className="overflow-x-scroll  w-[100%]  mt-[-20px]  ">
            <div className={`flex  overflow-x-auto  p-[20px]  w-[127%]    `}>
              {productCategory?.map((iteam) => {
                return (
                  <Link
                    to={`/category/${iteam}`}
                    className="h-full  mr-[20px] w-[30%] bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg  text-center "
                    key={iteam}
                  >
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      {iteam}
                    </h2>
                    <h1 className="title-font sm:text-2xl capitalize text-xl font-medium text-gray-900 mb-3">
                      {iteam}
                    </h1>

                    <div className="text-indigo-500 inline-flex items-center cursor-pointer">
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
