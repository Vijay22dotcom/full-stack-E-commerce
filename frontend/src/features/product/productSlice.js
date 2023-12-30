import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  dataProducts: [],
  isError: false,
  OneProduct: null,
  searchProduct: [],
  categoryList: [],
  message: [],
  uploadLoading: false,
  productForAdmin: [],
  reviews: [],
  cartProduct: [],
};

export const fetchProductByKeyword = createAsyncThunk(
  "fetchProductByKeyword",
  async ({ keyword, price = [0, 100000], category, rating = 0 }) => {
    // console.log(keyword, price);

    if (category) {
      const responce = await axios.get(
        `http://localhost:4000/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`
      );
      return responce;
    }
    const responce = await axios(
      `http://localhost:4000/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`
    );
    return responce;
  }
);

export const fetchProduct = createAsyncThunk(
  "fetchProduct",
  async ({ price = [0, 1000000], category, rating = 0 }) => {
    // console.log(category);

    if (category) {
      const responce = await axios.get(
        `http://localhost:4000/api/v1/products?price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`
      );
      return responce;
    }
    const responce = await axios.get(
      `http://localhost:4000/api/v1/products?price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`
    );

    return responce;
  }
);
export const fetchProductsByCategory = createAsyncThunk(
  "fetchProductsByCategory",
  async ({ price = [0, 1000000], category, rating = 0 }) => {
    try {
      const responce = await axios.get(
        `http://localhost:4000/api/v1/products?price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`
      );
      return responce;

      return responce;
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

export const fetchProductsForAdmin = createAsyncThunk(
  "fetchProductsForAdmin",
  async () => {
    try {
      const responce = await axios.get(
        `http://localhost:4000/api/v1/admin/products`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          withCredentials: true,
        }
      );

      return responce;
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
export const fetchCartProduct = createAsyncThunk(
  "fetchCartProduct",
  async (data) => {
    try {
      const responce = await axios.post(
        `http://localhost:4000/api/v1/cartproducts`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          withCredentials: true,
        }
      );

      return responce;
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

export const fetchOneProduct = createAsyncThunk(
  "fetchOneProduct",
  async (id) => {
    try {
      const responce = await axios.get(
        `http://localhost:4000/api/v1/product/${id}`
      );
      return responce;
    } catch (error) {
      const errorResponse = await error.response;
      console.log(errorResponse);
      if (errorResponse) {
        const { status, data } = errorResponse;
        // Access the status code and error message
        console.log("Status Code:", status);
        console.log("Error Message:", data);
        return await errorResponse;
        // errorMessage = data;
      }
    }
    // console.log(id);
  }
);

export const fetchProductsCategoryList = createAsyncThunk(
  "fetchProductsCategoryList",
  async (id) => {
    // console.log(id);
    const responce = await axios.get(
      `http://localhost:4000/api/v1/products/categorylist`
    );
    return responce;
  }
);

export const addProductReview = createAsyncThunk("addReview", async (data) => {
  try {
    const responce = await axios.put(
      "http://localhost:4000/api/v1/review",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        withCredentials: true,
      }
    );

    return await responce;
  } catch (error) {
    // console.log(data);

    const errorResponse = await error.response;
    console.log(errorResponse);
    if (errorResponse) {
      const { status, data } = errorResponse;
      // Access the status code and error message
      console.log("Status Code:", status);
      console.log("Error Message:", data);
      return await errorResponse;
      // errorMessage = data;
    }
  }
});

export const addNewProduct = createAsyncThunk("addNewProduct", async (data) => {
  try {
    const responce = await axios.post(
      "http://localhost:4000/api/v1/admin/products/new",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        withCredentials: true,
      }
    );

    return await responce;
  } catch (error) {
    // console.log(data);

    const errorResponse = await error.response;
    console.log(errorResponse);
    if (errorResponse) {
      const { status, data } = errorResponse;
      // Access the status code and error message
      console.log("Status Code:", status);
      console.log("Error Message:", data);
      return await errorResponse;
      // errorMessage = data;
    }
  }
});

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ fromData, id }) => {
    try {
      const responce = await axios.put(
        `http://localhost:4000/api/v1/admin/product/${id}`,
        fromData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          withCredentials: true,
        }
      );

      return await responce;
    } catch (error) {
      // console.log(data);

      const errorResponse = await error.response;
      console.log(errorResponse);
      if (errorResponse) {
        const { status, data } = errorResponse;
        // Access the status code and error message
        console.log("Status Code:", status);
        console.log("Error Message:", data);
        return await errorResponse;
        // errorMessage = data;
      }
    }
  }
);

export const fetchReviewsforProduct = createAsyncThunk(
  "fetchReviewsforProduct",
  async (id) => {
    try {
      console.log(id);
      const responce = await axios.get(
        `http://localhost:4000/api/v1/review?id=${id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      return await responce;
    } catch (error) {
      // console.log(data);

      const errorResponse = await error.response;
      console.log(errorResponse);
      if (errorResponse) {
        const { status, data } = errorResponse;
        // Access the status code and error message
        console.log("Status Code:", status);
        console.log("Error Message:", data);
        return await errorResponse;
        // errorMessage = data;
      }
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    // FOR ALL PRODUCT
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.isLoading = true;
      state.dataProducts = [];
    });

    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataProducts = action.payload.data.products;
    });

    builder.addCase(fetchProduct.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = action.error.message;
    });

    // FOR CARTPRODUCT
    builder.addCase(fetchCartProduct.pending, (state, action) => {
      state.isLoading = true;
      state.cartProduct = [];
    });

    builder.addCase(fetchCartProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartProduct = action.payload.data.products;
    });

    builder.addCase(fetchCartProduct.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = action.error.message;
    });

    // FOR ONE PRODUCT

    builder.addCase(fetchOneProduct.pending, (state, action) => {
      state.isLoading = true;
      state.OneProduct = [];
    });

    builder.addCase(fetchOneProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.OneProduct = action.payload.data.product;
    });

    builder.addCase(fetchOneProduct.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = action.error.message;
      state.isLoading = true;
    });

    // FOR SEARCH KEYWORD
    builder.addCase(fetchProductByKeyword.pending, (state, action) => {
      state.isLoading = true;
      state.searchProduct = [];
    });

    builder.addCase(fetchProductByKeyword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.searchProduct = action.payload.data.products;
    });

    builder.addCase(fetchProductByKeyword.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = action.error.message;
      state.isLoading = true;
    });

    // FOR SEARCH KEYWORD
    builder.addCase(fetchProductsByCategory.pending, (state, action) => {
      state.isLoading = true;
      state.searchProduct = [];
    });

    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.searchProduct = action.payload.data.products;
    });

    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = action.error.message;
      state.isLoading = true;
    });

    // FOR CATEGORYLIST
    builder.addCase(fetchProductsCategoryList.pending, (state, action) => {
      state.isLoading = true;
      state.searchProduct = [];
    });

    builder.addCase(fetchProductsCategoryList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categoryList = action.payload.data.categoryList;
    });

    builder.addCase(fetchProductsCategoryList.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = action.error.message;
      state.isLoading = true;
    });

    // FOR ADD REVIEW
    builder.addCase(addProductReview.pending, (state, action) => {
      state.isLoading = true;
      state.message = [];
    });

    builder.addCase(addProductReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    });

    builder.addCase(addProductReview.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = true;
      state.message = action.payload;
    });

    // FOR ALL PRODUCT --ADMIN
    builder.addCase(fetchProductsForAdmin.pending, (state, action) => {
      state.isLoading = true;
      state.productForAdmin = [];
    });

    builder.addCase(fetchProductsForAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productForAdmin = action.payload.data.products;
    });

    builder.addCase(fetchProductsForAdmin.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = action.error.message;
    });

    // FOR ADD PRODUCT --ADMIN
    builder.addCase(addNewProduct.pending, (state, action) => {
      state.uploadLoading = true;
      state.message = [];
    });

    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      state.uploadLoading = false;
      state.message = action.payload.data;
    });

    builder.addCase(addNewProduct.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = action.error.message;
    });

    // FOR UPDATE PRODUCT --ADMIN
    builder.addCase(updateProduct.pending, (state, action) => {
      state.uploadLoading = true;
      state.message = [];
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.uploadLoading = false;
      state.message = action.payload.data;
    });

    builder.addCase(updateProduct.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = action.error.message;
    });

    // FOR FETCH REVIEW --ADMIN
    builder.addCase(fetchReviewsforProduct.pending, (state, action) => {
      state.isLoading = true;
      state.reviews = [];
    });

    builder.addCase(fetchReviewsforProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reviews = action.payload.data;
    });

    builder.addCase(fetchReviewsforProduct.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = action.error.message;
    });
  },
  reducers: {
    getOneProduct: () => {},
  },
});

export const oneProduct = (state) => state.product.OneProduct;
export const isloading = (state) => state.product.isLoading;
export const uploadLoading = (state) => state.product.uploadLoading;
export const fetchAllproducts = (state) => state.product.dataProducts;
export const productForAdmin = (state) => state.product.productForAdmin;
export const Searchproducts = (state) => state.product.searchProduct;
export const categoryList = (state) => state.product.categoryList;
export const message = (state) => state.product.message;
export const productReviews = (state) => state.product.reviews;
export const cartProducts = (state) => state.product.cartProduct;

export default productSlice.reducer;
