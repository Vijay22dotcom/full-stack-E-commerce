import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FcPrevious } from "react-icons/fc";
import axios from "axios";
import Loading from "../../component/Loader/Loader";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { Rating } from "@mui/material";

// THIS FOR STAR ICON
const options = {
  edit: false,

  activeColor: "tomato",
  isHalf: true,
  size: window.innerWidth < 1000 ? 10 : 20,
};

// THIS IS FOR SLIDER
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductforAllproduct = ({ product, ShowFilterBox }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* <Carousel responsive={responsive} showDots={true}> */}

      <div
        className={`p-4 w-4/12  max-[800px]:w-1/2   max-[500px]:${
          ShowFilterBox ? "w-[100%]" : "w-1/2"
        } `}
      >
        <Link to={product._id}>
          <div className="block relative h-48 rounded overflow-hidden">
            <img
              alt="ecommerce"
              className="object-cover object-center w-full h-full block"
              src={product.images[0].url}
            />
          </div>
          <div className="mt-4">
            {/* <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
              d
            </h3> */}
            <h2 className="text-gray-900 title-font text-lg font-medium">
              {product.name}
            </h2>
            <div className="flex items-center">
              <Rating readOnly defaultValue={product.ratings} />
              <p> | {product.reviews.length} </p>
            </div>
            <p className="mt-1"> ₹{product.price}</p>
          </div>
        </Link>
      </div>

      {/* </Carousel> */}
    </>
  );
};

export default ProductforAllproduct;
