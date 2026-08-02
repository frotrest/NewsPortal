import { createSelector } from '@reduxjs/toolkit';
import { selectAllArticles, selectArticleById } from './ArticlesSlice';

export const selectCurrentType = (state) => state.articles.currentType;
export const selectLoading = (state) => state.articles.loading;

export { selectAllArticles, selectArticleById };

export const selectSearchQuery = (state, query) => query;

export const selectFilteredArticles = createSelector(
  [selectAllArticles, selectSearchQuery],
  (articles, query) => {
    if (!query) return articles;
    else {
      const lowerQuery = query.toLowerCase();
      return articles.filter((article) => article.title.toLowerCase().includes(lowerQuery));
    }
  },
);

export const selectFavorites = (state) => state.favorites.favorites;
