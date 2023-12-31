import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../component/button/buttonn.css";
import {
  decrementQuantity,
  deleteIteam,
  incrementQuantity,
} from "../../features/shopingCard/cardSlice";
import Button, { ButtonProps } from "@mui/material/Button";
import { userData } from "../../features/auth/authSlice";

function ShopingCart({}) {
  const [total, settotal] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carts = useSelector((state) => state.cart);
  const user = useSelector(userData);
  const userIsAuthorize = user.success;

  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    settotal(total);
  }, [carts]);

  const handleIncrease = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handledecrease = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handledelet = (id) => {
    dispatch(deleteIteam(id));
  };

  const handleCheckOut = () => {
    if (userIsAuthorize) {
      navigate("/order/shippinginfo");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="cart border font-sans  max-md:flex-col w-[100%] flex flex-row bg-gray-200 p-[20px] ">
        <div className="main border w-[70%] max-md:w-[100%]  bg-white md:flex-shrink-0">
          <div className="flex justify-between px-[20px]  text-3xl  max-md:text-[20px] py-[10px] border-b-2">
            <h2 className=" font-semibold pb-1">Shopping cart</h2>
            <h2 className=" font-semibold pb-1">
              Total items - {carts.length}
            </h2>
          </div>

          {carts.length > 0 ? (
            carts.map((cart) => {
              return (
                <div
                  className="cartiteam border-b-2 flex max-md:pb-[10px] "
                  key={cart.id}
                >
                  <div className="  p-5  w-[50%] flex items-center max-md:p-1 ">
                    <img
                      src={cart.images[0].url}
                      alt=""
                      className="h-[250px]  md:h-[200px] "
                    />
                  </div>
                  <div className="info ml-5 p-5 w-[50%] md:p-1 ">
                    <p className="text-xl font-sans mb-2  md:text-[20px]  overflow-hidden">
                      {cart.name}
                    </p>

                    <p className="text-2xl  font-semibold  mb-2 ">
                      ₹{cart.price}{" "}
                    </p>

                    <span>
                      {cart.stock ? (
                        <span className="text-[green]  font-medium ">
                          In stock{" "}
                        </span>
                      ) : (
                        <span className="text-[red]  font-medium ">
                          Out of stock
                        </span>
                      )}
                    </span>
                    <div className="counter  flex items-center  mt-3">
                      <button
                        onClick={() => handledecrease(cart._id)}
                        disabled={cart.quantity <= 1}
                        className="bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-block   cursor-pointer    hover:bg-blue-500  active:bg-blue-800 transition-all duration-700    "
                      >
                        -
                      </button>
                      <div></div>{" "}
                      <div className="text-center  bg-white text-blue-800 w-10    ">
                        {cart.quantity}
                      </div>
                      <div>
                        <button
                          onClick={() => handleIncrease(cart._id)}
                          disabled={cart.stock <= cart.quantity}
                          className="bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-block   cursor-pointer   hover:bg-blue-500  active:bg-blue-800 transition-all duration-700  "
                        >
                          {" "}
                          +
                        </button>{" "}
                      </div>
                    </div>
                    <p className="text-2xl  md:text-xl  font-semibold mt-3">
                      total:₹ {cart.price * cart.quantity}
                    </p>
                    <div
                      className="midal  flex justify-between  "
                      // style={{ marginTop: "20px", width: "477px" }}
                    >
                      <div
                        className="text-white bg-red-500 cursor-pointer hover:bg-red-700 px-4 py-2 rounded-full focus:outline-none focus:shadow-outline active:bg-red-800  transition-all duration-500"
                        onClick={() => handledelet(cart._id)}
                      >
                        remove
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <span className="flex justify-center flex-col items-center h-64">
              <p className="text-5xl text-center">No cart items</p>
              <Link to={"/products"} className="text-blue-700 text-xl">
                Go to shopping{" ->"}
              </Link>
            </span>
          )}
        </div>

        <div className="paybox ml-[20px] mt-4  max-md:ml-0 max-md:w-[100%] w-[28.5%] h-80 p-7 bg-white md:flex-shrink-0">
          <div className="discount flex justify-between mt-4 ">
            <h2 className="  font-sans from-neutral-400 text-xl ">subtotal</h2>
            <h2 className="font-sans  font-semibold">₹{total}</h2>
          </div>
          <div className="discount flex justify-between mt-4 ">
            <h2 className="  font-sans from-neutral-400 text-xl ">discount</h2>
            <h2
              className="font-sans  font-semibold "
              style={{ color: "#9DC79F" }}
            >
              ₹00
            </h2>
          </div>

          <div className="discount flex justify-between mt-8  border-t-2 border-b-2 ">
            <h2 className="  font-sans font-semibold text-xl ">total amount</h2>
            <h2 className="font-sans  font-semibold  text-2xl ">₹{total}</h2>
          </div>

          <div className="checkout flex  justify-center mt-6 ">
            <button
              className=" bg-green-500 hover:bg-green-700 active:bg-green-800 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline transition-all  transform active:scale-95 duration-700   "
              onClick={handleCheckOut}
              disabled={carts.length <= 0}
            >
              check out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopingCart;
