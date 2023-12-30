import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  addProductReview,
  fetchOneProduct,
  isloading,
  oneProduct,
} from "../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoMdStar } from "react-icons/io";
import { Rating, Box, TextField, styled, Button } from "@mui/material";
import { useAlert } from "../../contex/alert/AlertContex";
import { userData } from "../../features/auth/authSlice";
import { myOrder, orderDetail } from "../../features/order/orderSlice";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const WriteReview = () => {
  const { productId } = useParams();
  // console.log(productId);
  const [value, setValue] = useState(0);
  const [avatar, setAvatar] = useState();
  const product = useSelector(oneProduct);
  const loading = useSelector(isloading);
  const { user } = useSelector(userData);
  const orders = useSelector(orderDetail);
  console.log(orders);
  // console.log(user);

  const { showAlert } = useAlert();
  const dispatch = useDispatch();
  // console.log(loading);
  // console.log(product);
  const isUserPurchaseProduct = orders?.orders?.some((order) =>
    order?.orderItems?.some((iteam) => iteam._id === productId)
  );

  console.log(isUserPurchaseProduct);
  // const show = isUserPurchaseProdutc(productId);
  // console.log(isUserPurchaseProdutc());
  useEffect(() => {
    (async () => {
      await dispatch(myOrder());
    })();
  }, [dispatch]);

  const handelSubmit = async (e) => {
    e.preventDefault();

    const fromData = new FormData(e.currentTarget);
    fromData.set("productId", productId);
    fromData.set("rating", value);
    // console.log([...fromData.entries()]);
    // console.log(e.currentTarget);

    const data = await dispatch(addProductReview(fromData)).then(
      async (result) => {
        return await result.payload.data;
      }
    );

    if (data.success) {
      showAlert(data.message, "success");
    } else {
    }
    console.log(data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
        // setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(fetchOneProduct(productId));
    })();
  }, [dispatch, productId]);
  return (
    <>
      {!loading && (
        <div className=" bg-gray-200  w-[100%] p-[10px] ">
          <div className="bg-white  flex justify-between items-center ">
            <h2 className="text-3xl font-semibold px-[10px] py-[20px] max-[500px]:text-xl  ">
              Rating & Review
            </h2>

            <Link>
              <div className="flex items-center pr-[20px] ">
                <div className="mr-[20px] text-end ">
                  <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap ">
                    {product?.name}
                  </p>
                  <div className="flex  justify-end  ">
                    <span className="bg-[green] flex rounded  px-[8px] py-[4px]  items-center mr-[10px]  text-white ">
                      {product.ratings}
                      <span className="   ">
                        <IoMdStar />
                      </span>
                    </span>

                    <p className="text-lg">({product.reviews.length})</p>
                  </div>
                </div>
                <div className="w-[60px]  ">
                  <img
                    src={product?.images[0]?.url}
                    alt="IMG"
                    className="h-[60px]"
                  />
                </div>
              </div>
            </Link>
          </div>

          <div className="flex mt-[10px] ">
            <div className="w-[30%] mr-[20px] bg-white px-[30px] py-[20px]   max-[600px]:hidden ">
              <div className="text-2xl text-black font-semibold mb-4 border-b-[1px]   ">
                What makes a good review
              </div>
              <div className="text-xl text-gray-700 mb-4">
                <p className="mb-3 text-black">Have you used this product?</p>
                <span className="text-base">
                  Your review should be about your experience with the product.
                </span>
              </div>

              <div className="text-xl text-gray-700 mb-4">
                <p className="mb-3 text-black">Why review a product?</p>
                <span className="text-base">
                  Your valuable feedback will help fellow shoppers decide!
                </span>
              </div>

              <div className="text-xl text-gray-700 mb-4">
                <p className="mb-3 text-black">How to review a product?</p>
                <span className="text-base">
                  Your review should include facts. An honest opinion is always
                  appreciated. If you have an issue with the product or service,
                  please contact us from the help center.
                </span>
              </div>
            </div>
            {isUserPurchaseProduct ? (
              <div className="bg-white w-[70%] px-[30px] py-[20px]  max-[600px]:w-[100%]  ">
                <div className="border-b-[1px]">
                  <div className="text-2xl text-black font-semibold mb-4   ">
                    Rate this product
                  </div>
                  <div className="ml-[20px]">
                    <Rating
                      name="simple-controlled"
                      value={value}
                      size="large"
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </div>
                </div>

                <div className="mt-[20px]">
                  <div className="text-2xl text-black font-semibold mb-4   ">
                    Review this product
                  </div>

                  <div className="m-auto w-[80%]">
                    <Box
                      onSubmit={handelSubmit}
                      component="form"
                      sx={{
                        "& .MuiTextField-root": {
                          m: 1,

                          width: "100%",
                        },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        type="text"
                        id="review"
                        label="review"
                        multiline
                        rows={4}
                        defaultValue="Add you review"
                        name="comment"
                      ></TextField>

                      <TextField
                        type="text"
                        id="title"
                        label="title"
                        multiline
                        rows={1}
                        name="title"
                        defaultValue=" Add your review title "
                      />
                      <TextField
                        id="name"
                        label="Name"
                        multiline
                        rows={1}
                        InputProps={{
                          readOnly: true,
                        }}
                        defaultValue={user?.name}
                      />

                      <img src={avatar} alt="avatar" className="h-[100px]" />
                      <div className="flex justify-center mb-[10px]">
                        <Button
                          component="label"
                          variant="contained"
                          onChange={handleFileChange}

                          //   startIcon={<CloudUploadIcon />}
                        >
                          Upload images
                          <VisuallyHiddenInput
                            multiple
                            type="file"
                            name="avatar"
                          />
                        </Button>
                      </div>
                      <div className="w-[100%] flex justify-center ">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 w-[30%] max-[500px]:text-[16px] rounded-full"
                        >
                          <VisuallyHiddenInput type={`submit`} />
                          Submit
                        </button>
                      </div>
                    </Box>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white w-[70%] px-[30px] py-[20px] flex items-center max-[600px]:w-[100%]">
                <div
                  id="reviewMessage"
                  class=" mx-auto mt-8 p-4 rounded-md text-center font-sans "
                >
                  <h4 className="text-3xl font-semibold">
                    {" "}
                    Haven't purchased this product?{" "}
                  </h4>

                  <p className="text-lg text-gray-400 ">
                    Sorry! You are not allowed to review this product since you
                    haven't bought it.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WriteReview;
