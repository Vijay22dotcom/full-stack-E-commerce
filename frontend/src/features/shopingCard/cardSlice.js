import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartIteam: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart")) || [],
  reducers: {
    addIteamTocart: (state, action) => {
      const product = action.payload;
      console.log(product);

      const existingItem = state.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      //   console.log(itemId);
      const itemToUpdate = state.find((item) => item._id === itemId);

      if (itemToUpdate) {
        itemToUpdate.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const itemToUpdate = state.find((item) => item._id === itemId);

      if (itemToUpdate && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    deleteIteam: (state, action) => {
      const itemId = action.payload;
      const updatedState = state.filter((item) => item._id !== itemId);
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const {
  addIteamTocart,
  incrementQuantity,
  decrementQuantity,
  deleteIteam,
} = cartSlice.actions;

export default cartSlice.reducer;
