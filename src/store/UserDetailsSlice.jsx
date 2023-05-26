import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create action for api calling with POST
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://647032bc3de51400f723ea1d.mockapi.io/redux-crud",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// Read user with get method

export const showUser = createAsyncThunk(
  "showUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://647032bc3de51400f723ea1d.mockapi.io/redux-crud"
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// delete action

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://647032bc3de51400f723ea1d.mockapi.io/redux-crud/${id}`,
      {
        method: "DELETE",
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// update action

export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `https://647032bc3de51400f723ea1d.mockapi.io/redux-crud/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

//main userDetailsSlice code here

const userDetails = createSlice({
  name: "userdetails",
  initialState: {
    user: [],
    loading: false,
    error: null,
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
  // createAyncThunk api data promise return so we need give this three pending fullfilled and reject
  //------------------- NEW Way BUILDER addCase with pending fullfilled and rejected------------------------------
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        // user intialState ma data add karva
        state.user.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // for showUser

      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload.message;
      })

      // for deleteUser

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (id) {
          state.user = state.user.filter((ele) => ele.id !== id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload.message;
      })

      // update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        // user intialState ma data add karva
        state.user = state.user.map((ele) =>
          ele.id === action?.payload?.id ? action.payload : ele
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      });
  },

  //------------------- old deprecated way with pending fullfilled and rejected------------------------------

  //   extraReducers: {
  //     [createUser.pending]: (state) => {
  //       state.loading = true;
  //     },
  //     [createUser.fulfilled]: (state, action) => {
  //       state.loading = false;
  //       // user intialState ma data add karva
  //       state.user.push(action.payload);
  //     },
  //     [createUser.rejected]: (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload.message;
  //     },

  //     // for showUser

  //     [showUser.pending]: (state) => {
  //       state.loading = true;
  //     },
  //     [showUser.fulfilled]: (state, action) => {
  //       state.loading = false;
  //       // already data che so je data che tene show karva
  //       state.user = action.payload;
  //     },
  //     [showUser.rejected]: (state, action) => {
  //       state.loading = false;
  //       state.user = state.payload;
  //       state.error = action.payload.message;
  //     },
  //   },
});

export default userDetails.reducer;
export const { searchUser } = userDetails.actions;
