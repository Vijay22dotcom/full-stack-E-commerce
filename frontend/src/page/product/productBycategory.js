import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductforAllproduct from "./ProductforAllproduct";
import { useDispatch, useSelector } from "react-redux";
import {
  Searchproducts,
  categoryList,
  fetchAllproducts,
  fetchProduct,
  fetchProductsByCategory,
  fetchProductsCategoryList,
  fetchProductsForAdmin,
  isloading,
  productForAdmin,
} from "../../features/product/productSlice";
import FilterBox from "../../component/filter/FilterBox";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Loading from "../../component/Loader/Loader";
import { TfiFilter } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

const ProductBycategory = () => {
  const { category } = useParams();
  //   console.log(category);
  const dispatch = useDispatch();
  const products = useSelector(Searchproducts);
  const isLoading = useSelector(isloading);
  //   console.log(products);
  const [ShowFilterBox, setShowFilterBox] = useState(true);
  const [price, setPrice] = useState([0, 100000]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const data = {
      category,
    };
    dispatch(fetchProductsByCategory({ price, rating, category }));
  }, [dispatch, price, rating]);

  const priceHandle = (event, newPrice) => {
    // console.log(newPrice);
    setPrice(newPrice);
    // console.log(price);
  };

  const handleRating = (event, newRating) => {
    setRating(newRating);
    // console.log(rating);
  };

  const valuetext = (price) => {
    return price;
  };

  return (
    <>
      <div className=" flex  bg-gray-200 pl-[50px] pr-[50px] pb-3 pt-3 border border-e-2 max-[500px]:pl-[10px]  max-[500px]:pr-[10px]  max-[800px]:pr-[20px]   ">
        {
          <div
            className="hidden max-[500px]:flex  w-[100%] h-[50px] cursor-pointer     absolute items-center mt-[-10px] ml-[-10px]  border-b "
            onClick={() => setShowFilterBox(!ShowFilterBox)}
          >
            <p>Filter</p>
            <span className=" items-end ">
              {ShowFilterBox ? <FaAngleDown /> : <FaAngleUp />}
            </span>
          </div>
        }

        {
          <div
            className={`w-1/4   max-[500px]:w-[50%]   bg-white  mr-[10px] p-[20px]  max-[500px]: ${
              ShowFilterBox ? "w-1/2" : "hidden"
            }  max-[500px]:mt-[50px]  max-[500px]:m-auto `}
          >
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandle}
              valueLabelDisplay="auto"
              getAriaLabel={() => "Temperature range"}
              min={0}
              max={100000}
              getAriaValueText={valuetext}
            />

            <Typography component="legend">Rating Above</Typography>
            <Slider
              aria-label="Temperature"
              defaultValue={() => rating}
              getAriaValueText={() => rating}
              onChange={handleRating}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={5}
            />
          </div>
        }

        <div
          className={`w-3/4   max-[500px]:mt-[30px]  max-[500px]:${
            !ShowFilterBox ? "w-[100%]" : "w-[49%]"
          }    max-[500px]:m-auto`}
        >
          {products.length === 0 ? (
            <h1>PRODUCT NOT FOUND</h1>
          ) : (
            <div className="  bg-white ">
              {!isLoading ? (
                <div className="flex flex-wrap   ">
                  {products.map((product) => (
                    <ProductforAllproduct
                      product={product}
                      key={product._id}
                      ShowFilterBox={ShowFilterBox}
                    />
                  ))}
                </div>
              ) : (
                <Loading />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductBycategory;
