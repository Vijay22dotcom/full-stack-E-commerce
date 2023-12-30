import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  isLoadingForUpload: false,
  isError: false,
  errorMessage: "",
  orders: {},
  orderDetails: [],
};

export const createrOrder = createAsyncThunk("createrOrder", async (order) => {
  try {
    console.log(order);
    const responce = await axios.post(
      "http://localhost:4000/api/v1/order/new",
      order,
      {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      }
    );
    return await responce;
  } catch (error) {
    const errorResponse = await error.response;
    console.log(errorResponse);
    if (errorResponse) {
      const { status, data } = errorResponse;
      // Access the status code and error message
      console.log("Status Code:", status);
      console.log("Error Message:", data);
      return await errorResponse;
    }
  }
});

export const myOrder = createAsyncThunk("myOrder", async () => {
  try {
    const responce = await axios.get("http://localhost:4000/api/v1/orders/me", {
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
    });
    return await responce;
  } catch (error) {
    const errorResponse = await error.response;
    console.log(errorResponse);
    if (errorResponse) {
      const { status, data } = errorResponse;
      // Access the status code and error message
      console.log("Status Code:", status);
      console.log("Error Message:", data);
      return await errorResponse;
    }
  }
});

export const getOneOrderDetail = createAsyncThunk(
  "getOneOrderDetail",
  async (id) => {
    try {
      const responce = await axios.get(
        `http://localhost:4000/api/v1/order/${id}`,
        {
          headers: { "Content-Type": "application/json" },

          withCredentials: true,
        }
      );
      return await responce;
    } catch (error) {
      const errorResponse = await error.response;
      console.log(errorResponse);
      if (errorResponse) {
        const { status, data } = errorResponse;
        // Access the status code and error message
        console.log("Status Code:", status);
        console.log("Error Message:", data);
        return await errorResponse;
      }
    }
  }
);

export const fetchAllOrderForAdmin = createAsyncThunk(
  "fetchAllOrderForAdmin",
  async () => {
    try {
      const responce = await axios.get(
        "http://localhost:4000/api/v1/admin/orders",
        {
          headers: { "Content-Type": "application/json" },

          withCredentials: true,
        }
      );
      return await responce;
    } catch (error) {
      const errorResponse = await error.response;
      console.log(errorResponse);
      if (errorResponse) {
        const { status, data } = errorResponse;
        // Access the status code and error message
        console.log("Status Code:", status);
        console.log("Error Message:", data);
        return await errorResponse;
      }
    }
  }
);

export const updateOrder = createAsyncThunk(
  "updateOrder",
  async ({ id, data }) => {
    try {
      console.log(id, data);
      const responce = await axios.put(
        `http://localhost:4000/api/v1/admin/order/${id}`,
        data,
        {
          headers: { "Content-Type": "application/json" },

          withCredentials: true,
        }
      );
      return await responce;
    } catch (error) {
      const errorResponse = await error.response;
      console.log(errorResponse);
      if (errorResponse) {
        const { status, data } = errorResponse;
        // Access the status code and error message
        console.log("Status Code:", status);
        console.log("Error Message:", data);
        return await errorResponse;
      }
    }
  }
);

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  extraReducers: (builder) => {
    // FOR CREATE ORDER
    builder.addCase(createrOrder.pending, (state, action) => {
      state.isLoading = true;
      state.order = [];
    });

    builder.addCase(createrOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = action.payload.data;
    });

    builder.addCase(createrOrder.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = true;
      state.errorMessage = action.payload.message;
    });

    // FOR GET USER ORDER
    builder.addCase(myOrder.pending, (state, action) => {
      state.isLoading = true;
      state.order = [];
    });

    builder.addCase(myOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = action.payload.data;
    });

    builder.addCase(myOrder.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = true;
      state.errorMessage = action.payload.message;
    });

    // FOR GET ONE  ORDER DETAIL
    builder.addCase(getOneOrderDetail.pending, (state, action) => {
      state.isLoading = true;
      state.orderDetails = [];
    });

    builder.addCase(getOneOrderDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderDetails = action.payload.data;
    });

    builder.addCase(getOneOrderDetail.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = true;
      state.errorMessage = action.payload.message;
    });

    // FOR GET ALL ORDER FOR ADMIN
    builder.addCase(fetchAllOrderForAdmin.pending, (state, action) => {
      state.isLoading = true;
      state.orders = [];
      state.isLoadingForUpload = true;
    });

    builder.addCase(fetchAllOrderForAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload.data;
      state.isLoadingForUpload = false;
    });

    builder.addCase(fetchAllOrderForAdmin.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = true;
      state.errorMessage = action.payload.message;
    });

    // FOR UPDATE ORDER ADMIN
    builder.addCase(updateOrder.pending, (state, action) => {
      state.isLoading = true;
      state.order = [];
    });

    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
    });

    builder.addCase(updateOrder.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = true;
      state.errorMessage = action.payload.message;
    });
  },
});

export const orderDetail = (state) => state.order.order;
export const orderDetails = (state) => state.order.orderDetails;
export const isLoading = (state) => state.order.isLoading;
export const allOrders = (state) => state.order.orders;

export default orderSlice.reducer;
