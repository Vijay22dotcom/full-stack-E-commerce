import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Metadata from "../../component/metadata/Metadata";
import Carousel from "react-material-ui-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import img1 from "../../images/hero-ection-2.webp";
import img2 from "../../images/hero2.jpeg";
import img3 from "../../images/hero3.jpg";
import img4 from "../../images/hero3.webp";
import {
  categoryList,
  fetchProductsCategoryList,
} from "../../features/product/productSlice";
import CategoryShowBlock from "./categoryShow";

const Home = () => {
  const images = [img1, img2, img3, img4];
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
      </div>
      <div className="bg-white rounded-md ">
        <p className="text-[20px] p-[15px] font-semibold  ">
          Product By category{" "}
        </p>

        <CategoryShowBlock />
      </div>
    </>
  );
};

export default Home;
