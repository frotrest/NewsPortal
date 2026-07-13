import React, { useCallback, useState, useEffect } from 'react';
import styles from './searchArticles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../store/FetchArticles';
import clsx from 'clsx';
import Container from '../../Container';
import { clearArticles } from '../../store/ArticlesSlice';
import {
  selectArticles,
  selectCurrentType,
  selectFavorites,
  selectLoading,
} from '../../store/selectors';
import { Link, useLocation, useSearchParams } from 'react-router';
import { addFavorite, removeFavorite } from '../../store/favoritesSlice';

const SearchArticles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [query, setQuery] = useState(queryParam);

  const dispatch = useDispatch();
  const location = useLocation();

  const favorites = useSelector(selectFavorites) || [];
  const articles = useSelector(selectArticles) || [];
  const loading = useSelector(selectLoading);
  const currentType = useSelector(selectCurrentType);

  useEffect(() => {
    if (queryParam.trim()) {
      dispatch(fetchArticles({ query: queryParam }));
    } else {
      dispatch(clearArticles());
    }
  }, [dispatch, queryParam]);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (query.trim()) {
        setSearchParams({ q: query.trim() });
      }
    },
    [setSearchParams, query],
  );

  const handleClear = () => {
    setQuery('');
    setSearchParams({});
    dispatch(clearArticles());
  };

  return (
    <section className={clsx(styles.searchArticles)}>
      <Container className={clsx(styles.searchArticlesContent)}>
        <form onSubmit={handleSearch} className={clsx(styles.searchForm)}>
          <input
            key={queryParam}
            type="text"
            placeholder="Напишіть щось"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={clsx(styles.searchInput)}
          />
          {query && (
            <button type="button" className={clsx(styles.clearBtn)} onClick={handleClear}>
              Очистити
            </button>
          )}
        </form>
        {query.trim() && (loading || currentType === 'search') && (
          <div className={clsx(styles.articlesCards)}>
            {loading && <p className={styles.loadingText}>Завантаження новин...</p>}

            {!loading && articles.length === 0 && (
              <p className={clsx(styles.noResults)}>Нічого не знайдено. Спробуйте інше слово.</p>
            )}

            {!loading &&
              articles.map((article) => {
                const isFav = favorites.some((fav) => fav.article_id === article.article_id);
                return (
                  <Link
                    key={article.article_id}
                    to={`/article/${article.article_id}`}
                    state={{ article, from: `${location.pathname}?q=${queryParam}` }}
                    className={styles.article}
                  >
                    <img
                      src={article.image_url === null ? article.source_icon : article.image_url}
                      alt={article.title}
                      loading="lazy"
                      className={styles.articleImg}
                    />
                    <div className={styles.articleContent}>
                      <h3 className={styles.articleTitle}>{article.title}</h3>
                      <p className={styles.articleDescription}>
                        {article.description || 'Опис відсутній...'}
                      </p>
                      <button
                        className={clsx(styles.articleBtn, isFav && styles.articleBtnFav)}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (isFav) {
                            dispatch(removeFavorite(article));
                          } else {
                            dispatch(addFavorite(article));
                          }
                        }}
                      >
                        {isFav ? 'Видалити з обраних' : 'Добавити в обрані'}
                      </button>
                    </div>
                  </Link>
                );
              })}
          </div>
        )}
      </Container>
    </section>
  );
};

export default SearchArticles;
