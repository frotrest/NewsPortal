import { createSelector } from '@reduxjs/toolkit';

export const selectArticles = (state) => state.articles.articles;
export const selectArticleId = (state, id) => id;

export const selectCurrentType = (state) => state.articles.currentType;
export const selectLoading = (state) => state.articles.loading;

export const selectArticleById = createSelector(
  [selectArticles, selectArticleId],
  (articles, id) => {
    return articles.find((article) => article.article_id === id);
  },
);

export const selectFavorites = (state) => state.favorites.favorites;
