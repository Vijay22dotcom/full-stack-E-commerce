import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import UserData from "../context/userdata";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { login, userDataLoad, userLogin } from "../../features/auth/authSlice";
import AlertComponent from "../../component/alert/Alert";
import { Alert } from "@mui/material";
import { useAlert } from "../../contex/alert/AlertContex";
const Login = () => {
  // console.log("login render");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  // const[response,setrespone]=useState({})
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(true);
  const [errorType, setErrorType] = useState("error");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    // console.log(user);
    // setOpen(true);

    const data = await dispatch(userLogin(user)).then(async (result) => {
      return await result.payload.data;
    });

    if (data.success) {
      showAlert("User login successfully", "success");
      // setError("User login successfully");
      // setErrorType("success");
      navigate("/");
      dispatch(userDataLoad());
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", JSON.stringify(data.user.role));
    } else {
      // setError(data.message);
      // setErrorType("error");
      showAlert(data.message, "error");
    }

    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="register w-[98vw] h-[350px] flex flex-col items-center my-[10%]  ">
        <div className="  flex flex-col  m-auto  border-2 rounded-3xl p-[5vw]  ">
          <h2 className="text-center  text-3xl  mb-3 text-blue-500">login</h2>

          <form onSubmit={handlesubmit}>
            <div className="inputuser  relative ">
              <i className=" absolute top-[10px] left-2 cursor-pointer">
                <AiOutlineMail />
              </i>

              <input
                type="email"
                name="email"
                className="border-2 rounded-3xl focus:outline-none focus:ring   w-[300px]   p-1 pl-6 mb-2"
                onChange={handlechange}
                placeholder="enter email"
                value={user.email}
              />
            </div>

            <div className="inputuser  relative ">
              <i className=" absolute  top-[10px]  left-2     cursor-pointer">
                <RiLockPasswordLine />
              </i>
              <input
                type="password"
                name="password"
                className="border-2 rounded-3xl  w-[300px] focus:outline-none focus:ring  p-1 pl-6 mb-2"
                onChange={handlechange}
                placeholder="enter password"
                value={user.password}
              />
            </div>

            <div className="w-full flex items-center">
              <button
                type="submit"
                className="w-[50%]  m-auto bg-blue-500 text-white rounded-3xl py-2 transition-transform transform hover:scale-105 focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-center mt-2 ">
            <p className=" text-blue-400 text-end mb-1 text-[15px] ">
              <Link to="/password/forgot">Forgot Password</Link>
            </p>
            <p>
              {" "}
              i have no account{" "}
              <span
                className="cursor-pointer text-blue-400"
                onClick={() => navigate("/register")}
              >
                REGISTER
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
