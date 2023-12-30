import React, { useState } from "react";
import { Alert, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../features/auth/authSlice";

const PasswordReset = () => {
  const [passwords, setPasswords] = useState({});
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("error");

  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(token);

  const handleInput = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async () => {
    const { password, confirmPassword } = passwords;
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        const data = await dispatch(resetPassword({ passwords, token })).then(
          (result) => {
            return result.payload.data;
          }
        );
        console.log(data);

        if (data.success) {
          setOpen(true);
          setError("change password successfuly");
          setErrorType("success");
          navigate("/login");
        } else {
          setOpen(true);
          setError(data.message);
          setErrorType("error");
        }
      } else {
        setOpen(true);
        setError("please check password");
        setErrorType("error");
      }
    } else {
      setOpen(true);
      setError("please enter password");
      setErrorType("error");
    }
  };
  return (
    <div>
      <div className=" w-[300px] h-[150px] m-auto p-[10px]  flex flex-col items-center mt-[100px] border ">
        <p className=" border-b-2   mb-[10px] ">FORGOT PASSWORD</p>
        <input
          type="password"
          name="password"
          onChange={handleInput}
          placeholder="Enter your password"
          className=" border-2 rounded-3xl  w-[280px] focus:outline-none focus:ring focus:border-gray-500  p-1 pl-6 mb-2 block  "
        />
        <input
          type="password"
          name="confirmPassword"
          onChange={handleInput}
          placeholder="Enter your confirmPassword"
          className=" border-2 rounded-3xl  w-[280px] focus:outline-none focus:ring focus:border-gray-500  p-1 pl-6 mb-2 block  "
        />
        <Button variant="contained" onClick={handleResetPassword}>
          {"save"}
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
    </div>
  );
};

export default PasswordReset;
