import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearchOpen: false,
  keyword: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    showSearch: (state, action) => {
      state.isSearchOpen = true;
    },

    hideSearch: (state, action) => {
      state.isSearchOpen = false;
    },

    setKeywords: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const { showSearch, hideSearch, setKeywords } = searchSlice.actions;

export default searchSlice.reducer;
