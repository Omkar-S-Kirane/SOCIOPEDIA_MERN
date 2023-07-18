// Importing createSlice function from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit";

// Initial state of the Redux store
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

// Creating a slice of the Redux store using createSlice
export const authSlice = createSlice({
  // Name of the slice
  name: "auth",
  // Initial state for the slice
  initialState,
  // Reducers define how the state can be updated
  reducers: {
    // Reducer to toggle between light and dark mode
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // Reducer to set user information and token after login
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Reducer to clear user information and token after logout
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    // Reducer to update user's friends information
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    // Reducer to set the array of posts
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    // Reducer to update a specific post in the posts array
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.posts;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

// Exporting the action creators generated by createSlice
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

// Exporting the reducer function generated by createSlice
export default authSlice.reducer;