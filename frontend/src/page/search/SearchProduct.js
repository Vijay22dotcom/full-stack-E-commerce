import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import {
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import ReactStars from "react-rating-stars-component";
import {
  Searchproducts,
  fetchProductByKeyword,
  isloading,
} from "../../features/product/productSlice";
import ProductforAllproduct from "../product/ProductforAllproduct";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Loading from "../../component/Loader/Loader";
// THIS FOR STAR ICON
const options = {
  edit: false,

  activeColor: "tomato",
  isHalf: true,
  size: window.innerWidth < 1000 ? 10 : 20,
};

const SearchProduct = () => {
  const [price, setPrice] = useState([0, 1000000]);
  // const [productEmpty, setProductEmpty] = useState(false);
  const products = useSelector(Searchproducts);
  const isLoading = useSelector(isloading);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [ShowFilterBox, setShowFilterBox] = useState(false);
  const allcategory = products.map((p) => p.category);
  const productCategory = Array.from(new Set(allcategory.flat()));
  // console.log(productCategory);
  // console.log(products);

  const keyword = useParams();
  // console.log(keyword.keyword);
  const dispatch = useDispatch();
  // console.log(ShowFilterBox);
  useEffect(() => {
    dispatch(
      fetchProductByKeyword({
        keyword: keyword.keyword,
        price,
        category,
        rating,
      })
    );
  }, [dispatch, keyword, price, category, rating]);

  const priceHandle = (event, newPrice) => {
    setPrice(newPrice);
    // console.log(price);
  };

  const handleCategory = (c) => {
    if (c === category) {
      setCategory("");
      console.log("match");
    }
    setCategory(c);
  };

  const handleRating = (event, newRating) => {
    setRating(newRating);
    // console.log(rating);
  };

  return (
    <>
      <div className="flex bg-gray-200 p-[20px]   border border-e-2 max-[500px]:pl-[10px]  max-[500px]:pr-[10px]  max-[800px]:pr-[20px] ">
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
        <div
          className={`w-1/4   max-[500px]:w-[50%]  bg-white  p-[20px] mr-[10px]   max-[500px]:${
            ShowFilterBox ? "w-1/2" : "hidden"
          }   max-[500px]:mt-[50px]  max-[500px]:m-auto `}
        >
          <Typography>Price</Typography>
          <Slider
            value={price}
            onChange={priceHandle}
            valueLabelDisplay="auto"
            getAriaLabel={() => "Temperature range"}
            min={0}
            max={25000}
          />

          <FormControl>
            <Typography>Category</Typography>
            <div className="pl-2">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                {productCategory.map((category) => (
                  <FormControlLabel
                    value={category}
                    control={<Radio />}
                    label={category}
                    key={category}
                    onClick={() => handleCategory(category)}
                  />
                ))}
              </RadioGroup>
            </div>
          </FormControl>
          <Typography component="legend">Rating Above</Typography>
          <Slider
            aria-label="Temperature"
            defaultValue={1}
            getAriaValueText={() => rating}
            onChange={handleRating}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
          />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div
            className={`w-3/4   max-[500px]:mt-[50px]  bg-white  max-[500px]:${
              !ShowFilterBox ? "w-[100%]" : "w-[49%]"
            }    max-[500px]:m-auto   max-[500px]:ml-[10px]`}
          >
            {products.length === 0 ? (
              <h1 className="text-5xl font-semibold grid items-center text-gray-300 text-center h-[100%] m-auto ">
                ANY PRODUCT NOT FOUND
              </h1>
            ) : (
              <div className={`flex flex-wrap`}>
                {products.map((product) => (
                  <ProductforAllproduct
                    product={product}
                    key={product._id}
                    ShowFilterBox={ShowFilterBox}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchProduct;
