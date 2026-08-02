import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchArticles } from './fetchArticles';

const articlesAdapter = createEntityAdapter({
  selectId: (article) => article.article_id,
  sortComparer: (a, b) => a.article_id.localeCompare(b.article_id),
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: articlesAdapter.getInitialState({
    loading: false,
    error: null,
    currentType: '',
  }),
  reducers: {
    clearArticles(state) {
      articlesAdapter.removeAll(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        ((state.loading = false), articlesAdapter.setAll(state, action.payload.results));
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

export const {
  selectAll: selectAllArticles,
  selectById: selectArticleById,
  selectIds: selectArticleIds,
} = articlesAdapter.getSelectors((state) => state.articles);
