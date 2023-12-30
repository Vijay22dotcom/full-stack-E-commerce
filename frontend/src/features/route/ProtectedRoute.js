import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Route, Navigate } from "react-router-dom";
import { isLoading, userData, userDataLoad } from "../auth/authSlice";

const ProtectedRoute = ({ children, isForAdmin }) => {
  // console.log(role);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(userData);
  const loading = useSelector(isLoading);
  const isLoggin = JSON.parse(localStorage.getItem("isLoggedIn"));
  const role = JSON.parse(localStorage.getItem("role"));
  console.log(role !== "admin");
  // console.log(user);

  useEffect(() => {}, [dispatch]);

  // if (loading) {
  //   // Optional: You can render a loading spinner or message while user data is being fetched
  //   return <div>Loading...</div>;
  // }

  {
    if (isLoggin === false) {
      return <Navigate to="/login" />;
    } else {
      if (role !== "admin" && isForAdmin === true) {
        return <Navigate to="/login" />;
      } else {
        return children;
      }
    }
  }
  // return isLoggin ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
