import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      const newArticle = action.payload;
      const isAlreadyFavorite = state.favorites.some(
        (item) => item.article_id === newArticle.article_id,
      );
      if (!isAlreadyFavorite) {
        state.favorites.push(newArticle);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.article_id !== action.payload.article_id,
      );
    },
  },
});

export default favoriteSlice.reducer;
export const { addFavorite, removeFavorite } = favoriteSlice.actions;
