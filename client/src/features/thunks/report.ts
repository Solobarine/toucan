import { createAsyncThunk } from "@reduxjs/toolkit";
import { ReportParams } from "../../types/report";
import { API_URL } from "../../constants";
import { postRequest } from "../../utils/api";

export const reportContent = createAsyncThunk(
  "REPORT/REPORT_CONTENT",
  async (data: ReportParams, { rejectWithValue }) => {
    const url = `${API_URL}/api/report-content`;
    return postRequest(url, { report: data }, { rejectWithValue });
  },
);
