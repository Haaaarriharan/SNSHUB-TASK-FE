/********************************Import Packages*************************************/
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { createAsyncThunk } from "@reduxjs/toolkit/react";

/********************************Import Axios and API URL*************************************/
import axios from "axios";
import { API_URL } from "@/config";

/*******************************Import Toast*************************************/
import { toast } from "sonner";

interface userType {
  data: any | null;
  loading: boolean;
  error: string | null;
}

//Define the initial state
const initialState: userType = {
  data: null,
  loading: false,
  error: null,
};

//Signup with API Call and Redux Storage
export const loginUser = createAsyncThunk(
  "user/login",
  async (
    payload: {
      email: string;
      password: string;
      name: string;
    },
    thunkAPI
  ) => {
    try {
      const response: any = axios.post(`${API_URL}/register`, payload);
      return response;
    } catch (e) {
      throw thunkAPI.rejectWithValue(e);
    }
  }
);

//Define the types
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearuserData: (state) => {
      state.data = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action.payload.data.data;
      state.loading = false;
      toast.success("Signed Up Successfully");
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error.message || " An error occurred";
      state.loading = false;
      toast.error("Error While Sign Up");
    });
  },
});

export const userData = (state: RootState) => state.user.data;

export default userSlice.reducer;

export const { clearuserData } = userSlice.actions;
