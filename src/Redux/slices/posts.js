import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../axios.js";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await http.get("/posts");
  return data;
});

export const fetchPopPosts = createAsyncThunk(
  "posts/fetchPopPosts",
  async () => {
    const { data } = await http.get("/posts/pop");
    return data;
  }
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await http.get("/posts/tags");
  return data;
});

export const fetchDeletePost = createAsyncThunk(
  "posts/fetchDeletePost",
  async (id) => {
    const { data } = await http.delete(`/posts/${id}`);
    return data;
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  popPosts: {
    items: [],
    status: "loading",
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // Получение статей
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    // Получение популярных статей
    [fetchPopPosts.pending]: (state) => {
      state.popPosts.items = [];
      state.popPosts.status = "loading";
    },
    [fetchPopPosts.fulfilled]: (state, action) => {
      state.popPosts.items = action.payload;
      state.popPosts.status = "loaded";
    },
    [fetchPopPosts.rejected]: (state) => {
      state.popPosts.items = [];
      state.popPosts.status = "error";
    },

    // Получение тэгов
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },

    // Удаление статей
    [fetchDeletePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },

    // Редактирование статьи
  },
});

export const postsReducer = postSlice.reducer;
