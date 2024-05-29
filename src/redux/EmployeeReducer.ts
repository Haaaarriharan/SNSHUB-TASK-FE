/********************************Import Packages*************************************/
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { createAsyncThunk } from "@reduxjs/toolkit/react";

/********************************Import Axios*************************************/
import axios from "axios";

interface employeeType {
  data: any[] | null;
  loading: boolean;
  error: string | null;
}

//Define the initial state
const initialState: employeeType = {
  data: [],
  loading: false,
  error: null,
};

//Fetch the employee Details
export const fetchEmployee = createAsyncThunk(
  "employee/fetchByIdStatus",
  async ({ start = 0, end = 10 }: { start: number; end: number }, thunkAPI) => {
    try {
      console.log("Start : ", start, "End : ", end);
      const response: any = axios.get("");
      return response;
    } catch (e) {
      throw thunkAPI.rejectWithValue(e);
    }
  }
);
//Define the types
export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    clearEmployeeData: (state) => {
      state.data = [];
    },
    setEmployee: (state, action) => {
      state.data = state.data
        ? [...state.data, action.payload]
        : [action.payload];

      console.log(action?.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload?.data?.hits;
      })
      .addCase(fetchEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployee.rejected, (state) => {
        state.loading = false;
        state.error = "Error while loading the employee";
      });
  },
});

export const employeeData = (state: RootState) => state.employee.data;

export default employeeSlice.reducer;

export const { clearEmployeeData, setEmployee } = employeeSlice.actions;
