import {createAsyncThunk} from '@reduxjs/toolkit';
import {isAxiosError} from 'axios';
import {GlobalError, Post, ValidationError} from '../../types.ts';
import {RootState} from '../../app/store.ts';
import axiosApi from '../../axiosApi.ts';

export const fetchPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: ValidationError }
>('posts/fetch', async () => {
  const response = await axiosApi.get('/posts');
  return response.data;
});

export const createPost = createAsyncThunk<
  Post,
  Post,
  { rejectValue: GlobalError; state: RootState }
>('posts/create', async (postData, {rejectWithValue, getState}) => {
  const token = getState().users.user?.token;

  try {
    const {data: post} = await axiosApi.post('/posts', postData, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return post
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data)
    }
    throw e
  }
})
