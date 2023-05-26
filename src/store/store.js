import { configureStore } from "@reduxjs/toolkit";
import userDetails from "../features/UserDetailsSlice";

export const store = configureStore({
  reducer: {
    app: userDetails,
  },
});
