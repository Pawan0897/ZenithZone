import { createSlice } from "@reduxjs/toolkit";

const Users = createSlice({
  name: "user",
  initialState: {
    details: {
      status: "",
    },
    search: "",
    changePassId: "",
    cat_id: "",
  },
  reducers: {
    userInfo: (state, action) => {
      return {
        ...state,
        details: action.payload,
      };
    },
    userUpdateStatus: (state, action) => {
      state.details.status = action.payload;
    },
    Setsearch: (state, action) => {
      state.search = action.payload;
    },
    changePassId: (state, action) => {
      state.changePassId = action.payload;
    },
    cat_id: (state, action) => {
      state.cat_id = action.payload;
    },
  },
});

export const { userInfo, userUpdateStatus, Setsearch, changePassId, cat_id } =
  Users.actions;

export default Users.reducer;
