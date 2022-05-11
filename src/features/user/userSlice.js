import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  getAllUserService,
  getBookmarkService,
  addBookmarkService,
  removeBookmarkService,
  followUserService,
  unfollowUserService,
} from "services";

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data, status } = await getAllUserService();

      if (status === 200) {
        return data.users;
      }
    } catch {
      return rejectWithValue([], "Error occured. Try again later.");
    }
  }
);

export const getBookmarks = createAsyncThunk(
  "user/getBookmark",
  async (token, { rejectWithValue }) => {
    try {
      const { data, status } = await getBookmarkService(token);

      if (status === 200) {
        return data.bookmarks;
      }
    } catch {
      return rejectWithValue([], "Error occured. Try again later.");
    }
  }
);

export const addBookmark = createAsyncThunk(
  "user/addBookmark",
  async (arg, { rejectWithValue }) => {
    try {
      const { data, status } = await addBookmarkService(arg);

      if (status === 200) {
        return data.bookmarks;
      }
    } catch {
      return rejectWithValue([], "Error occured. Try again later.");
    }
  }
);

export const removeBookmark = createAsyncThunk(
  "user/removeBookmark",
  async (arg, { rejectWithValue }) => {
    try {
      const { data, status } = await removeBookmarkService(arg);

      if (status === 200) {
        return data.bookmarks;
      }
    } catch {
      return rejectWithValue([], "Error occured. Try again later.");
    }
  }
);

export const followUser = createAsyncThunk(
  "user/followUser",
  async (arg, { rejectWithValue }) => {
    try {
      const { data, status } = await followUserService(arg);

      if (status === 200) {
        return data;
      }
    } catch {
      return rejectWithValue([], "Error occured. Try again later.");
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async (arg, { rejectWithValue }) => {
    try {
      const { data, status } = await unfollowUserService(arg);

      if (status === 200) {
        return data;
      }
    } catch {
      return rejectWithValue([], "Error occured. Try again later.");
    }
  }
);

const updateFollowingUser = (users, followingUser) => {
  const foundUser = users.find((user) => user._id === followingUser._id);

  if (foundUser) {
    users = [...users].map((user) =>
      user._id === foundUser._id ? followingUser : user
    );
  }
  return users;
};

const updateFollowedUser = (users, followedUser) => {
  const foundUser = users.find((user) => user._id === followedUser._id);

  if (foundUser) {
    users = [...users].map((user) =>
      user._id === foundUser._id ? followedUser : user
    );
  }
  return users;
};

export const userSlice = createSlice({
  name: "user",
  initialState: { users: [], bookmarks: [], isLoading: false, error: "" },
  reducers: {},

  extraReducers: {
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.users = payload;
    },

    [getBookmarks.fulfilled]: (state, { payload }) => {
      state.bookmarks = payload;
    },

    [addBookmark.fulfilled]: (state, { payload }) => {
      state.bookmarks = payload;
    },

    [removeBookmark.fulfilled]: (state, { payload }) => {
      state.bookmarks = payload;
    },

    [followUser.fulfilled]: (state, { payload: { user, followUser } }) => {
      state.users = updateFollowingUser(current(state).users, user);
      state.users = updateFollowedUser(current(state).users, followUser);
    },

    [unfollowUser.fulfilled]: (state, { payload: { user, followUser } }) => {
      state.users = updateFollowingUser(current(state).users, user);
      state.users = updateFollowedUser(current(state).users, followUser);
    },
  },
});

export default userSlice.reducer;
