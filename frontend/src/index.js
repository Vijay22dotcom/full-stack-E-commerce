import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./reducers/Store";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./page/Home/Home";
import OneProduct from "./component/product/oneProduct";
import AllProduct from "./page/product/AllProduct";
import SearchProduct from "./page/search/SearchProduct";
import Login from "./page/login/Login";
import Register from "./page/login/Register";
import Account from "./page/profile/Account";
import Profile from "./page/profile/Profile";
import ForgotPassword from "./component/forgot-password/ForgotPassword";
import PasswordReset from "./component/forgot-password/PasswordReset";
import ShoppingCard from "./page/card/ShoppingCard";
import ShippingInfo from "./component/shippinginfo/ShippingInfo";
import OrderConfirm from "./component/order/OrderConfirm";
import Payment from "./page/payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentSuccess from "./page/payment/paymentSuccess";
import UserOrder from "./component/order/UserOrder";
import OneOrderDetail from "./component/order/OneOrderDetail";
import { AlertProvider } from "./contex/alert/AlertContex";
import ProtectedRoute from "./features/route/ProtectedRoute";
import WriteReview from "./component/review/WriteReview";
import Dashboard from "./page/admin/Dashboard";
import ProductsAdmin from "./page/admin/productsAdmin";
import AddProduct from "./page/admin/AddProduct";
import EditProduct from "./page/admin/EditProduct";
import AllOrders from "./page/admin/AllOrders";
import OneOrder from "./page/admin/Oneorder";
import AllUser from "./page/admin/AllUser";
import UpdateUser from "./page/admin/UpdateUser";
import Review from "./page/admin/Review";
import ProductBycategory from "./page/product/productBycategory";
import AboutUs from "./component/about/About";
import Contact from "./component/contact/Contact";

const stripePromise = loadStripe(
  "pk_test_51OM0XUSGwG9kb001DkO5pval0VWdweqMWxklbQ5c09Gx6liZLubyyuo5WBGoMMXfSvshJwaclWnowQqjmwrcGTZq00bAKjAA8W"
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/password/reset/:token" element={<PasswordReset />} />
      <Route path="products" element={<AllProduct />} />
      <Route path="/category/:category" element={<ProductBycategory />} />
      <Route path=":productId/write-review" element={<WriteReview />} />
      <Route path="products/search" element={<SearchProduct />} />
      <Route path="products/search/:keyword" element={<SearchProduct />} />
      <Route
        path="products/search/:keyword/:productId"
        element={<OneProduct />}
      />

      <Route path="/products/:productId" element={<OneProduct />} />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/me"
        element={
          <ProtectedRoute>
            {" "}
            <Profile />{" "}
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <ShoppingCard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order/shippinginfo"
        element={
          <ProtectedRoute>
            <ShippingInfo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            {" "}
            <UserOrder />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order/confirm"
        element={
          <ProtectedRoute>
            <OrderConfirm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order/:id"
        element={
          <ProtectedRoute>
            {" "}
            <OneOrderDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment/success"
        element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute isForAdmin={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute isForAdmin={true}>
            <AllOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute isForAdmin={true}>
            <AllUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/user/:id"
        element={
          <ProtectedRoute isForAdmin={true}>
            <UpdateUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/order/:id"
        element={
          <ProtectedRoute isForAdmin={true}>
            <OneOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reviews"
        element={
          <ProtectedRoute isForAdmin={true}>
            <Review />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute isForAdmin={true}>
            <ProductsAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/addproduct"
        element={
          <ProtectedRoute isForAdmin={true}>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/product/:id"
        element={
          <ProtectedRoute isForAdmin={true}>
            <EditProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order/payment"
        element={
          <Elements stripe={stripePromise}>
            {" "}
            <Payment />{" "}
          </Elements>
        }
      />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AlertProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AlertProvider>
  </React.StrictMode>
);
reportWebVitals();
