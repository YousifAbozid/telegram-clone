import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import threadReducer from '../features/ThreadSlice'
export default configureStore({
  reducer: {
    user: userReducer,
    thread: threadReducer,
  },
});
