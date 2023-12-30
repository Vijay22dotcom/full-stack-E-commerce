import { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/Header/Header";
import { Outlet } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./component/Footer/Footer";
import Home from "./page/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "./features/product/productSlice";
import SearchFull from "./component/search/SearchFull";
import axios from "axios";
import { AlertProvider } from "./contex/alert/AlertContex";
import AlertComponent from "./component/alert/Alert";

function App() {
  console.log("app render");

  useEffect(() => {
    // getStripeApiKey();
  }, []);

  return (
    <>
      <Header />
      <AlertComponent />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
