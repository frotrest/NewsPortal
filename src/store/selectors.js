export const selectArticles = (state) => state.articles.articles;

export const selectCurrentType = (state) => state.articles.currentType;
export const selectLoading = (state) => state.articles.loading;

export const selectArticleById = (state, id) =>
  state.articles.articles.find((article) => article.article_id === id);

export const selectFavorites = (state) => state.favorites.favorites;
