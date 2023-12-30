import React, { useEffect, useState } from "react";
import axios from "axios";
import AlertComponent from "../../component/alert/Alert";
import { useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { RiLockPasswordLine } from "react-icons/ri";
import { Alert, Button, styled } from "@mui/material";

import { AiOutlineMail } from "react-icons/ai";
import {
  errorMessage,
  isLoading,
  userData,
  userRegister,
} from "../../features/auth/authSlice";
import { useAlert } from "../../contex/alert/AlertContex";

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

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const userDataFromServer = useSelector(userData);
  const errorMessageFromServer = useSelector(errorMessage);
  const loading = useSelector(isLoading);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");
  const [open, setOpen] = useState(true);
  const [error, setError] = useState([]);
  const [errorType, setErrorType] = useState("error");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confPassword: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // setAvatar(reader.result);
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }

    // console.log("Is Avatar a File?", avatar instanceof File);
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    const fromData = new FormData(e.currentTarget);
    console.log([...fromData.entries()]);
    // console.log(e.currentTarget);
    const data = await dispatch(userRegister(fromData)).then((result) => {
      return result.payload.data;
      // console.log(result);
    });

    if (user.password === user.confPassword) {
      if (data.success) {
        showAlert(" User Register successfully ", "success");
        // setError([{ message: " User Register successfully " }]);
        // setErrorType("success");
      } else {
        showAlert(data.message, "error");
        // setError([{ message: data.message }]);
        // setErrorType("error");
      }
    } else {
      showAlert("plese check password and enter same password", "error");
      // setError([{ message: "plese check password and enter same password" }]);
      // setErrorType("error");
    }

    navigate("/");

    setUser({
      name: "",
      email: "",
      password: "",
      confPassword: "",
    });
  };

  return (
    <>
      <div className="register w-[98vw] h-[500px] flex items-center flex-col justify-center mt-[100px] ">
        <div className=" flex flex-col  m-auto border-2 rounded-3xl p-[5vw]   ">
          <h2 className="text-center  text-3xl  mb-3 text-black">Register</h2>

          <form onSubmit={handlesubmit}>
            <div className="inputuser relative ">
              <i className=" absolute top-[10px] left-2 cursor-pointer">
                <BiUserCircle />
              </i>
              <input
                type="text"
                name="name"
                className="border-2 rounded-3xl  w-[300px] focus:outline-none focus:ring  p-1 pl-6 mb-2"
                onChange={handlechange}
                placeholder="enter name"
                value={user.name}
              />
            </div>

            <div className="inputuser relative ">
              <i className=" absolute top-[10px] left-2 cursor-pointer">
                <AiOutlineMail />
              </i>
              <input
                type="email"
                name="email"
                className="border-2 rounded-3xl focus:outline-none focus:ring  w-[300px]   p-1 pl-6 mb-2"
                onChange={handlechange}
                value={user.email}
                placeholder="enter email"
              />
            </div>

            <div className="inputuser relative">
              <i className=" absolute  top-[10px]  left-2     cursor-pointer">
                <RiLockPasswordLine />
              </i>
              <input
                type="password"
                name="password"
                className="border-2 rounded-3xl  focus:outline-none focus:ring  w-[300px]   p-1 pl-6 mb-2"
                onChange={handlechange}
                value={user.password}
                placeholder="enter password"
              />
            </div>

            <div className="inputuser relative">
              <i className=" absolute  top-[10px]  left-2     cursor-pointer">
                <RiLockPasswordLine />
              </i>
              <input
                type="password"
                name="confPassword"
                value={user.confPassword}
                className="border-2 rounded-3xl focus:outline-none focus:ring   w-[300px]   p-1 pl-6 mb-2"
                onChange={handlechange}
                placeholder="conform pasword"
              />
            </div>

            <div id="registerImage" className="flex w-[300px] ">
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-[30px]  h-[30px] mr-[10px] rounded-full "
              />
              <Button
                component="label"
                variant="contained"
                onChange={handleFileChange}

                //   startIcon={<CloudUploadIcon />}
              >
                Upload file for avatar
                <VisuallyHiddenInput
                  type="file"
                  name="avatar"
                  accept="image/*"
                />
              </Button>
              {/* <input
                className="flex p-0 file:cursor-pointer file:w-[100%] "
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleFileChange}
              /> */}
            </div>
            <div className="w-[300px] flex justify-between mt-[10px]">
              <input
                type="submit"
                value={loading ? "loading..." : "register"}
                className="m-auto border-2 text-l rounded-3xl   w-[50%]  bg-blue-500 text-white  py-2 cursor-pointer transition-transform transform hover:scale-105 focus:outline-none  p-1"
                // onClick={handlesubmit}
              />
            </div>
          </form>
          <div className="text-center">
            <p>
              {" "}
              i have aleady an account{" "}
              <span
                className="cursor-pointer text-blue-500 "
                onClick={() => navigate("/login")}
              >
                LOGIN
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Register;
