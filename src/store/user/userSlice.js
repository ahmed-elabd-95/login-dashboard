import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { data } from "../../../public/datajson";/

export const getItems = createAsyncThunk(
  " items/getItems",
  async (args, { rejectWithValue }) => {
    try {
      const resp = await api.get();
      console.log("resp", resp);
      return resp;
    } catch (error) {}
  }
);
// initial state
export const initialState = {
  loading: false,
  error: false,
  items: {},
};

// our slice
const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setItems: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.items = payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.fulfilled, (state, action) => {
        console.log("action", action.payload);
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getItems.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      });
  },
});

// export the actions
export const { setLoading, setItems, setError } = itemSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
export const itemsSelector = (state) => state.items;

// export the default reducer
export default itemSlice.reducer;

// set up axios - simple json-server prototype config here
export const api = axios.create({
  baseURL: "data.json",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// fetch all items

export function fetchItems() {
  return async (dispatch) => {
    api
      .get("/items")
      .then((response) => {
        dispatch(setItems(response.data));
      })
      .catch((er) => {
        dispatch(setError());
      });
  };
}
