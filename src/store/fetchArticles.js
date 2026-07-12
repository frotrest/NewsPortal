import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (
    options = {
      query: '',
      category: 'top',
    },
    thunkApi,
  ) => {
    const { query, category } = options;
    const params = new URLSearchParams({
      apikey: 'pub_c9b1d135144441168a854012e7713998',
      language: 'en',
    });
    if (query && query.trim() !== '') {
      params.append('q', query);
    } else if (category) {
      params.append('category', category);
    }
    try {
      const response = await axios.get(`https://newsdata.io/api/1/news?${params.toString()}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
