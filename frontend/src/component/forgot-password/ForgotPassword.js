import React, { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  isLoadingForUpload,
} from "../../features/auth/authSlice";
import { Alert } from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("error");

  const dispatch = useDispatch();
  const uploadLoading = useSelector(isLoadingForUpload);
  const handleForgotPassword = async () => {
    const data = await dispatch(forgotPassword({ email })).then((result) => {
      return result.payload.data;
    });

    if (data.success) {
      setOpen(true);
      setError(data.message);
      setErrorType("success");
    } else {
    }

    console.log(data);
  };

  return (
    <>
      <div className=" w-[300px] h-[150px] m-auto p-[10px]  flex flex-col items-center mt-[100px] border ">
        <p className=" border-b-2   mb-[10px] ">FORGOT PASSWORD</p>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          id=""
          placeholder="Enter your email"
          className=" border-2 rounded-3xl  w-[280px] focus:outline-none focus:ring focus:border-gray-500  p-1 pl-6 mb-2 block  "
        />
        <Button variant="contained" onClick={handleForgotPassword}>
          {uploadLoading ? "sanding mail" : "Change password"}
        </Button>

        <div className={`w-[30vw]  absolute top-[80px] right-0 `}>
          {open && (
            <Alert
              onClose={() => {
                setOpen(false);
              }}
              severity={errorType}
            >
              {error}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
