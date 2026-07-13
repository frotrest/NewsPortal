import { createSlice } from '@reduxjs/toolkit';
import { fetchArticles } from './fetchArticles';

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    loading: false,
    error: null,
    currentType: '',
  },
  reducers: {
    clearArticles(state) {
      state.articles = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        ((state.loading = false), (state.articles = action.payload.results));
        if (action.meta.arg.query) {
          state.currentType = 'search';
        } else {
          state.currentType = 'top';
        }
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          ((state.loading = true), (state.error = null));
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          ((state.loading = false), (state.error = action.payload));
        },
      );
  },
});

export default articlesSlice.reducer;
export const { clearArticles } = articlesSlice.actions;
