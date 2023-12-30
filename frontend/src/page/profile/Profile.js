import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import {
  isLoading,
  isLoadingForUpload,
  updateUserProfile,
  userData,
  userDataLoad,
} from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, Avatar } from "@mui/material";
import AlertComponent from "../../component/alert/Alert";

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
const Profile = () => {
  const user = useSelector(userData);
  console.log(user);
  const LoadingForUpload = useSelector(isLoadingForUpload);
  const dispatch = useDispatch();
  // console.log(LoadingForUpload);
  const userIsAuthorize = user.success;

  const [isEditable, setIsEdittable] = useState(false);
  const [avatar, setAvatar] = useState(user?.user?.avatar?.url);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("error");
  // console.log(avatar);

  const handleEdit = () => {
    setIsEdittable(!isEditable);
    console.log(isEditable);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fromData = new FormData(e.currentTarget);
    console.log([...fromData.entries()]);
    console.log(e.currentTarget);

    const data = await dispatch(updateUserProfile(fromData)).then((result) => {
      return result.payload.data;
    });
    // const data = {
    //   success: true,
    // };

    dispatch(userDataLoad());

    setIsEdittable(false);
    if (data.success) {
      setOpen(true);
      setError("Update profile successfully");
      setErrorType("success");
    } else {
      console.log(data);
      console.log(data.error.statusCode);
      if (data.error.statusCode === 400) {
        setOpen(true);
        setError(data.message);
        setErrorType("error");
      } else {
        setOpen(true);
        setError("somethig wrong, please reenter all information ");
        setErrorType("error");
      }
    }
  };

  return (
    <>
      <form
        action=""
        className="flex p-[20px]  max-[670px]:flex-col  "
        onSubmit={handleSubmit}
      >
        <div className="w-[30%]   max-[670px]:w-[100%]  ">
          <div className="m-[20px]  max-[670px]:hidden first-letter:">
            <Avatar
              alt="Remy Sharp"
              src={avatar ?? user?.user?.avatar.url}
              sx={{ width: 300, height: 300 }}
            />
          </div>

          <div className="  hidden  justify-center  m-[20px] max-[670px]:flex   ">
            <Avatar
              alt="Remy Sharp"
              src={avatar ?? user?.user?.avatar.url}
              sx={{ width: 150, height: 150 }}
            />
          </div>

          <div className="flex justify-center">
            {isEditable && (
              <Button
                component="label"
                variant="contained"
                onChange={handleFileChange}

                //   startIcon={<CloudUploadIcon />}
              >
                Upload file for avatar
                <VisuallyHiddenInput type="file" name="avatar" />
              </Button>
            )}
          </div>
        </div>
        <div className="mt-[30px]  ml-[20px] w-[70%]  max-[670px]:w-[100%] flex flex-col items-center ">
          <div>
            <span className="block text-[20px] font-semibold ">name</span>
            <input
              type="text"
              name="name"
              defaultValue={user?.user?.name}
              // onChange={handleInput}
              disabled={!isEditable}
              className={`bg-transparent  ${
                isEditable ? "border" : ""
              }  text-[18px] `}
            />
          </div>
          <div className="mt-[10px]">
            <span className="block text-[20px] font-semibold  ">email</span>
            <input
              type="text"
              name="email"
              defaultValue={user?.user?.email}
              // onChange={handleInput}
              disabled={!isEditable}
              className={`bg-transparent  ${
                isEditable ? "border" : ""
              } text-[18px]  `}
            />
          </div>

          <div className="mt-[20px] flex justify-center ">
            {isEditable ? (
              <Button
                component="label"
                variant="contained"
                //   startIcon={<CloudUploadIcon />}
              >
                {LoadingForUpload ? "Saving..." : "Save"}

                <VisuallyHiddenInput type={`submit`} />
              </Button>
            ) : (
              <Button variant="contained" onClick={handleEdit}>
                Edit profile
              </Button>
            )}
          </div>
          {/* <div className="mt-[20px]">
            <Button variant="contained">Change password</Button>
          </div> */}
          {/* <input type="submit" value="submit" /> */}
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
      </form>
    </>
  );
};

export default Profile;
