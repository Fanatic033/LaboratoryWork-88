import {createSlice} from '@reduxjs/toolkit';
import {createPost, fetchPosts} from './PostsThunks.ts';
import {Post} from '../../types.ts';

interface PostsState {
  posts: Post[];
  postsFetching: boolean;
  postCreating: boolean;
}

const initialState: PostsState = {
  posts: [],
  postsFetching: false,
  postCreating: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.postsFetching = true;
      })
      .addCase(fetchPosts.fulfilled, (state, {payload}) => {
        state.postsFetching = false;
        state.posts = payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.postsFetching = false;
      });

    builder
      .addCase(createPost.pending, (state) => {
        state.postCreating = true;
      })
      .addCase(createPost.fulfilled, (state, {payload}) => {
        state.postCreating = false;
        state.posts.unshift(payload);
      })
      .addCase(createPost.rejected, (state) => {
        state.postCreating = false;
      });
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectPostsFetching: (state) => state.postsFetching,
    selectPostCreating: (state) => state.postCreating,
  }
});

export const postsReducer = postsSlice.reducer;

export const {selectPosts, selectPostsFetching, selectPostCreating,} = postsSlice.selectors;
