import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  userData,
  userDataLoad,
  userLogout,
} from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { BsBoxSeam } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePayment } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { BiConversation } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { useAlert } from "../../contex/alert/AlertContex";
const Account = () => {
  const user = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userIsAuthorize = user.success;
  const { showAlert } = useAlert();
  // console.log(userIsAuthorize);
  useEffect(() => {
    dispatch(userDataLoad());
    if (!userIsAuthorize) {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  // console.log(user.user?.avatar?.url);

  const handleLogout = async () => {
    await dispatch(userLogout());
    showAlert("User logout successfully", "success");
    localStorage.setItem("isLoggedIn", false);
    dispatch(userDataLoad());
    navigate("/");
    console.log("logout");
  };
  const profileList = [
    {
      name: "order",
      mainText: "Orders",
      subText: "Track your order",
      icon: <BsBoxSeam />,
      slug: "/orders",
    },
    {
      name: "Payment ",
      mainText: "Payment option",
      subText: "Edit or add payment method",
      icon: <MdOutlinePayment />,
      slug: "/me/paymentoption",
    },
    {
      name: "address",
      mainText: "Addresses",
      subText: "Edit addresses",
      icon: <FaMapLocationDot />,
      slug: "/me/address",
    },
    {
      name: "contact",
      mainText: "Contact us ",
      subText: "Chat or call with us ",
      icon: <BiConversation />,
      slug: "/me/contact",
    },
  ];
  return (
    <>
      <div className="  pl-[50px] pr-[50px] pt-[20px]   ">
        <div className=" w-[100%]   flex flex-wrap justify-center ">
          <Link
            className="myprofiel h-[100px] flex w-[300px] mr-[30px] mb-[30px] items-center border p-[20px] rounded-lg "
            to="/account/me"
          >
            <img
              src={user.user?.avatar?.url}
              alt="user"
              className="w-[80px] h-[80px] rounded-full  "
            />
            <div>
              <p className="text-[30px] ml-[20px]  ">{user.user?.name}</p>
              <p className="text-[15px] ml-[20px]  ">
                show and edit your profile
              </p>
            </div>
          </Link>
          {profileList.map((profile) => (
            <Link
              className="w-[300px] h-[100px] flex mr-[30px] mb-[30px]  items-center  border  cursor-pointer p-[20px] rounded-lg "
              key={profile?.name}
              to={profile?.slug}
            >
              <span className="text-[25px]">{profile.icon}</span>
              <div>
                <p className="text-[25px] ml-[20px]  ">{profile.mainText}</p>
                <p className="text-[15px] ml-[20px]  ">{profile.subText}</p>
              </div>
            </Link>
          ))}
          <div
            onClick={handleLogout}
            className="w-[300px] h-[100px] flex mr-[30px] mb-[30px]  items-center  border  cursor-pointer p-[20px] rounded-lg "
          >
            <span className="text-[25px]">
              <CiLogout />
            </span>
            <div>
              <p className="text-[25px] ml-[20px]  "> Logout</p>
              <p className="text-[15px] ml-[20px]  ">Logout your account</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
