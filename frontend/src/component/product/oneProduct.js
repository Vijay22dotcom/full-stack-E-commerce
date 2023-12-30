import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loader/Loader";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOneProduct,
  isloading,
  oneProduct,
} from "../../features/product/productSlice";

import { addIteamTocart } from "../../features/shopingCard/cardSlice";

import { Rating } from "@mui/material";
import { useAlert } from "../../contex/alert/AlertContex";
import { userData } from "../../features/auth/authSlice";

const OneProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(oneProduct);
  const user = useSelector(userData);
  const userIsAuthorize = user.success;
  const loading = useSelector(isloading);
  const { showAlert } = useAlert();

  useEffect(() => {
    (async () => {
      await dispatch(fetchOneProduct(productId));

      //    THIS IS WITHOUT DISPATCH
      // setLoading(true);
      // const responce = await axios.get(
      //   `http://localhost:4000/api/v1/product/${productId}`
      // );

      // setProduct(responce.data.product);
      // setLoading(false);
    })();
  }, [dispatch, productId]);

  const handlecard = (product, tocard) => {
    console.log(product);

    if (product.stock <= 0) {
      showAlert("this product out of stock", "info");
    } else {
      dispatch(addIteamTocart(product));
      showAlert("add to card successfully", "success");
    }

    // console.log("click");
    // const card = JSON.parse(localStorage.getItem("card")) || [];
    // const isexcist = card.find((iteam) => iteam._id === product._id);
    // console.log(isexcist);
    // if (isexcist) {
    //   const upadate = card.map((iteam) => {
    //     if (iteam.id === product.id) {
    //       return {
    //         ...iteam,
    //         qunttity: iteam.qunttity + 1,
    //       };
    //     }
    //     return iteam;
    //   });
    //   localStorage.setItem("card", JSON.stringify(upadate));
    // } else {
    //   console.log(product);
    //   localStorage.setItem(
    //     "card",
    //     JSON.stringify([...card, { ...product, qunttity: 1 }])
    //   );
    // }
  };

  const addReview = () => {
    console.log("okk");
    if (userIsAuthorize) {
      navigate(`/${productId}/write-review`);
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {product && (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-10 mx-auto max-[500px]:py-3">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <Carousel className=" lg:w-1/2 w-full z-10 " autoPlay={true}>
                {product.images.map((item, i) => (
                  <img
                    className=" w-[100%] h-[400px] object-cover object-center rounded"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
              </Carousel>

              {/* <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={product.images[0].url}
              /> */}
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  BRAND NAME
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.name}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    {/* <ReactStars
                      {...options}
                      value={product.ratings}
                      classNames="start"
                    /> */}
                    <Rating
                      name="read-only"
                      readOnly
                      defaultValue={product.ratings}
                    />
                    <span className="text-gray-600 ml-3">
                      {product.reviews.length}
                    </span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    {/* icon  */}
                  </span>

                  <span>
                    <span>
                      {product.stock ? (
                        <span className="text-[green]  font-medium ">
                          In stock{" "}
                        </span>
                      ) : (
                        <span className="text-[red]  font-medium ">
                          Out of stock
                        </span>
                      )}
                    </span>
                  </span>
                </div>
                <p className="leading-relaxed">
                  Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                  sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
                  juiceramps cornhole raw denim forage brooklyn. Everyday carry
                  +1 seitan poutine tumeric. Gastropub blue bottle austin
                  listicle pour-over, neutra jean shorts keytar banjo tattooed
                  umami cardigan.
                </p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                  </div>
                  <div className="flex ml-6 items-center">
                    {/* <span className="mr-3">Size</span>
                    <div className="relative">
                      <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                        <option>SM</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <MdArrowDropDown />
                      </span>
                    </div> */}
                  </div>
                </div>
                <div className="flex  max-[500px]:hidden ">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ₹{product.price}
                  </span>
                  <button
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    onClick={() => handlecard(product, true)}
                  >
                    Add to Card
                  </button>

                  <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Buy Now
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <FaRegHeart />
                  </button>
                </div>

                {/* FOR MOBILE */}

                <div className="hidden  max-[500px]:block ">
                  <div className="flex justify-between  mb-[10px]  ">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      ₹{product.price}
                    </span>
                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                      <FaRegHeart />
                    </button>
                  </div>
                  <div className="flex justify-between ">
                    <button
                      className=" text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                      onClick={() => handlecard(product, true)}
                    >
                      Add to Card
                    </button>

                    <button className=" text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCT REVIEW */}
          <div className="  py-10 px-4  max-[500px]:py-3 ">
            <div className="mb-[20px]  flex justify-between px-[10%] max-[800px]:px-0 max-[500px]:px-0 ">
              <p className="text-lg font-semibold ">Ratings & Reviews</p>
              <button
                onClick={addReview}
                className="text-lg font-semibold  border  py-2 w-[200px] max-[500px]:text-[14px]     max-[500px]:py-1  max-[500px]:w-[100px]  "
              >
                Rate Product
              </button>
            </div>
            <div className="flex flex-wrap container  mx-auto justify-center">
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="border p-4  rounded-lg  w-[30%] max-[800px]:w-[48%]  max-[500px]:w-[100%] shadow-md mr-[2%] mb-[20px] bg-white"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-indigo-700">
                      {review.name}
                    </h3>
                    <div className="flex items-center">
                      <span className="text-yellow-500 font-semibold mr-1">
                        {review?.rating}
                      </span>
                      <Rating
                        name="read-only"
                        readOnly
                        size="small"
                        defaultValue={review?.rating}
                      />
                    </div>
                  </div>
                  <p className="text-gray-700"> {review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default OneProduct;
