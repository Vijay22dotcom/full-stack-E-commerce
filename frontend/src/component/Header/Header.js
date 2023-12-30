import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Search from "../search/Search";
import { LuLayoutDashboard } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  hideSearch,
  setKeywords,
  showSearch,
} from "../../features/search/searchSlice";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdOutlineHome } from "react-icons/md";
import { RiContactsBook2Line } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import "./header.css";
import {
  isLoggedIn,
  logout,
  userData,
  userDataLoad,
  userLogout,
} from "../../features/auth/authSlice";
import { useAlert } from "../../contex/alert/AlertContex";

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const carts = JSON.parse(localStorage.getItem("cart"));

  const dispatch = useDispatch();
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);
  const keywords = useSelector((state) => state.search.keyword);
  // console.log(keywords);

  const user = useSelector(userData);
  const { showAlert } = useAlert();
  // console.log(user);
  const userIsAuthorize = user.success;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userDataLoad());
    // console.log("header");
  }, [dispatch]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const searchBlock = (e) => {
    e.stopPropagation();
    dispatch(showSearch());
  };

  const handleSearchInput = (e) => {
    console.log(e.target.value);

    dispatch(setKeywords(e.target.value));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/products/search/${keywords}`);
    dispatch(hideSearch());
  };

  const handleLogout = async () => {
    await dispatch(userLogout());
    showAlert("User logout successfully", "success");
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("role");
    dispatch(userDataLoad());
    navigate("/");
    console.log("logout");
  };

  const navIteam = [
    {
      name: "Home",
      slug: "/",
      logo: "<MdOutlineHome />",
    },
    {
      name: "products",
      slug: "/products",
    },
    {
      name: "contact",
      slug: "/contact",
      logo: "<RiContactsBook2Line />",
    },
    {
      name: "About",
      slug: "/about",
    },
  ];

  return (
    <>
      <div className="relative">
        <header className="bg-gray-900 text-white py-4 p-2 ">
          <div className="container mx-auto flex  justify-between items-center">
            <div
              className="text-3xl max-md:text-xl font-semibold cursor-pointer "
              onClick={() => navigate("/")}
            >
              LOGO
            </div>

            <div className="hidden sm:flex space-x-4  ">
              <ul className="flex space-x-4 items-center ">
                {navIteam.map((iteam) => (
                  <li key={iteam.name}>
                    <Link className="hover:text-gray-300" to={iteam.slug}>
                      {iteam.name}
                    </Link>
                    {/* <button to="#" className="hover:text-gray-300">
                  {iteam.name}
                </button> */}
                  </li>
                ))}
                {user?.user?.role === "admin" && (
                  <li>
                    <Link
                      className="hover:text-gray-300"
                      to={"/admin/dashboard"}
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
              </ul>

              <div className="relative  " onClick={searchBlock}>
                <form action="" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    placeholder="Search"
                    value={keywords}
                    className="bg-gray-600  text-white pl-8 pr-4 py-2 rounded focus:outline-none focus:ring focus:border-gray-500 w-[30vw] "
                    onChange={handleSearchInput}
                  />
                </form>
                <div className="absolute top-[12px]  left-[10px]  text-[17px] ">
                  <AiOutlineSearch />
                </div>

                {isSearchOpen && (
                  <div className="absolute  z-50 mt-2  ">
                    <Search keyword={keywords} />
                  </div>
                )}
              </div>
            </div>

            <div
              className=" hidden  relative  max-sm:block    "
              onClick={searchBlock}
            >
              <form action="" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search"
                  onChange={handleSearchInput}
                  className="bg-gray-600 w-[60vw] text-white pl-8 pr-4 py-2 rounded focus:outline-none focus:ring focus:border-gray-500 "
                />
                <samp className="absolute top-[12px]  left-[10px]  text-[17px] ">
                  <AiOutlineSearch />
                </samp>

                {isSearchOpen && (
                  <div className="absolute  z-50 mt-2  w-[60vw] ">
                    <Search keyword={keywords} w={"60vw"} />
                  </div>
                )}
              </form>
            </div>

            <div className="flex   items-center ">
              {/* <div>
                <div className=" text-[20px] cursor-pointer p-3  border rounded-full">
                  <AiOutlineSearch />
                </div>
              </div> */}

              <div
                className=" text-[30px] cursor-pointer mr-[10px] mt-[-10px] max-[426px]:text-[18px] "
                onClick={() => navigate("/cart")}
              >
                <Badge
                  badgeContent={carts.length}
                  color="primary"
                  invisible={!carts.length}
                >
                  <IoCartOutline />
                </Badge>
              </div>

              <div>
                <div
                  className=" text-[20px]  cursor-pointer p-[10px]  max-[426px]:text-[15px] "
                  onClick={() => navigate("/account")}
                >
                  {userIsAuthorize ? (
                    // <img
                    //   src={user.user.avatar.url}
                    //   alt=""
                    //   className=" h-[40px]   "
                    // />
                    <Avatar alt="Remy Sharp" src={user?.user?.avatar?.url} />
                  ) : (
                    <CgProfile />
                  )}
                </div>
              </div>

              <div
                className="relative "
                onMouseOver={() => setDropdownOpen(true)}
                onMouseOut={() => setDropdownOpen(false)}
              >
                <div
                  className="text-gray-300 hover:text-white  p-[10px] "
                  onClick={toggleDropdown}
                >
                  {isDropdownOpen ? <IoCloseSharp /> : <FaBars />}
                </div>

                {isDropdownOpen && (
                  <div
                    className={`menu  absolute right-0 top-[30px] w-48 text-gray-200   border rounded-lg shadow-lg   z-50   bg-gray-900
                       active close
                      `}
                  >
                    <ul className="p-[10px] text-[18px]  font-semibold  ">
                      <li className="py-[15px]">
                        <Link to="/account" className="flex items-center">
                          <span className="pr-1">
                            <CgProfile />
                          </span>
                          My Profile
                        </Link>
                      </li>
                      <li className="py-[15px]">
                        <Link to="/orders" className="flex items-center">
                          <span className="pr-1">
                            <BsBoxSeam />
                          </span>
                          Order
                        </Link>
                      </li>
                      <li className="py-[15px]">
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center"
                        >
                          <span className="pr-1">
                            <FaRegHeart />
                          </span>
                          Wichlist
                        </Link>
                      </li>
                      {user?.user?.role === "admin" ? (
                        <li className="py-[15px]">
                          <Link
                            to={"/admin/dashboard"}
                            className="flex items-center"
                          >
                            <span className="pr-1">
                              <LuLayoutDashboard className=" text-lg" />
                            </span>
                            Dashboard
                          </Link>
                        </li>
                      ) : (
                        <li className="py-[15px]">
                          <a href="/setting" className="flex items-center">
                            <span className="pr-1">
                              <IoSettingsOutline />
                            </span>
                            Settings
                          </a>
                        </li>
                      )}

                      {userIsAuthorize ? (
                        <li className="py-[15px]">
                          <Link
                            to="/"
                            onClick={() => dispatch(handleLogout)}
                            className="flex items-center  cursor-pointer"
                          >
                            <span className="pr-1">
                              <CiLogout />
                            </span>
                            logout
                          </Link>
                        </li>
                      ) : (
                        <li className="py-[15px]">
                          <Link to="/login" className="flex items-center">
                            <span className="pr-1">
                              <BiLogIn />
                            </span>
                            Login
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* <div className=" absolute top-0   z-50 ">
          {isSearchOpen && <Search />}
        </div> */}
        {isSearchOpen && (
          <div
            className="absolute w-[98vw]  h-[100vh]  top-0 "
            onClick={(e) => {
              e.stopPropagation();
              dispatch(hideSearch());
            }}
          ></div>
        )}
      </div>
    </>
  );
}

export default Header;
