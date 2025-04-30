import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = process.env.REACT_APP_BASE_URL;

export const fetchGetAllOrder = createAsyncThunk(
  "order/fetchGetAllOrder",
  async ({ page, size, status, token }) => {
    const params = {
      page: page,
      size: size,
      status: status,
    };

    try {
      const response = await fetch(
        `${API_BASE}/admin/api/v1/orders?${new URLSearchParams(params)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        return [];
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    ordersItem: [],
    totalCount: 0,
    currentPage: 0,
    error: null,
    status: "idle",
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetAllOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGetAllOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ordersItem = action.payload.orders;
        state.totalCount = action.payload.totalElements;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchGetAllOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch orders";
      });
  },
});

export const { setPage, setPageSize } = orderSlice.actions;
export default orderSlice.reducer;
