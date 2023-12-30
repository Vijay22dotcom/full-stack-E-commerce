import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isLoadingForUpload: false,
  isError: false,
  errorMessage: "",
  user: {},
  message: {},
  users: [],
  userForAdmin: [],
};

export const userRegister = createAsyncThunk("userRegister", async (data) => {
  try {
    const responce = await axios.post(
      "http://localhost:4000/api/v1/register",
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

export const userLogin = createAsyncThunk("userLogin", async (data) => {
  try {
    console.log(data);
    const responce = await axios.post(
      "http://localhost:4000/api/v1/login",
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
      // errorMessage = data;
    }
  }
});

export const userLogout = createAsyncThunk("userLogout", async () => {
  try {
    const responce = await axios.get("http://localhost:4000/api/v1/logout", {
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
      // errorMessage = data;
    }
  }
});

export const contactUs = createAsyncThunk("contactUs", async (data) => {
  try {
    const responce = await axios.post(
      "http://localhost:4000/api/v1/contactus",
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
      // errorMessage = data;
    }
  }
});

export const userDataLoad = createAsyncThunk("userDataLoad", async () => {
  try {
    const responce = await axios.get("http://localhost:4000/api/v1/me", {
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
      // errorMessage = data;
    }
  }
});

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (data) => {
    try {
      console.log(data);
      const responce = await axios.put(
        "http://localhost:4000/api/v1/me/update",
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

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (email) => {
    try {
      console.log(email);
      const responce = await axios.post(
        "http://localhost:4000/api/v1/password/forgot",
        email
        // {
        //   headers: { "Content-Type": "application/json" },
        //   withCredentials: true,
        // }
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
        // errorMessage = data;
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async ({ passwords, token }) => {
    try {
      // console.log(passwords, token);
      const responce = await axios.put(
        `http://localhost:4000/api/v1/password/reset/${token}`,
        passwords,
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
        // errorMessage = data;
      }
    }
  }
);

export const fetchAllUser = createAsyncThunk("fetchAllUser", async () => {
  try {
    const responce = await axios.get(
      "http://localhost:4000/api/v1/admin/users",
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
      // errorMessage = data;
    }
  }
});

export const fetchOneUserData = createAsyncThunk(
  "fetchOneUserData",
  async (id) => {
    try {
      const responce = await axios.get(
        `http://localhost:4000/api/v1/admin/user/${id}`,
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
        // errorMessage = data;
      }
    }
  }
);

export const updateUserRole = createAsyncThunk(
  "updateUserRole",
  async ({ id, data }) => {
    try {
      const responce = await axios.put(
        `http://localhost:4000/api/v1/admin/user/${id}`,
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
        // errorMessage = data;
      }
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  extraReducers: (builder) => {
    // FOR REGISTER
    builder.addCase(userRegister.pending, (state, action) => {
      state.isLoading = true;
      state.user = [];
    });

    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
      state.errorMessage = action.payload;
    });

    builder.addCase(userRegister.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = true;
      state.errorMessage = action.payload.message;
    });

    // FOR LOGIN
    builder.addCase(userLogin.pending, (state, action) => {
      state.isLoading = true;
      state.user = [];
    });

    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
      state.errorMessage = action.payload;
      state.isLoggedIn = true;
    });

    builder.addCase(userLogin.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = true;
      state.errorMessage = action.payload.message;
    });

    // FOR LOAD USERDATA
    builder.addCase(userDataLoad.pending, (state, action) => {
      state.isLoading = true;
      state.user = [];
    });

    builder.addCase(userDataLoad.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
      state.errorMessage = action.payload;
    });

    builder.addCase(userDataLoad.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = true;
      state.errorMessage = action.payload.message;
    });

    // FOR USERLOGOUT
    builder.addCase(userLogout.pending, (state, action) => {
      state.isLoading = true;
      state.user = [];
    });

    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
      // state.errorMessage = action.payload;
    });

    builder.addCase(userLogout.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = true;
      state.errorMessage = action.payload.message;
    });

    // FOR   UPDATEUSERLPROFILE
    builder.addCase(updateUserProfile.pending, (state, action) => {
      state.isLoadingForUpload = true;
      state.user = [];
    });

    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.isLoadingForUpload = false;
      state.message = action.payload.data;
    });

    builder.addCase(updateUserProfile.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = true;
      state.errorMessage = action.payload.message;
    });

    // FOR  FORGOT PASSWORD
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.isLoadingForUpload = true;
    });

    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoadingForUpload = false;
      state.message = action.payload;
    });

    builder.addCase(forgotPassword.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = true;
      state.errorMessage = action.payload.message;
    });

    // FOR  RESET PASSWORD
    builder.addCase(resetPassword.pending, (state, action) => {
      state.isLoadingForUpload = true;
    });

    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.isLoadingForUpload = false;
      state.message = action.payload;
    });

    builder.addCase(resetPassword.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = true;
      state.errorMessage = action.payload.message;
    });

    // FOR  FETCH ALL USER
    builder.addCase(fetchAllUser.pending, (state, action) => {
      state.isLoading = true;
      state.users = [];
    });

    builder.addCase(fetchAllUser.fulfilled, (state, action) => {
      state.isLoading = true;
      state.users = action.payload.data;
    });

    builder.addCase(fetchAllUser.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = true;
      state.errorMessage = action.payload.message;
    });

    // FOR  FETCH ONE  USER
    builder.addCase(fetchOneUserData.pending, (state, action) => {
      state.isLoading = true;
      state.userForAdmin = [];
    });

    builder.addCase(fetchOneUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userForAdmin = action.payload.data;
    });

    builder.addCase(fetchOneUserData.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = true;
      state.errorMessage = action.payload.message;
    });
    // FOR  UPDATE USER ROLE
    builder.addCase(updateUserRole.pending, (state, action) => {
      state.isLoadingForUpload = true;
      state.message = [];
    });

    builder.addCase(updateUserRole.fulfilled, (state, action) => {
      state.isLoadingForUpload = false;
      state.message = action.payload.data;
    });

    builder.addCase(updateUserRole.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = true;
      state.errorMessage = action.payload.message;
    });

    // FOR  CONTACT US
    builder.addCase(contactUs.pending, (state, action) => {
      state.isLoadingForUpload = true;
      state.message = [];
    });

    builder.addCase(contactUs.fulfilled, (state, action) => {
      state.isLoadingForUpload = false;
      state.message = action.payload.data;
    });

    builder.addCase(contactUs.rejected, (state, action) => {
      console.log("ERRPR: ", action.error.message);
      state.isError = true;
      state.errorMessage = action.payload.message;
    });
  },
  reducers: {
    login: (state, action) => {
      localStorage.getItem("isLoggedIn", true);
    },
    logout: (state, action) => {
      localStorage.getItem("isLoggedIn", false);
    },
  },
});

export const { login, logout } = userSlice.actions;

export const errorMessage = (state) => state.auth.errorMessage;
export const isLoading = (state) => state.auth.isLoading;
export const isLoadingForUpload = (state) => state.auth.isLoadingForUpload;
export const userData = (state) => state.auth.user;
export const userDataForAdmin = (state) => state.auth.userForAdmin;
export const allusers = (state) => state.auth.users;
export const message = (state) => state.auth.message;

export default userSlice.reducer;
