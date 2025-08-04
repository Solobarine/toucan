import { createSlice } from "@reduxjs/toolkit";
import { LoadingInterface } from "../../types/loading";
import { reportContent } from "../thunks/report";
import { toast } from "react-toastify";

interface InitialState {
  reportContent: {
    state: LoadingInterface;
    message: string;
    error: string;
  };
}

const initialState: InitialState = {
  reportContent: {
    state: "idle",
    message: "",
    error: "",
  },
};

const reportSlice = createSlice({
  name: "reportContent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(reportContent.pending, (state) => {
      state.reportContent = { state: "pending", message: "", error: "" };
    });
    builder.addCase(reportContent.fulfilled, (state, action) => {
      state.reportContent = {
        ...state.reportContent,
        state: "idle",
        message: action.payload.data.message,
      };
      toast.success(action.payload.data.message);
    });
    builder.addCase(reportContent.rejected, (state) => {
      state.reportContent = {
        ...state.reportContent,
        state: "failed",
        error: "Something went wrong",
      };
      toast.error("Something went wrong");
    });
  },
});

export default reportSlice.reducer;
