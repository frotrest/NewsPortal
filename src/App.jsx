import React, { lazy } from 'react';
import { Route, Routes } from 'react-router';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
const Search = lazy(() => import('./pages/Search'));
const Article = lazy(() => import('./components/Article/Article'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="searchArticles" element={<Search />} />
        <Route path="article/:id" element={<Article />} />
        <Route path="favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
