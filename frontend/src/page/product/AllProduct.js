import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import ProductforAllproduct from "./ProductforAllproduct";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryList,
  fetchAllproducts,
  fetchProduct,
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
import {
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  fieldset,
} from "@mui/material";

const AllProduct = () => {
  const products = useSelector(fetchAllproducts);
  const productCategory = useSelector(categoryList);
  const isLoading = useSelector(isloading);
  const adminProducts = useSelector(productForAdmin);

  let maxPriceProduct;

  if (products?.length > 0) {
    // Use reduce to find the product with the minimum price
    maxPriceProduct = products?.reduce((maxProduct, currentProduct) => {
      return currentProduct.price > maxProduct.price
        ? currentProduct
        : maxProduct;
    });
    // console.log("The product with the minimum price is:");
    // console.log(maxPriceProduct.price);
  }

  // const maxPrice = Math.max(...topPrice);

  const [price, setPrice] = useState([0, 100000]);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [ShowFilterBox, setShowFilterBox] = useState(true);

  // console.log(window.innerWidth < 500 ? true : false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct({ price, category, rating }));
    dispatch(fetchProductsCategoryList());
    dispatch(fetchProductsForAdmin());
  }, [dispatch, price, category, rating]);

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
  // console.log(ShowFilterBox);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <>
      {/* <section className="text-gray-600 body-font"> */}
      <div className=" flex  bg-gray-200 p-[20px]  border border-e-2 max-[500px]:pl-[10px]  max-[500px]:pr-[10px]  max-[800px]:pr-[20px]   ">
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
            className={`w-1/4   max-[500px]:w-[50%]    bg-white  mr-[10px] p-[20px]  max-[500px]: ${
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

            <FormControl>
              <Typography>Category</Typography>
              <div className="pl-2">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="All"
                    control={<Radio />}
                    label="All"
                    onChange={() => setCategory(false)}
                  />
                  {productCategory.map((category) => (
                    <FormControlLabel
                      value={category}
                      control={<Radio />}
                      label={category}
                      key={category}
                      onChange={() => setCategory(category)}
                    />
                  ))}
                </RadioGroup>
              </div>
            </FormControl>

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
        {!isLoading ? (
          <div
            className={`w-3/4  bg-white   max-[500px]:mt-[30px]  max-[500px]:${
              !ShowFilterBox ? "w-[100%]" : "w-[49%]"
            }    max-[500px]:m-auto`}
          >
            {products.length === 0 ? (
              <h1 className="text-5xl font-semibold grid items-center text-gray-300 text-center h-[100%] m-auto ">
                ANY PRODUCT NOT FOUND
              </h1>
            ) : (
              <div className="  bg-white ">
                <div className="flex flex-wrap   ">
                  {products.map((product) => (
                    <ProductforAllproduct
                      product={product}
                      key={product._id}
                      ShowFilterBox={ShowFilterBox}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </div>
      {/* </section> */}
    </>
  );
};

export default AllProduct;
