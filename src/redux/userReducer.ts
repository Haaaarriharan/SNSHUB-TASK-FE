/********************************Import Packages*************************************/
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
interface userType {
  data: any | null;
  loading: boolean;
  isloggedin: boolean;
  error: string | null;
}

//Define the initial state
const initialState: userType = {
  data: null,
  isloggedin: true,
  loading: false,
  error: null,
};

//Define the types
export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    userlogin: (state, action) => {
      action.payload["isloggedin"] = true
      state.data = action.payload;
      state.isloggedin = true;
    },
    removelogin: (state, ) => {
      state.data = null;
      state.isloggedin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userlogin, removelogin } = userSlice.actions;

export const userData = (state: RootState) => state.user.data;

export default userSlice.reducer;
