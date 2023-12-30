import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import searchSlice from "../features/search/searchSlice";
import authSlice from "../features/auth/authSlice";
import cartSlice from "../features/shopingCard/cardSlice";
import orderSlice from "../features/order/orderSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    product: productReducer,
    search: searchSlice,
    auth: authSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});
